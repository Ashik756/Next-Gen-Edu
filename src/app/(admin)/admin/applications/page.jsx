// src/app/(admin)/admin/applications/page.jsx
import { getServerSession } from "next-auth"
import authOptions from "@/lib/auth"
import { connectDB } from "@/lib/db"
import TeacherApplication from "@/models/TeacherApplication"
import { redirect } from "next/navigation"
import AdminApplicationsClient from "./AdminApplicationsClient"

async function getApplications() {
  await connectDB()
  const applications = await TeacherApplication.find({ status: "pending" })
    .sort({ createdAt: -1 })
  return JSON.parse(JSON.stringify(applications))
}

export default async function AdminApplicationsPage() {
  const session = await getServerSession(authOptions)
  if (!session || session.user.role !== "admin") redirect("/login")

  const applications = await getApplications()
  return <AdminApplicationsClient initialApplications={applications} />
}