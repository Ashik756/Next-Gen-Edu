// src/app/(student)/student/profile/page.jsx
"use client"

import { useSession } from "next-auth/react"
import { useState } from "react"
import { Loader2, Save } from "lucide-react"
import Image from "next/image"

export default function ProfilePage() {
  const { data: session, update } = useSession()
  const user = session?.user
  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState(false)
  const [form, setForm] = useState({
    name: user?.name || "",
    image: user?.image || "",
  })

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
    setSuccess(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      const res = await fetch("/api/student/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        await update({ name: form.name, image: form.image })
        setSuccess(true)
      }
    } catch (err) {
      console.error(err)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="max-w-lg flex flex-col gap-6">
      <div>
        <h1 className="text-white font-semibold text-lg">Profile</h1>
        <p className="text-white/40 text-sm">Update your personal info</p>
      </div>

      {/* Avatar preview */}
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-[#7aff2e] flex items-center justify-center text-black font-bold text-xl overflow-hidden">
          {form.image
            ? <Image src={form.image} alt={form.name} width={64} height={64} className="object-cover" />
            : form.name?.charAt(0).toUpperCase()
          }
        </div>
        <div>
          <p className="text-white font-medium">{form.name || user?.name}</p>
          <p className="text-white/40 text-sm">{user?.email}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">

        {success && (
          <div className="bg-[#7aff2e]/10 border border-[#7aff2e]/20 text-[#7aff2e] text-sm px-4 py-3 rounded-lg">
            Profile updated successfully!
          </div>
        )}

        <div className="flex flex-col gap-1.5">
          <label className="text-sm text-white/70 font-medium">Full Name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className="bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm outline-none focus:border-[#7aff2e]/50 transition"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm text-white/70 font-medium">Avatar URL</label>
          <input
            name="image"
            value={form.image}
            onChange={handleChange}
            placeholder="https://..."
            className="bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm outline-none focus:border-[#7aff2e]/50 transition placeholder:text-white/20"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm text-white/70 font-medium">Email</label>
          <input
            value={user?.email || ""}
            disabled
            className="bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white/40 text-sm outline-none cursor-not-allowed"
          />
          <p className="text-white/20 text-xs">Email cannot be changed.</p>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="flex items-center justify-center gap-2 bg-[#7aff2e] hover:bg-[#8fff3a] disabled:opacity-50 text-black font-semibold py-2.5 rounded-lg text-sm transition cursor-pointer"
        >
          {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
          {saving ? "Saving..." : "Save Changes"}
        </button>

      </form>
    </div>
  )
}