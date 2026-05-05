// src/app/(teacher)/teacher/layout.js
import DashboardLayout from "@/components/DashboardLayout"

export default function TeacherLayout({ children }) {
  return <DashboardLayout title="Teacher Dashboard">{children}</DashboardLayout>
}