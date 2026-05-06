// src/app/(admin)/admin/courses/page.jsx
import { getServerSession } from "next-auth"
import authOptions from "@/lib/auth"
import { connectDB } from "@/lib/db"
import Course from "@/models/Course"
import { redirect } from "next/navigation"
import AdminCoursesClient from "./AdminCoursesClient"

async function getCourses() {
  await connectDB()
  const courses = await Course.find()
    .populate("teacherId", "name email")
    .sort({ createdAt: -1 })
  return JSON.parse(JSON.stringify(courses))
}

export default async function AdminCoursesPage() {
  const session = await getServerSession(authOptions)
  if (!session || session.user.role !== "admin") redirect("/login")

  const courses = await getCourses()
  return <AdminCoursesClient initialCourses={courses} />
}