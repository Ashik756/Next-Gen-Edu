// src/app/(teacher)/teacher/courses/page.jsx
"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Plus, Pencil, BookOpen, Trash2, Loader2 } from "lucide-react"

function CourseCard({ course, onDelete }) {
  const [deleting, setDeleting] = useState(false)

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this course?")) return
    setDeleting(true)
    await fetch(`/api/teacher/courses/${course._id}`, { method: "DELETE" })
    onDelete(course._id)
  }

  return (
    <div className="bg-white/5 border border-white/8 rounded-xl p-5 flex items-start justify-between gap-4">
      <div className="flex items-start gap-4">
        <div className="w-14 h-14 rounded-lg bg-white/5 flex items-center justify-center overflow-hidden shrink-0">
          {course.thumbnail
            ? <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" />
            : <BookOpen size={20} className="text-white/20" />
          }
        </div>
        <div>
          <h3 className="text-white font-medium text-sm">{course.title}</h3>
          <p className="text-white/40 text-xs mt-0.5">{course.category}</p>
          <div className="flex items-center gap-2 mt-2">
            <span className={`text-[11px] px-2 py-0.5 rounded-full ${course.isPublished ? "bg-[#7aff2e]/15 text-[#7aff2e]" : "bg-yellow-500/15 text-yellow-400"}`}>
              {course.isPublished ? "Published" : "Draft"}
            </span>
            <span className="text-[11px] px-2 py-0.5 rounded-full bg-white/5 text-white/40">
              {course.isFree ? "Free" : `৳${course.price}`}
            </span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <Link
          href={`/teacher/courses/${course._id}/curriculum`}
          className="text-xs px-3 py-1.5 rounded-lg bg-white/5 text-white/50 hover:text-white hover:bg-white/10 transition"
        >
          Curriculum
        </Link>
        <Link
          href={`/teacher/courses/${course._id}/edit`}
          className="p-1.5 rounded-lg bg-white/5 text-white/50 hover:text-white hover:bg-white/10 transition"
        >
          <Pencil size={14} />
        </Link>
        <button
          onClick={handleDelete}
          disabled={deleting}
          className="p-1.5 rounded-lg bg-white/5 text-white/50 hover:text-red-400 hover:bg-red-500/10 transition disabled:opacity-50"
        >
          <Trash2 size={14} />
        </button>
      </div>
    </div>
  )
}

export default function CoursesPage() {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    const load = async () => {
      const res = await fetch("/api/teacher/courses")
      const data = await res.json()
      if (!cancelled) {
        setCourses(data.courses || [])
        setLoading(false)
      }
    }
    load()
    return () => { cancelled = true }
  }, [])

  const handleDelete = (id) => {
    setCourses(prev => prev.filter(c => c._id !== id))
  }

  return (
    <div className="flex flex-col gap-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-white font-semibold text-lg">My Courses</h1>
          <p className="text-white/40 text-sm">{courses.length} course{courses.length !== 1 ? "s" : ""}</p>
        </div>
        <Link
          href="/teacher/courses/new"
          className="flex items-center gap-2 bg-[#7aff2e] text-black px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#8fff3a] transition"
        >
          <Plus size={16} />
          New Course
        </Link>
      </div>

      {/* List */}
      {loading ? (
        <div className="flex items-center gap-2 text-white/40">
          <Loader2 size={16} className="animate-spin" />
          <span className="text-sm">Loading...</span>
        </div>
      ) : courses.length === 0 ? (
        <div className="text-center py-16 bg-white/5 border border-white/8 rounded-xl">
          <BookOpen size={32} className="text-white/20 mx-auto mb-3" />
          <p className="text-white/40 text-sm">No courses yet.</p>
          <Link
            href="/teacher/courses/new"
            className="inline-flex items-center gap-2 mt-4 bg-[#7aff2e] text-black px-4 py-2 rounded-lg text-sm font-semibold"
          >
            <Plus size={16} />
            Create your first course
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {courses.map(course => (
            <CourseCard key={course._id} course={course} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  )
}