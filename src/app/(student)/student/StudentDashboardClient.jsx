// src/app/(student)/student/StudentDashboardClient.jsx
"use client"

import { BookOpen, CheckCircle, PlayCircle } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

function StatCard({ label, value, icon: Icon, color }) {
  return (
    <div className="bg-white/5 border border-white/8 rounded-xl p-5 flex items-center gap-4">
      <div className={`p-3 rounded-lg bg-white/5 ${color}`}>
        <Icon size={20} />
      </div>
      <div>
        <p className="text-white/50 text-sm">{label}</p>
        <p className="text-white text-2xl font-bold">{value}</p>
      </div>
    </div>
  )
}

function EnrollmentRow({ enrollment }) {
  const course = enrollment.courseId
  if (!course) return null
  return (
    <div className="flex items-center justify-between py-3 border-b border-white/8 last:border-0">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center overflow-hidden">
          {course.thumbnail
            ? <Image src={course.thumbnail} alt={course.title} width={40} height={40} className="object-cover" />
            : <BookOpen size={16} className="text-white/30" />
          }
        </div>
        <div>
          <p className="text-sm font-medium text-white">{course.title}</p>
          <p className="text-xs text-white/40">{course.isFree ? "Free" : `৳${course.price}`}</p>
        </div>
      </div>
      <Link href={`/student/learn/${enrollment._id}`}
        className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-[#7aff2e]/10 text-[#7aff2e] hover:bg-[#7aff2e]/20 transition">
        <PlayCircle size={14} /> Continue
      </Link>
    </div>
  )
}

export default function StudentDashboardClient({ data }) {
  const { totalEnrolled, recentEnrollments } = data
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-white/50 text-sm font-medium mb-3">Overview</h2>
        <div className="grid grid-cols-2 gap-4">
          <StatCard label="Enrolled Courses" value={totalEnrolled} icon={BookOpen} color="text-[#7aff2e]" />
          <StatCard label="Completed" value={0} icon={CheckCircle} color="text-blue-400" />
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-white/50 text-sm font-medium">My Courses</h2>
          <Link href="/courses"
            className="text-xs px-3 py-1.5 rounded-lg bg-white/5 text-white/50 hover:text-white hover:bg-white/10 transition">
            Browse Courses
          </Link>
        </div>
        <div className="bg-white/5 border border-white/8 rounded-xl p-5">
          {recentEnrollments.length === 0 ? (
            <div className="text-center py-6">
              <p className="text-white/40 text-sm">No courses enrolled yet.</p>
              <Link href="/courses"
                className="inline-flex items-center gap-1.5 mt-3 text-xs px-4 py-2 rounded-lg bg-[#7aff2e] text-black font-semibold">
                Browse Courses
              </Link>
            </div>
          ) : (
            recentEnrollments.map(e => <EnrollmentRow key={e._id} enrollment={e} />)
          )}
        </div>
      </div>
    </div>
  )
}