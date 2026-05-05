// src/app/(student)/student/layout.js
import DashboardLayout from "@/components/DashboardLayout"

export default function StudentLayout({ children }) {
  return <DashboardLayout title="Student Dashboard">{children}</DashboardLayout>
}