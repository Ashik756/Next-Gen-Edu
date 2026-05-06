// src/app/(admin)/admin/users/page.jsx
import { getServerSession } from "next-auth"
import authOptions from "@/lib/auth"
import { connectDB } from "@/lib/db"
import User from "@/models/User"
import { redirect } from "next/navigation"
import AdminUsersClient from "./AdminUsersClient"

async function getUsers() {
  await connectDB()
  const users = await User.find()
    .select("name email role image createdAt")
    .sort({ createdAt: -1 })
  return JSON.parse(JSON.stringify(users))
}

export default async function AdminUsersPage() {
  const session = await getServerSession(authOptions)
  if (!session || session.user.role !== "admin") redirect("/login")

  const users = await getUsers()
  return <AdminUsersClient initialUsers={users} />
}