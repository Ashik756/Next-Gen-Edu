// src/app/(admin)/admin/courses/page.jsx
"use client"

import { useEffect, useState } from "react"
import { Loader2, BookOpen, Star } from "lucide-react"

function CourseRow({ course }) {
  const [featured, setFeatured] = useState(course.isFeatured)
  const [saving, setSaving] = useState(false)

  const handleToggleFeatured = async () => {
    setSaving(true)
    const res = await fetch("/api/admin/courses", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ courseId: course._id, isFeatured: !featured }),
    })
    if (res.ok) setFeatured(prev => !prev)
    setSaving(false)
  }

  return (
    <div className="flex items-center justify-between py-3 border-b border-white/8 last:border-0 gap-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center overflow-hidden shrink-0">
          {course.thumbnail
            ? <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" />
            : <BookOpen size={16} className="text-white/20" />
          }
        </div>
        <div>
          <p className="text-sm font-medium text-white">{course.title}</p>
          <p className="text-xs text-white/40">
            {course.teacherId?.name} • {course.category} •{" "}
            <span className={course.isPublished ? "text-[#7aff2e]" : "text-yellow-400"}>
              {course.isPublished ? "Published" : "Draft"}
            </span>
          </p>
        </div>
      </div>
      <div className="flex items-center gap-3 shrink-0">
        <span className="text-sm text-white/60">
          {course.isFree ? "Free" : `৳${course.price}`}
        </span>
        <button
          onClick={handleToggleFeatured}
          disabled={saving}
          className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg transition disabled:opacity-50 ${
            featured
              ? "bg-yellow-500/15 text-yellow-400 hover:bg-yellow-500/25"
              : "bg-white/5 text-white/40 hover:text-yellow-400 hover:bg-yellow-500/10"
          }`}
        >
          <Star size={12} fill={featured ? "currentColor" : "none"} />
          {saving ? "..." : featured ? "Featured" : "Feature"}
        </button>
      </div>
    </div>
  )
}

export default function AdminCoursesPage() {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    const load = async () => {
      const res = await fetch("/api/admin/courses")
      const data = await res.json()
      if (!cancelled) {
        setCourses(data.courses || [])
        setLoading(false)
      }
    }
    load()
    return () => { cancelled = true }
  }, [])

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-white font-semibold text-lg">All Courses</h1>
        <p className="text-white/40 text-sm">{courses.length} total courses</p>
      </div>

      <div className="bg-white/5 border border-white/8 rounded-xl p-5">
        {loading ? (
          <div className="flex items-center gap-2 text-white/40">
            <Loader2 size={16} className="animate-spin" />
            <span className="text-sm">Loading...</span>
          </div>
        ) : courses.length === 0 ? (
          <div className="text-center py-8">
            <BookOpen size={32} className="text-white/20 mx-auto mb-2" />
            <p className="text-white/40 text-sm">No courses found.</p>
          </div>
        ) : (
          courses.map(course => (
            <CourseRow key={course._id} course={course} />
          ))
        )}
      </div>
    </div>
  )
}