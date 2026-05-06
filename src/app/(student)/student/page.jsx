// src/app/(student)/student/page.jsx
import { getServerSession } from "next-auth"
import authOptions from "@/lib/auth"
import { connectDB } from "@/lib/db"
import Enrollment from "@/models/Enrollment"
import { redirect } from "next/navigation"
import StudentDashboardClient from "./StudentDashboardClient"

async function getStudentData(studentId) {
  await connectDB()
  const [totalEnrolled, recentEnrollments] = await Promise.all([
    Enrollment.countDocuments({ studentId }),
    Enrollment.find({ studentId })
      .populate("courseId", "title thumbnail isFree price")
      .sort({ enrolledAt: -1 })
      .limit(5),
  ])
  return {
    totalEnrolled,
    recentEnrollments: JSON.parse(JSON.stringify(recentEnrollments)),
  }
}

export default async function StudentPage() {
  const session = await getServerSession(authOptions)
  if (!session) redirect("/login")

  const data = await getStudentData(session.user.id)
  return <StudentDashboardClient data={data} />
}