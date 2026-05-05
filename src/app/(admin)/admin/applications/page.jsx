"use client"

import { useEffect, useState } from "react"
import { Loader2, ClipboardList } from "lucide-react"

function ApplicationRow({ app, onAction }) {
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState(app.status)

  const handleAction = async (newStatus) => {
    setLoading(true)

    try {
      const res = await fetch(`/api/admin/applications/${app._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      })

      if (res.ok) {
        setStatus(newStatus)
        onAction(app._id, newStatus)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-start justify-between py-4 border-b border-white/8 last:border-0 gap-4">
      <div className="flex flex-col gap-1">
        <p className="text-sm font-medium text-white">{app.name}</p>
        <p className="text-xs text-white/40">{app.email}</p>

        <p className="text-xs text-white/60 mt-1">
          <span className="text-white/30">Expertise: </span>
          {app.expertise}
        </p>

        {app.bio && (
          <p className="text-xs text-white/40 mt-1 max-w-md">
            {app.bio}
          </p>
        )}

        {app.socialLinks && (
          <a
            href={app.socialLinks}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-blue-400 hover:underline mt-1"
          >
            {app.socialLinks}
          </a>
        )}
      </div>

      <div className="flex items-center gap-2 shrink-0">
        {status === "pending" ? (
          <>
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
          </>
        ) : (
          <span
            className={`text-xs px-3 py-1.5 rounded-lg ${
              status === "approved"
                ? "bg-[#7aff2e]/10 text-[#7aff2e]"
                : "bg-red-500/10 text-red-400"
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </span>
        )}
      </div>
    </div>
  )
}

export default function AdminApplicationsPage() {
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState("pending")

  useEffect(() => {
    let cancelled = false

    const load = async () => {
      try {
        setLoading(true)

        const res = await fetch(
          `/api/admin/applications?status=${filter}`
        )

        const data = await res.json()

        if (!cancelled) {
          setApplications(data.applications || [])
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    load()

    return () => {
      cancelled = true
    }
  }, [filter])

  const handleAction = (id) => {
    if (filter === "pending") {
      setApplications((prev) =>
        prev.filter((a) => a._id !== id)
      )
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-white font-semibold text-lg">
          Teacher Applications
        </h1>

        <p className="text-white/40 text-sm">
          {applications.length} {filter} applications
        </p>
      </div>

      <div className="flex items-center gap-2">
        {["pending", "approved", "rejected"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-1.5 rounded-full text-sm transition ${
              filter === f
                ? "bg-[#7aff2e] text-black font-semibold"
                : "bg-white/5 text-white/50 hover:text-white"
            }`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      <div className="bg-white/5 border border-white/8 rounded-xl p-5">
        {loading ? (
          <div className="flex items-center gap-2 text-white/40">
            <Loader2 size={16} className="animate-spin" />
            <span className="text-sm">Loading...</span>
          </div>
        ) : applications.length === 0 ? (
          <div className="text-center py-8">
            <ClipboardList
              size={32}
              className="text-white/20 mx-auto mb-2"
            />

            <p className="text-white/40 text-sm">
              No {filter} applications.
            </p>
          </div>
        ) : (
          applications.map((app) => (
            <ApplicationRow
              key={app._id}
              app={app}
              onAction={handleAction}
            />
          ))
        )}
      </div>
    </div>
  )
}