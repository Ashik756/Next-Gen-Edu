// src/app/(teacher)/teacher/TeacherDashboardClient.jsx
"use client"

import { BookOpen, Users, CreditCard, Plus } from "lucide-react"
import Link from "next/link"

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

function CourseRow({ course }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-white/8 last:border-0">
      <div>
        <p className="text-sm font-medium text-white">{course.title}</p>
        <p className="text-xs text-white/40">
          {course.isFree ? "Free" : `৳${course.price}`} •{" "}
          <span className={course.isPublished ? "text-[#7aff2e]" : "text-yellow-400"}>
            {course.isPublished ? "Published" : "Draft"}
          </span>
        </p>
      </div>
      <Link href={`/teacher/courses/${course._id}/edit`}
        className="text-xs px-3 py-1.5 rounded-lg bg-white/5 text-white/50 hover:text-white hover:bg-white/10 transition">
        Edit
      </Link>
    </div>
  )
}

export default function TeacherDashboardClient({ data }) {
  const { totalCourses, totalStudents, subscription, recentCourses } = data

  const subscriptionStatus = subscription
    ? `Active — expires ${new Date(subscription.endDate).toLocaleDateString()}`
    : "No active subscription"

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-white/50 text-sm font-medium mb-3">Overview</h2>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          <StatCard label="My Courses" value={totalCourses} icon={BookOpen} color="text-[#7aff2e]" />
          <StatCard label="Total Students" value={totalStudents} icon={Users} color="text-blue-400" />
          <div className="col-span-2 lg:col-span-1 bg-white/5 border border-white/8 rounded-xl p-5 flex items-center gap-4">
            <div className="p-3 rounded-lg bg-white/5 text-purple-400">
              <CreditCard size={20} />
            </div>
            <div>
              <p className="text-white/50 text-sm">Subscription</p>
              <p className={`text-sm font-semibold ${subscription ? "text-[#7aff2e]" : "text-red-400"}`}>
                {subscriptionStatus}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-white/50 text-sm font-medium">Recent Courses</h2>
          <Link href="/teacher/courses/new"
            className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-[#7aff2e]/10 text-[#7aff2e] hover:bg-[#7aff2e]/20 transition">
            <Plus size={14} /> New Course
          </Link>
        </div>
        <div className="bg-white/5 border border-white/8 rounded-xl p-5">
          {recentCourses.length === 0 ? (
            <div className="text-center py-6">
              <p className="text-white/40 text-sm">No courses yet.</p>
              <Link href="/teacher/courses/new"
                className="inline-flex items-center gap-1.5 mt-3 text-xs px-4 py-2 rounded-lg bg-[#7aff2e] text-black font-semibold">
                <Plus size={14} /> Create your first course
              </Link>
            </div>
          ) : (
            recentCourses.map(course => <CourseRow key={course._id} course={course} />)
          )}
        </div>
      </div>
    </div>
  )
}