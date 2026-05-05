// src/app/(public)/courses/[slug]/page.jsx এ
"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { useSession } from "next-auth/react"
import { ChevronDown, ChevronRight, PlayCircle, FileText, Lock, Loader2, BookOpen, CheckCircle } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

function ClassItem({ cls, isEnrolled }) {
  if (isEnrolled) {
    return (
      <div className="flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-white/5">
        <PlayCircle size={14} className="text-[#7aff2e] shrink-0" />
        <span className="text-sm text-white/60 flex-1">{cls.title}</span>
        <div className="flex items-center gap-1.5">
          {cls.youtubeUrl && <span className="text-[10px] px-1.5 py-0.5 rounded bg-red-500/15 text-red-400">YT</span>}
          {cls.pdfUrl && <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-500/15 text-blue-400">PDF</span>}
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-3 py-2 px-3 rounded-lg">
      {cls.isFreePreview
        ? <PlayCircle size={14} className="text-[#7aff2e] shrink-0" />
        : <Lock size={14} className="text-white/20 shrink-0" />
      }
      <span className="text-sm text-white/60 flex-1">{cls.title}</span>
      <div className="flex items-center gap-1.5">
        {cls.youtubeUrl && <span className="text-[10px] px-1.5 py-0.5 rounded bg-red-500/15 text-red-400">YT</span>}
        {cls.pdfUrl && <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-500/15 text-blue-400">PDF</span>}
        {cls.isFreePreview && <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#7aff2e]/15 text-[#7aff2e]">Free</span>}
      </div>
    </div>
  )
}

function ChapterItem({ chapter, isEnrolled }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="ml-4">
      <button
        onClick={() => setOpen(p => !p)}
        className="flex items-center gap-2 w-full text-left py-2 text-white/50 hover:text-white text-sm transition"
      >
        {open ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
        {chapter.title}
        <span className="ml-auto text-xs text-white/30">{chapter.classes?.length || 0} classes</span>
      </button>
      {open && (
        <div className="ml-4">
          {chapter.classes?.map(cls => (
            <ClassItem key={cls._id} cls={cls} isEnrolled={isEnrolled} />
          ))}
        </div>
      )}
    </div>
  )
}

function SubjectItem({ subject, isEnrolled }) {
  const [open, setOpen] = useState(true)
  const totalClasses = subject.chapters?.reduce((acc, ch) => acc + (ch.classes?.length || 0), 0)

  return (
    <div className="bg-white/5 border border-white/8 rounded-xl p-4">
      <button
        onClick={() => setOpen(p => !p)}
        className="flex items-center gap-2 w-full text-left font-medium text-white hover:text-[#7aff2e] transition"
      >
        {open ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
        {subject.title}
        <span className="ml-auto text-xs text-white/30 font-normal">{totalClasses} classes</span>
      </button>
      {open && (
        <div className="mt-2">
          {subject.chapters?.map(chapter => (
            <ChapterItem key={chapter._id} chapter={chapter} isEnrolled={isEnrolled} />
          ))}
        </div>
      )}
    </div>
  )
}

export default function CourseDetailPage() {
  const { slug } = useParams()
  const { data: session } = useSession()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [enrollment, setEnrollment] = useState(null)
  const [checkingEnrollment, setCheckingEnrollment] = useState(false)

  useEffect(() => {
    let cancelled = false
    const load = async () => {
      const res = await fetch(`/api/courses/${slug}`)
      const json = await res.json()
      if (!cancelled) {
        setData(json)
        setLoading(false)
      }
    }
    load()
    return () => { cancelled = true }
  }, [slug])

  // Enrollment check করো
  useEffect(() => {
    if (!session || !data?.course) return
    let cancelled = false

    const checkEnrollment = async () => {
      setCheckingEnrollment(true)
      const res = await fetch(`/api/student/enrollment-check?courseId=${data.course._id}`)
      const json = await res.json()
      if (!cancelled) {
        setEnrollment(json.enrollment || null)
        setCheckingEnrollment(false)
      }
    }
    checkEnrollment()
    return () => { cancelled = true }
  }, [session, data?.course])

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0E0E0E] flex items-center justify-center gap-2 text-white/40">
        <Loader2 size={20} className="animate-spin" />
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

  const { course, curriculum } = data
  const totalSubjects = curriculum?.length || 0
  const totalClasses = curriculum?.reduce((acc, s) =>
    acc + s.chapters?.reduce((a, c) => a + (c.classes?.length || 0), 0), 0) || 0
  const isEnrolled = !!enrollment

  return (
    <div className="min-h-screen bg-[#0E0E0E]">
      <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Left */}
        <div className="lg:col-span-2 flex flex-col gap-6">

          <div className="aspect-video rounded-xl overflow-hidden bg-white/5">
            {course.thumbnail
              ? <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" />
              : <div className="w-full h-full flex items-center justify-center">
                  <BookOpen size={48} className="text-white/20" />
                </div>
            }
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs px-2 py-0.5 rounded-full bg-white/5 text-white/40">{course.category}</span>
              {course.isFree && <span className="text-xs px-2 py-0.5 rounded-full bg-[#7aff2e]/15 text-[#7aff2e]">Free</span>}
            </div>
            <h1 className="text-white text-2xl font-bold">{course.title}</h1>
            {course.description && (
              <p className="text-white/50 text-sm leading-relaxed">{course.description}</p>
            )}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#7aff2e] flex items-center justify-center text-black font-bold text-sm overflow-hidden">
                {course.teacherId?.image
                  ? <Image src={course.teacherId.image} alt={course.teacherId.name} width={32} height={32} className="object-cover" />
                  : course.teacherId?.name?.charAt(0).toUpperCase()
                }
              </div>
              <div>
                <p className="text-white text-sm font-medium">{course.teacherId?.name}</p>
                <p className="text-white/40 text-xs">Instructor</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-6 py-4 border-y border-white/8">
            <div className="text-center">
              <p className="text-white font-bold text-lg">{totalSubjects}</p>
              <p className="text-white/40 text-xs">Subjects</p>
            </div>
            <div className="text-center">
              <p className="text-white font-bold text-lg">{totalClasses}</p>
              <p className="text-white/40 text-xs">Classes</p>
            </div>
          </div>

          {/* Curriculum */}
          <div className="flex flex-col gap-3">
            <h2 className="text-white font-semibold">Curriculum</h2>
            {curriculum?.length === 0 ? (
              <p className="text-white/40 text-sm">No curriculum added yet.</p>
            ) : (
              curriculum?.map(subject => (
                <SubjectItem key={subject._id} subject={subject} isEnrolled={isEnrolled} />
              ))
            )}
          </div>
        </div>

        {/* Right — Enroll card */}
        <div className="lg:col-span-1">
          <div className="sticky top-20 bg-white/5 border border-white/8 rounded-2xl p-6 flex flex-col gap-4">
            <div className="text-center">
              <p className="text-white text-3xl font-bold">
                {course.isFree ? "Free" : `৳${course.price}`}
              </p>
            </div>

            {/* Enrolled state */}
            {isEnrolled ? (
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-center gap-2 bg-[#7aff2e]/10 border border-[#7aff2e]/20 text-[#7aff2e] py-3 rounded-lg text-sm font-medium">
                  <CheckCircle size={16} />
                  Already Enrolled
                </div>
                <Link
                  href={`/student/learn/${enrollment._id}`}
                  className="w-full bg-[#7aff2e] hover:bg-[#8fff3a] text-black font-semibold py-3 rounded-lg text-sm transition text-center block"
                >
                  Continue Learning →
                </Link>
              </div>
            ) : checkingEnrollment ? (
              <div className="flex items-center justify-center py-3">
                <Loader2 size={16} className="animate-spin text-white/40" />
              </div>
            ) : session ? (
              <Link
                href={`/student/enroll/${course._id}`}
                className="w-full bg-[#7aff2e] hover:bg-[#8fff3a] text-black font-semibold py-3 rounded-lg text-sm transition text-center block"
              >
                {course.isFree ? "Enroll for Free" : "Buy Now"}
              </Link>
            ) : (
              <Link
                href="/login"
                className="w-full bg-[#7aff2e] hover:bg-[#8fff3a] text-black font-semibold py-3 rounded-lg text-sm transition text-center block"
              >
                Login to Enroll
              </Link>
            )}

            <div className="flex flex-col gap-2 text-sm text-white/40">
              <p>✓ {totalClasses} classes</p>
              <p>✓ {totalSubjects} subjects</p>
              <p>✓ YouTube video lessons</p>
              <p>✓ PDF resources</p>
              {course.isFree && <p>✓ 100% Free</p>}
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}