// src/app/(student)/student/learn/[enrollmentId]/page.jsx
"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { ChevronDown, ChevronRight, CheckCircle, PlayCircle, FileText, Loader2, Lock } from "lucide-react"
import Link from "next/link"

// YouTube URL থেকে embed ID বের করো
function getYouTubeId(url) {
  if (!url) return null
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/)
  return match ? match[1] : null
}

// ─── Class Item ──────────────────────────────────────────────
function ClassItem({ cls, isCompleted, isActive, onClick }) {
  return (
    <button
      onClick={() => onClick(cls)}
      className={`w-full flex items-center gap-3 py-2 px-3 rounded-lg text-left transition ${
        isActive ? "bg-[#7aff2e]/10 border border-[#7aff2e]/20" : "hover:bg-white/5"
      }`}
    >
      <div className="shrink-0">
        {isCompleted
          ? <CheckCircle size={14} className="text-[#7aff2e]" />
          : <PlayCircle size={14} className={isActive ? "text-[#7aff2e]" : "text-white/30"} />
        }
      </div>
      <span className={`text-sm flex-1 ${isActive ? "text-[#7aff2e]" : "text-white/60"}`}>
        {cls.title}
      </span>
      <div className="flex items-center gap-1">
        {cls.youtubeUrl && <PlayCircle size={11} className="text-white/20" />}
        {cls.pdfUrl && <FileText size={11} className="text-white/20" />}
      </div>
    </button>
  )
}

// ─── Chapter Item ─────────────────────────────────────────────
function ChapterItem({ chapter, completedLessons, activeClass, onClassClick }) {
  const [open, setOpen] = useState(true)
  const completedCount = chapter.classes?.filter(c => completedLessons.includes(c._id)).length || 0

  return (
    <div className="ml-2">
      <button
        onClick={() => setOpen(p => !p)}
        className="flex items-center gap-2 w-full text-left py-2 text-white/50 hover:text-white text-xs transition"
      >
        {open ? <ChevronDown size={13} /> : <ChevronRight size={13} />}
        <span className="flex-1">{chapter.title}</span>
        <span className="text-white/20">{completedCount}/{chapter.classes?.length || 0}</span>
      </button>
      {open && (
        <div className="ml-2">
          {chapter.classes?.map(cls => (
            <ClassItem
              key={cls._id}
              cls={cls}
              isCompleted={completedLessons.includes(cls._id)}
              isActive={activeClass?._id === cls._id}
              onClick={onClassClick}
            />
          ))}
        </div>
      )}
    </div>
  )
}

// ─── Subject Item ─────────────────────────────────────────────
function SubjectItem({ subject, completedLessons, activeClass, onClassClick }) {
  const [open, setOpen] = useState(true)

  return (
    <div className="border-b border-white/8 last:border-0">
      <button
        onClick={() => setOpen(p => !p)}
        className="flex items-center gap-2 w-full text-left py-3 px-4 text-white font-medium text-sm hover:text-[#7aff2e] transition"
      >
        {open ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
        {subject.title}
      </button>
      {open && (
        <div className="px-2 pb-2">
          {subject.chapters?.map(chapter => (
            <ChapterItem
              key={chapter._id}
              chapter={chapter}
              completedLessons={completedLessons}
              activeClass={activeClass}
              onClassClick={onClassClick}
            />
          ))}
        </div>
      )}
    </div>
  )
}

// ─── Main Page ────────────────────────────────────────────────
export default function LearnPage() {
  const { enrollmentId } = useParams()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeClass, setActiveClass] = useState(null)
  const [completedLessons, setCompletedLessons] = useState([])
  const [marking, setMarking] = useState(false)

  useEffect(() => {
    let cancelled = false
    const load = async () => {
      const res = await fetch(`/api/student/learn/${enrollmentId}`)
      const json = await res.json()
      if (!cancelled && json.course) {
        setData(json)
        setCompletedLessons(json.enrollment.completedLessons || [])

        // প্রথম class auto select করো
        const firstClass = json.curriculum?.[0]?.chapters?.[0]?.classes?.[0]
        if (firstClass) setActiveClass(firstClass)
      }
      if (!cancelled) setLoading(false)
    }
    load()
    return () => { cancelled = true }
  }, [enrollmentId])

  const handleMarkComplete = async () => {
    if (!activeClass || marking) return
    if (completedLessons.includes(activeClass._id)) return

    setMarking(true)
    try {
      const res = await fetch("/api/student/progress", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ enrollmentId, classId: activeClass._id }),
      })
      const json = await res.json()
      if (res.ok) setCompletedLessons(json.completedLessons)
    } catch (err) {
      console.error(err)
    } finally {
      setMarking(false)
    }
  }

  // Next class খুঁজে বের করো
  const goToNextClass = () => {
    if (!data?.curriculum || !activeClass) return
    let found = false
    for (const subject of data.curriculum) {
      for (const chapter of subject.chapters || []) {
        for (const cls of chapter.classes || []) {
          if (found) { setActiveClass(cls); return }
          if (cls._id === activeClass._id) found = true
        }
      }
    }
  }

  const isCompleted = activeClass && completedLessons.includes(activeClass._id)
  const youtubeId = getYouTubeId(activeClass?.youtubeUrl)

  // Total progress
  const totalClasses = data?.curriculum?.reduce((acc, s) =>
    acc + s.chapters?.reduce((a, c) => a + (c.classes?.length || 0), 0), 0) || 0
  const progressPercent = totalClasses > 0
    ? Math.round((completedLessons.length / totalClasses) * 100)
    : 0

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0E0E0E] flex items-center justify-center gap-2 text-white/40">
        <Loader2 size={20} className="animate-spin" />
        <span className="text-sm">Loading...</span>
      </div>
    )
  }

  if (!data?.course) {
    return (
      <div className="min-h-screen bg-[#0E0E0E] flex items-center justify-center">
        <p className="text-white/40">Course not found.</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0E0E0E] flex flex-col">

      {/* Top bar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-[#0E0E0E]/90 backdrop-blur-md border-b border-white/8 px-4 py-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <Link href="/student" className="text-white/40 hover:text-white transition shrink-0 text-sm">
            ← Back
          </Link>
          <span className="text-white font-medium text-sm truncate">{data.course.title}</span>
        </div>

        {/* Progress */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="hidden sm:flex items-center gap-2">
            <div className="w-24 h-1.5 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#7aff2e] rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <span className="text-white/40 text-xs">{progressPercent}%</span>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-1 pt-14">

        {/* Sidebar */}
        <div className="hidden lg:flex flex-col w-72 shrink-0 border-r border-white/8 bg-[#0E0E0E] h-screen sticky top-14 overflow-y-auto">
          <div className="p-4 border-b border-white/8">
            <p className="text-white/40 text-xs font-medium">CURRICULUM</p>
            <p className="text-white/30 text-xs mt-1">{completedLessons.length}/{totalClasses} completed</p>
          </div>
          {data.curriculum?.map(subject => (
            <SubjectItem
              key={subject._id}
              subject={subject}
              completedLessons={completedLessons}
              activeClass={activeClass}
              onClassClick={setActiveClass}
            />
          ))}
        </div>

        {/* Video + content */}
        <div className="flex-1 flex flex-col">

          {/* Video player */}
          <div className="w-full bg-black aspect-video">
            {youtubeId ? (
              <iframe
                key={youtubeId}
                src={`https://www.youtube.com/embed/${youtubeId}`}
                title={activeClass?.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <p className="text-white/30 text-sm">No video available</p>
              </div>
            )}
          </div>

          {/* Class info */}
          <div className="p-6 flex flex-col gap-4 max-w-4xl">
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div>
                <h1 className="text-white font-semibold text-lg">{activeClass?.title}</h1>
              </div>
              <div className="flex items-center gap-3">
                {activeClass?.pdfUrl && (
                  <a 
                    href={activeClass.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm px-4 py-2 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition"
                  >
                    <FileText size={15} />
                    PDF Notes
                  </a>
                )}
                <button
                  onClick={handleMarkComplete}
                  disabled={marking || isCompleted}
                  className={`flex items-center gap-2 text-sm px-4 py-2 rounded-lg transition disabled:opacity-60 ${
                    isCompleted
                      ? "bg-[#7aff2e]/15 text-[#7aff2e] cursor-default"
                      : "bg-white/5 text-white/60 hover:bg-[#7aff2e]/10 hover:text-[#7aff2e]"
                  }`}
                >
                  <CheckCircle size={15} />
                  {isCompleted ? "Completed" : marking ? "Saving..." : "Mark Complete"}
                </button>
                <button
                  onClick={goToNextClass}
                  className="text-sm px-4 py-2 rounded-lg bg-[#7aff2e] text-black font-semibold hover:bg-[#8fff3a] transition"
                >
                  Next →
                </button>
              </div>
            </div>
          </div>

          {/* Mobile curriculum */}
          <div className="lg:hidden border-t border-white/8 p-4">
            <p className="text-white/40 text-xs font-medium mb-3">CURRICULUM</p>
            {data.curriculum?.map(subject => (
              <SubjectItem
                key={subject._id}
                subject={subject}
                completedLessons={completedLessons}
                activeClass={activeClass}
                onClassClick={setActiveClass}
              />
            ))}
          </div>

        </div>
      </div>
    </div>
  )
}