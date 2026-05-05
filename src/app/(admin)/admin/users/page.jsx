// src/app/(admin)/admin/users/page.jsx
"use client"

import { useEffect, useState } from "react"
import { Loader2, Users } from "lucide-react"
import Image from "next/image"

const ROLES = ["student", "teacher", "admin"]

const ROLE_STYLE = {
  admin: "bg-purple-500/15 text-purple-400",
  teacher: "bg-blue-500/15 text-blue-400",
  student: "bg-white/10 text-white/50",
}

function UserRow({ user, onRoleChange }) {
  const [role, setRole] = useState(user.role)
  const [saving, setSaving] = useState(false)

  const handleRoleChange = async (newRole) => {
    setSaving(true)
    const res = await fetch("/api/admin/users", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: user._id, role: newRole }),
    })
    if (res.ok) {
      setRole(newRole)
      onRoleChange(user._id, newRole)
    }
    setSaving(false)
  }

  return (
    <div className="flex items-center gap-4 py-4 border-b border-white/8 last:border-0">

      {/* Avatar + Info */}
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <div className="w-9 h-9 rounded-full bg-[#7aff2e] flex items-center justify-center text-black font-bold text-sm overflow-hidden shrink-0">
          {user.image
            ? <Image src={user.image} alt={user.name} width={36} height={36} className="object-cover" />
            : user.name?.charAt(0).toUpperCase()
          }
        </div>
        <div className="min-w-0">
          <p className="text-sm font-medium text-white truncate">{user.name}</p>
          <p className="text-xs text-white/40 truncate">{user.email}</p>
        </div>
      </div>

      {/* Current Role Badge */}
      <div className="shrink-0">
        <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${ROLE_STYLE[role]}`}>
          {role}
        </span>
      </div>

      {/* Role Change */}
      <div className="flex items-center gap-2 shrink-0">
        <select
          value={role}
          onChange={e => handleRoleChange(e.target.value)}
          disabled={saving}
          className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-white text-xs outline-none focus:border-[#7aff2e]/50 transition disabled:opacity-50 cursor-pointer"
        >
          {ROLES.map(r => (
            <option key={r} value={r} className="bg-[#0E0E0E]">
              {r.charAt(0).toUpperCase() + r.slice(1)}
            </option>
          ))}
        </select>
        {saving && <Loader2 size={14} className="animate-spin text-white/40" />}
      </div>

    </div>
  )
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState("all")

  useEffect(() => {
    let cancelled = false
    const load = async () => {
      const res = await fetch("/api/admin/users")
      const data = await res.json()
      if (!cancelled) {
        setUsers(data.users || [])
        setLoading(false)
      }
    }
    load()
    return () => { cancelled = true }
  }, [])

  const handleRoleChange = (userId, newRole) => {
    setUsers(prev => prev.map(u => u._id === userId ? { ...u, role: newRole } : u))
  }

  const filtered = filter === "all"
    ? users
    : users.filter(u => u.role === filter)

  return (
    <div className="flex flex-col gap-6">

      <div>
        <h1 className="text-white font-semibold text-lg">Users</h1>
        <p className="text-white/40 text-sm">{users.length} total users</p>
      </div>

      {/* Filter */}
      <div className="flex items-center gap-2">
        {["all", "admin", "teacher", "student"].map(f => (
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
        ) : filtered.length === 0 ? (
          <div className="text-center py-8">
            <Users size={32} className="text-white/20 mx-auto mb-2" />
            <p className="text-white/40 text-sm">No users found.</p>
          </div>
        ) : (
          filtered.map(user => (
            <UserRow key={user._id} user={user} onRoleChange={handleRoleChange} />
          ))
        )}
      </div>

    </div>
  )
}