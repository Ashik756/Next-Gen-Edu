// src/app/(teacher)/teacher/students/TeacherStudentsClient.jsx
"use client"

import { useState } from "react"
import { Users } from "lucide-react"
import Image from "next/image"

function EnrollmentRow({ enrollment }) {
  const student = enrollment.studentId
  const course = enrollment.courseId
  return (
    <div className="flex items-center justify-between py-3 border-b border-white/8 last:border-0 gap-4">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-[#7aff2e] flex items-center justify-center text-black font-bold text-sm overflow-hidden shrink-0">
          {student?.image
            ? <Image src={student.image} alt={student.name} width={36} height={36} className="object-cover" />
            : student?.name?.charAt(0).toUpperCase()
          }
        </div>
        <div>
          <p className="text-sm font-medium text-white">{student?.name}</p>
          <p className="text-xs text-white/40">{student?.email}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-xs text-white/60">{course?.title}</p>
        <p className="text-xs text-white/30 mt-0.5">
          {new Date(enrollment.enrolledAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  )
}

export default function TeacherStudentsClient({ initialEnrollments }) {
  const [enrollments] = useState(initialEnrollments)
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-white font-semibold text-lg">My Students</h1>
        <p className="text-white/40 text-sm">{enrollments.length} total enrollments</p>
      </div>
      <div className="bg-white/5 border border-white/8 rounded-xl p-5">
        {enrollments.length === 0 ? (
          <div className="text-center py-8">
            <Users size={32} className="text-white/20 mx-auto mb-2" />
            <p className="text-white/40 text-sm">No students yet.</p>
          </div>
        ) : (
          enrollments.map(e => <EnrollmentRow key={e._id} enrollment={e} />)
        )}
      </div>
    </div>
  )
}