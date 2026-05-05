// src/app/(student)/student/enroll/[courseId]/page.jsx
"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { CheckCircle, Loader2, BookOpen } from "lucide-react"
import Link from "next/link"

export default function EnrollPage() {
  const { courseId } = useParams()
  const router = useRouter()
  const [course, setCourse] = useState(null)
  const [loading, setLoading] = useState(true)
  const [enrolling, setEnrolling] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    const load = async () => {
      const res = await fetch(`/api/teacher/courses/${courseId}`)
      // Public course API use করবো
      const res2 = await fetch(`/api/courses/id/${courseId}`)
      const data = await res2.json()
      setCourse(data.course)
      setLoading(false)
    }
    load()
  }, [courseId])

  const handleEnroll = async () => {
    setEnrolling(true)
    setError("")
    try {
      const res = await fetch("/api/student/enroll", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ courseId }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || "Something went wrong.")
        return
      }

      setSuccess(true)
      setTimeout(() => {
        router.push(`/student/learn/${data.enrollmentId}`)
      }, 1500)

    } catch (err) {
      setError("Something went wrong.")
    } finally {
      setEnrolling(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0E0E0E] flex items-center justify-center gap-2 text-white/40">
        <Loader2 size={20} className="animate-spin" />
        <span className="text-sm">Loading...</span>
      </div>
    )
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-[#0E0E0E] flex items-center justify-center">
        <p className="text-white/40">Course not found.</p>
      </div>
    )
  }

  if (success) {
    return (
      <div className="min-h-screen bg-[#0E0E0E] flex items-center justify-center px-4">
        <div className="text-center flex flex-col items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-[#7aff2e]/15 flex items-center justify-center">
            <CheckCircle size={32} className="text-[#7aff2e]" />
          </div>
          <h1 className="text-white text-xl font-bold">Enrolled Successfully!</h1>
          <p className="text-white/40 text-sm">Redirecting to course player...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0E0E0E] flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white/5 border border-white/8 rounded-2xl p-8 flex flex-col gap-6">

        {/* Course info */}
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-xl bg-white/5 flex items-center justify-center overflow-hidden shrink-0">
            {course.thumbnail
              ? <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" />
              : <BookOpen size={24} className="text-white/20" />
            }
          </div>
          <div>
            <h2 className="text-white font-semibold">{course.title}</h2>
            <p className="text-white/40 text-sm">{course.category}</p>
          </div>
        </div>

        {/* Price */}
        <div className="bg-white/5 rounded-xl p-4 text-center">
          <p className="text-white/40 text-sm mb-1">Course Price</p>
          <p className="text-white text-3xl font-bold">
            {course.isFree ? "Free" : `৳${course.price}`}
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        {/* Paid course notice */}
        {!course.isFree && (
          <div className="bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-sm px-4 py-3 rounded-lg">
            Payment gateway coming soon. For now, enroll directly.
          </div>
        )}

        {/* Buttons */}
        <div className="flex flex-col gap-3">
          <button
            onClick={handleEnroll}
            disabled={enrolling}
            className="w-full bg-[#7aff2e] hover:bg-[#8fff3a] disabled:opacity-50 text-black font-semibold py-3 rounded-lg text-sm transition cursor-pointer"
          >
            {enrolling ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 size={16} className="animate-spin" />
                Enrolling...
              </span>
            ) : course.isFree ? "Enroll for Free" : "Enroll Now"}
          </button>

          <Link
            href={`/courses/${course.slug}`}
            className="w-full text-center bg-white/5 hover:bg-white/10 text-white py-3 rounded-lg text-sm transition"
          >
            Back to Course
          </Link>
        </div>

      </div>
    </div>
  )
}