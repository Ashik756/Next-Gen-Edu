// src/app/(student)/student/purchases/page.jsx
"use client"

import { useEffect, useState } from "react"
import { Loader2, BookOpen, PlayCircle } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function PurchasesPage() {
  const [enrollments, setEnrollments] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    const load = async () => {
      const res = await fetch("/api/student/analytics")
      const data = await res.json()
      if (!cancelled) {
        setEnrollments(data.recentEnrollments || [])
        setLoading(false)
      }
    }
    load()
    return () => { cancelled = true }
  }, [])

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-white font-semibold text-lg">My Courses</h1>
        <p className="text-white/40 text-sm">{enrollments.length} enrolled courses</p>
      </div>

      <div className="flex flex-col gap-3">
        {loading ? (
          <div className="flex items-center gap-2 text-white/40">
            <Loader2 size={16} className="animate-spin" />
            <span className="text-sm">Loading...</span>
          </div>
        ) : enrollments.length === 0 ? (
          <div className="text-center py-16 bg-white/5 border border-white/8 rounded-xl">
            <BookOpen size={32} className="text-white/20 mx-auto mb-3" />
            <p className="text-white/40 text-sm">No courses enrolled yet.</p>
            <Link
              href="/courses"
              className="inline-flex items-center gap-2 mt-4 bg-[#7aff2e] text-black px-4 py-2 rounded-lg text-sm font-semibold"
            >
              Browse Courses
            </Link>
          </div>
        ) : (
          enrollments.map(enrollment => {
            const course = enrollment.courseId
            if (!course) return null
            return (
              <div key={enrollment._id} className="bg-white/5 border border-white/8 rounded-xl p-4 flex items-center gap-4">
                <div className="w-14 h-14 rounded-lg bg-white/5 flex items-center justify-center overflow-hidden shrink-0">
                  {course.thumbnail
                    ? <Image src={course.thumbnail} alt={course.title} width={56} height={56} className="object-cover" />
                    : <BookOpen size={20} className="text-white/20" />
                  }
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-medium text-sm truncate">{course.title}</p>
                  <p className="text-white/40 text-xs mt-0.5">
                    {course.isFree ? "Free" : `৳${course.price}`} • Enrolled {new Date(enrollment.enrolledAt).toLocaleDateString()}
                  </p>
                </div>
                <Link
                  href={`/student/learn/${enrollment._id}`}
                  className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-[#7aff2e]/10 text-[#7aff2e] hover:bg-[#7aff2e]/20 transition shrink-0"
                >
                  <PlayCircle size={14} />
                  Continue
                </Link>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}