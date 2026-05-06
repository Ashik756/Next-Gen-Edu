// src/app/(admin)/admin/AdminDashboardClient.jsx
"use client"

import { useState } from "react"
import { Users, GraduationCap, BookOpen, School } from "lucide-react"

const STATS = [
  { key: "totalUsers", label: "Total Users", icon: Users, color: "text-blue-400" },
  { key: "totalTeachers", label: "Teachers", icon: School, color: "text-purple-400" },
  { key: "totalStudents", label: "Students", icon: GraduationCap, color: "text-green-400" },
  { key: "totalCourses", label: "Courses", icon: BookOpen, color: "text-[#7aff2e]" },
]

function StatCard({ label, value, icon: Icon, color }) {
  return (
    <div className="bg-white/5 border border-white/8 rounded-xl p-5 flex items-center gap-4">
      <div className={`p-3 rounded-lg bg-white/5 ${color}`}>
        <Icon size={20} />
      </div>
      <div>
        <p className="text-white/50 text-sm">{label}</p>
        <p className="text-white text-2xl font-bold">{value}</p>
      </div>
    </div>
  )
}

function ApplicationRow({ app, onAction }) {
  const [loading, setLoading] = useState(false)

  const handleAction = async (status) => {
    setLoading(true)
    await fetch(`/api/admin/applications/${app._id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    })
    onAction(app._id)
    setLoading(false)
  }

  return (
    <div className="flex items-center justify-between py-3 border-b border-white/8 last:border-0">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-[#7aff2e] flex items-center justify-center text-black font-bold text-sm">
          {app.name?.charAt(0).toUpperCase()}
        </div>
        <div>
          <p className="text-sm font-medium text-white">{app.name}</p>
          <p className="text-xs text-white/40">{app.email}</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={() => handleAction("approved")}
          disabled={loading}
          className="text-xs px-3 py-1.5 rounded-lg bg-[#7aff2e]/10 text-[#7aff2e] hover:bg-[#7aff2e]/20 transition disabled:opacity-50"
        >
          Approve
        </button>
        <button
          onClick={() => handleAction("rejected")}
          disabled={loading}
          className="text-xs px-3 py-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition disabled:opacity-50"
        >
          Reject
        </button>
      </div>
    </div>
  )
}

export default function AdminDashboardClient({ analytics, initialApplications }) {
  const [applications, setApplications] = useState(initialApplications)

  const handleAction = (id) => {
    setApplications(prev => prev.filter(a => a._id !== id))
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-white/50 text-sm font-medium mb-3">Overview</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {STATS.map(({ key, label, icon, color }) => (
            <StatCard key={key} label={label} value={analytics[key]} icon={icon} color={color} />
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-white/50 text-sm font-medium mb-3">Pending Teacher Applications</h2>
        <div className="bg-white/5 border border-white/8 rounded-xl p-5">
          {applications.length === 0 ? (
            <p className="text-white/40 text-sm">No pending applications.</p>
          ) : (
            applications.map(app => (
              <ApplicationRow key={app._id} app={app} onAction={handleAction} />
            ))
          )}
        </div>
      </div>
    </div>
  )
}