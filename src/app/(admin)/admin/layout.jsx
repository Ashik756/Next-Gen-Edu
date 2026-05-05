// src/app/(admin)/admin/layout.js
import DashboardLayout from "@/components/DashboardLayout"

export default function AdminLayout({ children }) {
  return <DashboardLayout title="Admin Dashboard">{children}</DashboardLayout>
}