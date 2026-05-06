// src/app/(teacher)/teacher/page.jsx
import { getServerSession } from "next-auth"
import authOptions from "@/lib/auth"
import { connectDB } from "@/lib/db"
import Course from "@/models/Course"
import Enrollment from "@/models/Enrollment"
import Subscription from "@/models/Subscription"
import { redirect } from "next/navigation"
import TeacherDashboardClient from "./TeacherDashboardClient"
import mongoose from "mongoose"

async function getTeacherData(teacherId) {
  await connectDB()
  const id = new mongoose.Types.ObjectId(teacherId)
  const courses = await Course.find({ teacherId: id }).select("_id title isFree price isPublished").sort({ createdAt: -1 })
  const courseIds = courses.map(c => c._id)

  const [totalStudents, subscription] = await Promise.all([
    Enrollment.countDocuments({ courseId: { $in: courseIds } }),
    Subscription.findOne({ teacherId: id, status: "active" }).sort({ createdAt: -1 }),
  ])

  return {
    totalCourses: courses.length,
    totalStudents,
    subscription: subscription ? JSON.parse(JSON.stringify(subscription)) : null,
    recentCourses: JSON.parse(JSON.stringify(courses.slice(0, 5))),
  }
}

export default async function TeacherPage() {
  const session = await getServerSession(authOptions)
  if (!session || session.user.role !== "teacher") redirect("/login")

  const data = await getTeacherData(session.user.id)
  return <TeacherDashboardClient data={data} />
}