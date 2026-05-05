// src/app/(teacher)/teacher/courses/[courseId]/curriculum/page.jsx
"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Plus, Trash2, ChevronDown, ChevronRight, ArrowLeft, Loader2 } from "lucide-react"
import Link from "next/link"

// ─── Inline Input ───────────────────────────────────────────
function InlineInput({ placeholder, onSave, onCancel }) {
  const [value, setValue] = useState("")
  return (
    <div className="flex items-center gap-2 mt-2">
      <input
        autoFocus
        value={value}
        onChange={e => setValue(e.target.value)}
        placeholder={placeholder}
        onKeyDown={e => {
          if (e.key === "Enter" && value.trim()) onSave(value.trim())
          if (e.key === "Escape") onCancel()
        }}
        className="flex-1 bg-white/5 border border-white/15 rounded-lg px-3 py-2 text-white text-sm outline-none focus:border-[#7aff2e]/50 placeholder:text-white/20"
      />
      <button
        onClick={() => value.trim() && onSave(value.trim())}
        className="px-3 py-2 bg-[#7aff2e] text-black text-xs font-semibold rounded-lg"
      >
        Save
      </button>
      <button
        onClick={onCancel}
        className="px-3 py-2 bg-white/5 text-white/50 text-xs rounded-lg hover:text-white"
      >
        Cancel
      </button>
    </div>
  )
}

// ─── Class Form ──────────────────────────────────────────────
function ClassForm({ onSave, onCancel }) {
  const [form, setForm] = useState({ title: "", youtubeUrl: "", pdfUrl: "", isFreePreview: false })

  const handleChange = e => {
    const { name, value, type, checked } = e.target
    setForm(prev => ({ ...prev, [name]: type === "checkbox" ? checked : value }))
  }

  return (
    <div className="mt-2 bg-white/5 border border-white/10 rounded-lg p-4 flex flex-col gap-3">
      <input
        autoFocus
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="Class title *"
        className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm outline-none focus:border-[#7aff2e]/50 placeholder:text-white/20"
      />
      <input
        name="youtubeUrl"
        value={form.youtubeUrl}
        onChange={handleChange}
        placeholder="YouTube URL (unlisted)"
        className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm outline-none focus:border-[#7aff2e]/50 placeholder:text-white/20"
      />
      <input
        name="pdfUrl"
        value={form.pdfUrl}
        onChange={handleChange}
        placeholder="Google Drive PDF URL"
        className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm outline-none focus:border-[#7aff2e]/50 placeholder:text-white/20"
      />
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="isFreePreview"
          name="isFreePreview"
          checked={form.isFreePreview}
          onChange={handleChange}
          className="accent-[#7aff2e]"
        />
        <label htmlFor="isFreePreview" className="text-sm text-white/60 cursor-pointer">
          Free preview
        </label>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => form.title.trim() && onSave(form)}
          className="px-4 py-2 bg-[#7aff2e] text-black text-xs font-semibold rounded-lg"
        >
          Save Class
        </button>
        <button
          onClick={onCancel}
          className="px-4 py-2 bg-white/5 text-white/50 text-xs rounded-lg hover:text-white"
        >
          Cancel
        </button>
      </div>
    </div>
  )
}

// ─── Class Item ──────────────────────────────────────────────
function ClassItem({ cls, onDelete }) {
  return (
    <div className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-white/5 group">
      <div className="flex items-center gap-2">
        <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
        <span className="text-sm text-white/70">{cls.title}</span>
        <div className="flex items-center gap-1.5 ml-1">
          {cls.youtubeUrl && <span className="text-[10px] px-1.5 py-0.5 rounded bg-red-500/15 text-red-400">YT</span>}
          {cls.pdfUrl && <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-500/15 text-blue-400">PDF</span>}
          {cls.isFreePreview && <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#7aff2e]/15 text-[#7aff2e]">Free</span>}
        </div>
      </div>
      <button
        onClick={() => onDelete(cls._id)}
        className="opacity-0 group-hover:opacity-100 text-white/30 hover:text-red-400 transition"
      >
        <Trash2 size={14} />
      </button>
    </div>
  )
}

// ─── Chapter Item ────────────────────────────────────────────
function ChapterItem({ chapter, courseId, subjectId, onDelete }) {
  const [open, setOpen] = useState(false)
  const [classes, setClasses] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(false)

  const loadClasses = async () => {
    setLoading(true)
    const res = await fetch(`/api/teacher/classes?chapterId=${chapter._id}`)
    const data = await res.json()
    setClasses(data.classes || [])
    setLoading(false)
  }

  const toggleOpen = () => {
    if (!open) loadClasses()
    setOpen(prev => !prev)
  }

  const addClass = async (form) => {
    const res = await fetch("/api/teacher/classes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, chapterId: chapter._id, subjectId, courseId }),
    })
    const data = await res.json()
    setClasses(prev => [...prev, data.class])
    setShowForm(false)
  }

  const deleteClass = async (id) => {
    await fetch(`/api/teacher/classes?id=${id}`, { method: "DELETE" })
    setClasses(prev => prev.filter(c => c._id !== id))
  }

  return (
    <div className="ml-4 mt-2">
      <div className="flex items-center justify-between group">
        <button
          onClick={toggleOpen}
          className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition"
        >
          {open ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
          {chapter.title}
        </button>
        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100">
          <button
            onClick={() => { if (!open) { setOpen(true); loadClasses() } setShowForm(true) }}
            className="text-[11px] flex items-center gap-1 text-[#7aff2e]/70 hover:text-[#7aff2e]"
          >
            <Plus size={12} /> Class
          </button>
          <button onClick={() => onDelete(chapter._id)} className="text-white/20 hover:text-red-400">
            <Trash2 size={13} />
          </button>
        </div>
      </div>

      {open && (
        <div className="ml-4 mt-1">
          {loading && <p className="text-white/30 text-xs py-1">Loading...</p>}
          {classes.map(cls => (
            <ClassItem key={cls._id} cls={cls} onDelete={deleteClass} />
          ))}
          {showForm
            ? <ClassForm onSave={addClass} onCancel={() => setShowForm(false)} />
            : <button
                onClick={() => setShowForm(true)}
                className="flex items-center gap-1.5 text-xs text-white/30 hover:text-white/60 mt-1 py-1"
              >
                <Plus size={12} /> Add Class
              </button>
          }
        </div>
      )}
    </div>
  )
}

// ─── Subject Item ────────────────────────────────────────────
function SubjectItem({ subject, courseId, onDelete }) {
  const [open, setOpen] = useState(true)
  const [chapters, setChapters] = useState([])
  const [showInput, setShowInput] = useState(false)

  useEffect(() => {
    const load = async () => {
      const res = await fetch(`/api/teacher/chapters?subjectId=${subject._id}`)
      const data = await res.json()
      setChapters(data.chapters || [])
    }
    load()
  }, [subject._id])

  const addChapter = async (title) => {
    const res = await fetch("/api/teacher/chapters", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, subjectId: subject._id, courseId }),
    })
    const data = await res.json()
    setChapters(prev => [...prev, data.chapter])
    setShowInput(false)
  }

  const deleteChapter = async (id) => {
    await fetch(`/api/teacher/chapters?id=${id}`, { method: "DELETE" })
    setChapters(prev => prev.filter(c => c._id !== id))
  }

  return (
    <div className="bg-white/5 border border-white/8 rounded-xl p-4">
      <div className="flex items-center justify-between group">
        <button
          onClick={() => setOpen(prev => !prev)}
          className="flex items-center gap-2 font-medium text-white hover:text-[#7aff2e] transition"
        >
          {open ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          {subject.title}
        </button>
        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100">
          <button
            onClick={() => setShowInput(true)}
            className="text-xs flex items-center gap-1 text-[#7aff2e]/70 hover:text-[#7aff2e]"
          >
            <Plus size={13} /> Chapter
          </button>
          <button onClick={() => onDelete(subject._id)} className="text-white/20 hover:text-red-400">
            <Trash2 size={14} />
          </button>
        </div>
      </div>

      {open && (
        <div className="mt-2">
          {chapters.map(chapter => (
            <ChapterItem
              key={chapter._id}
              chapter={chapter}
              courseId={courseId}
              subjectId={subject._id}
              onDelete={deleteChapter}
            />
          ))}
          {showInput
            ? <InlineInput
                placeholder="Chapter title"
                onSave={addChapter}
                onCancel={() => setShowInput(false)}
              />
            : <button
                onClick={() => setShowInput(true)}
                className="flex items-center gap-1.5 text-xs text-white/30 hover:text-white/60 mt-2 ml-4"
              >
                <Plus size={12} /> Add Chapter
              </button>
          }
        </div>
      )}
    </div>
  )
}

// ─── Main Page ───────────────────────────────────────────────
export default function CurriculumPage() {
  const { courseId } = useParams()
  const [subjects, setSubjects] = useState([])
  const [showInput, setShowInput] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      const res = await fetch(`/api/teacher/subjects?courseId=${courseId}`)
      const data = await res.json()
      setSubjects(data.subjects || [])
      setLoading(false)
    }
    load()
  }, [courseId])

  const addSubject = async (title) => {
    const res = await fetch("/api/teacher/subjects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, courseId }),
    })
    const data = await res.json()
    setSubjects(prev => [...prev, data.subject])
    setShowInput(false)
  }

  const deleteSubject = async (id) => {
    await fetch(`/api/teacher/subjects?id=${id}`, { method: "DELETE" })
    setSubjects(prev => prev.filter(s => s._id !== id))
  }

  return (
    <div className="max-w-2xl mx-auto flex flex-col gap-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/teacher/courses" className="text-white/40 hover:text-white transition">
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-white font-semibold text-lg">Curriculum</h1>
            <p className="text-white/40 text-sm">Add subjects, chapters and classes</p>
          </div>
        </div>
        <Link
          href={`/teacher/courses/${courseId}/edit`}
          className="text-xs px-3 py-1.5 rounded-lg bg-white/5 text-white/50 hover:text-white transition"
        >
          Edit Course Info
        </Link>
      </div>

      {/* Subjects */}
      {loading ? (
        <div className="flex items-center gap-2 text-white/40">
          <Loader2 size={16} className="animate-spin" />
          <span className="text-sm">Loading...</span>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {subjects.map(subject => (
            <SubjectItem
              key={subject._id}
              subject={subject}
              courseId={courseId}
              onDelete={deleteSubject}
            />
          ))}

          {showInput
            ? <InlineInput
                placeholder="Subject name (e.g. Physics)"
                onSave={addSubject}
                onCancel={() => setShowInput(false)}
              />
            : <button
                onClick={() => setShowInput(true)}
                className="flex items-center gap-2 text-sm text-white/40 hover:text-white border border-dashed border-white/15 hover:border-white/30 rounded-xl px-4 py-3 transition"
              >
                <Plus size={16} />
                Add Subject
              </button>
          }
        </div>
      )}
    </div>
  )
}