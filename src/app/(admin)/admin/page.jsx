// src/app/(admin)/admin/page.jsx
import { getServerSession } from "next-auth"
import authOptions from "@/lib/auth"
import { connectDB } from "@/lib/db"
import User from "@/models/User"
import Course from "@/models/Course"
import { redirect } from "next/navigation"
import AdminDashboardClient from "./AdminDashboardClient"

async function getAnalytics() {
  await connectDB()
  const [totalUsers, totalTeachers, totalStudents, totalCourses] = await Promise.all([
    User.countDocuments(),
    User.countDocuments({ role: "teacher" }),
    User.countDocuments({ role: "student" }),
    Course.countDocuments(),
  ])
  return { totalUsers, totalTeachers, totalStudents, totalCourses }
}

async function getPendingApplications() {
  const { default: TeacherApplication } = await import("@/models/TeacherApplication")
  const applications = await TeacherApplication.find({ status: "pending" })
    .sort({ createdAt: -1 })
    .limit(10)
  return JSON.parse(JSON.stringify(applications))
}

export default async function AdminPage() {
  const session = await getServerSession(authOptions)
  if (!session || session.user.role !== "admin") redirect("/login")

  await connectDB()
  const [analytics, applications] = await Promise.all([
    getAnalytics(),
    getPendingApplications(),
  ])

  return <AdminDashboardClient analytics={analytics} initialApplications={applications} />
}