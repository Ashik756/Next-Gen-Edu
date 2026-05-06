// src/app/(teacher)/teacher/students/page.jsx
import { getServerSession } from "next-auth"
import authOptions from "@/lib/auth"
import { connectDB } from "@/lib/db"
import Enrollment from "@/models/Enrollment"
import Course from "@/models/Course"
import { redirect } from "next/navigation"
import TeacherStudentsClient from "./TeacherStudentsClient"
import mongoose from "mongoose"

async function getStudents(teacherId) {
  await connectDB()
  const id = new mongoose.Types.ObjectId(teacherId)
  const courses = await Course.find({ teacherId: id }).select("_id")
  const courseIds = courses.map(c => c._id)

  const enrollments = await Enrollment.find({ courseId: { $in: courseIds } })
    .populate("studentId", "name email image")
    .populate("courseId", "title")
    .sort({ enrolledAt: -1 })

  return JSON.parse(JSON.stringify(enrollments))
}

export default async function TeacherStudentsPage() {
  const session = await getServerSession(authOptions)
  if (!session || session.user.role !== "teacher") redirect("/login")

  const enrollments = await getStudents(session.user.id)
  return <TeacherStudentsClient initialEnrollments={enrollments} />
}