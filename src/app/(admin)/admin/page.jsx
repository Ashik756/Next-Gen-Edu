// src/app/(admin)/admin/page.js
"use client"

import { useEffect, useState } from "react"
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
                <p className="text-white text-2xl font-bold">{value ?? "..."}</p>
            </div>
        </div>
    )
}

function ApplicationRow({ app, onAction }) {
    const [loading, setLoading] = useState(false)

    const handleAction = async (status) => {
        setLoading(true)
        await onAction(app._id, status)
        setLoading(false)
    }

    return (
        <div className="flex items-center justify-between py-3 border-b border-white/8 last:border-0">
            <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#7aff2e] flex items-center justify-center text-black font-bold text-sm">
                    {app.userId?.name?.charAt(0).toUpperCase()}
                </div>
                <div>
                    <p className="text-sm font-medium text-white">{app.userId?.name}</p>
                    <p className="text-xs text-white/40">{app.userId?.email}</p>
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

export default function AdminDashboard() {
    const [stats, setStats] = useState(null)
    const [applications, setApplications] = useState([])
    const [loading, setLoading] = useState(true)

    const fetchData = async () => {
        try {
            const [statsRes, appsRes] = await Promise.all([
                fetch("/api/admin/analytics"),
                fetch("/api/admin/applications"),
            ])
            const statsData = await statsRes.json()
            const appsData = await appsRes.json()
            setStats(statsData)
            setApplications(appsData.applications || [])
        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        let cancelled = false

        const load = async () => {
            try {
                const [statsRes, appsRes] = await Promise.all([
                    fetch("/api/admin/analytics"),
                    fetch("/api/admin/applications"),
                ])

                // ✅ Response ok কিনা check করো
                if (!statsRes.ok || !appsRes.ok) {
                    console.error("API error:", statsRes.status, appsRes.status)
                    return
                }

                const statsData = await statsRes.json()
                const appsData = await appsRes.json()

                if (!cancelled) {
                    setStats(statsData)
                    setApplications(appsData.applications || [])
                }
            } catch (err) {
                console.error(err)
            } finally {
                if (!cancelled) setLoading(false)
            }
        }

        load()

        return () => { cancelled = true }
    }, [])

    const handleAction = async (id, status) => {
        try {
            await fetch(`/api/admin/applications/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status }),
            })
            // Refresh data
            fetchData()
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <div className="flex flex-col gap-6">

            {/* Stats */}
            <div>
                <h2 className="text-white/50 text-sm font-medium mb-3">Overview</h2>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {STATS.map(({ key, label, icon, color }) => (
                        <StatCard
                            key={key}
                            label={label}
                            value={loading ? "..." : stats?.[key]}
                            icon={icon}
                            color={color}
                        />
                    ))}
                </div>
            </div>

            {/* Applications */}
            <div>
                <h2 className="text-white/50 text-sm font-medium mb-3">Pending Teacher Applications</h2>
                <div className="bg-white/5 border border-white/8 rounded-xl p-5">
                    {loading ? (
                        <p className="text-white/40 text-sm">Loading...</p>
                    ) : applications.length === 0 ? (
                        <p className="text-white/40 text-sm">No pending applications.</p>
                    ) : (
                        applications.map((app) => (
                            <ApplicationRow key={app._id} app={app} onAction={handleAction} />
                        ))
                    )}
                </div>
            </div>

        </div>
    )
}