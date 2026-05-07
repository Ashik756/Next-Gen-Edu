// src/app/(public)/teach/page.jsx
"use client"

import { useState } from "react"
import { useSession } from "next-auth/react"
import { CheckCircle } from "lucide-react"
import Link from "next/link"

export default function TeachPage() {
  const { data: session } = useSession()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")
  const [form, setForm] = useState({
    name: session?.user?.name || "",
    name: session?.user?.whatsApp || "",
    email: session?.user?.email || "",
    expertise: "",
    bio: "",
    socialLinks: "",
  })

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
    setError("")
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    if (!form.name || !form.whatsApp || !form.email || !form.expertise) {
      return setError("Name, email and expertise are required.")
    }

    setLoading(true)
    try {
      const res = await fetch("/api/teach", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || "Something went wrong.")
        return
      }

      setSuccess(true)

    } catch (err) {
      setError("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  // Success state
  if (success) {
    return (
      <div className="min-h-screen bg-[#0E0E0E] flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center flex flex-col items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-[#7aff2e]/15 flex items-center justify-center">
            <CheckCircle size={32} className="text-[#7aff2e]" />
          </div>
          <h1 className="text-white text-2xl font-bold">Application Submitted!</h1>
          <p className="text-white/40 text-sm">
            We ve received your application. Our team will review it and get back to you soon.
          </p>
          <Link
            href="/"
            className="mt-2 px-6 py-2.5 bg-[#7aff2e] text-black text-sm font-semibold rounded-lg hover:bg-[#8fff3a] transition"
          >
            Back to Home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0E0E0E] px-4 py-16">
      <div className="max-w-xl mx-auto flex flex-col gap-8">

        {/* Header */}
        <div className="text-center">
          <h1 className="text-white text-3xl font-bold">Teach with Us</h1>
          <p className="text-white/40 text-sm mt-2">
            Share your knowledge and help students achieve their goals.
          </p>
        </div>

        {/* Benefits */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { title: "Flexible", desc: "Teach on your own schedule" },
            { title: "Reach", desc: "Thousands of eager students" },
            { title: "Earn", desc: "Get paid for your expertise" },
          ].map(item => (
            <div key={item.title} className="bg-white/5 border border-white/8 rounded-xl p-4 text-center">
              <p className="text-white font-semibold text-sm">{item.title}</p>
              <p className="text-white/40 text-xs mt-1">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Form */}
        <div className="bg-white/5 border border-white/8 rounded-2xl p-6 flex flex-col gap-4">
          <h2 className="text-white font-semibold">Apply Now</h2>

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">

            {/* Name */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm text-white/70 font-medium">Full Name *</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="John Doe"
                className="bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm outline-none focus:border-[#7aff2e]/50 transition placeholder:text-white/20"
              />
            </div>

            {/* Whats'app */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm text-white/70 font-medium">Whats App *</label>
              <input
                name="whatsApp"
                value={form?.phone}
                onChange={handleChange}
                placeholder="+880 1826 XXXXXX"
                className="bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm outline-none focus:border-[#7aff2e]/50 transition placeholder:text-white/20"
              />
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm text-white/70 font-medium">Gmail Address *</label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="example@gmail.com"
                className="bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm outline-none focus:border-[#7aff2e]/50 transition placeholder:text-white/20"
              />
            </div>

            {/* Expertise */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm text-white/70 font-medium">Area of Expertise *</label>
              <input
                name="expertise"
                value={form.expertise}
                onChange={handleChange}
                placeholder="e.g. Physics, Mathematics, English"
                className="bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm outline-none focus:border-[#7aff2e]/50 transition placeholder:text-white/20"
              />
            </div>

            {/* Bio */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm text-white/70 font-medium">Bio</label>
              <textarea
                name="bio"
                value={form.bio}
                onChange={handleChange}
                placeholder="Tell us about your teaching experience..."
                rows={3}
                className="bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm outline-none focus:border-[#7aff2e]/50 transition placeholder:text-white/20 resize-none"
              />
            </div>

            {/* Social Links */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm text-white/70 font-medium">Social / Portfolio Link</label>
              <input
                name="socialLinks"
                value={form.socialLinks}
                onChange={handleChange}
                placeholder="https://linkedin.com/in/..."
                className="bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm outline-none focus:border-[#7aff2e]/50 transition placeholder:text-white/20"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#7aff2e] hover:bg-[#8fff3a] disabled:opacity-50 text-black font-semibold py-2.5 rounded-lg text-sm transition mt-1 cursor-pointer"
            >
              {loading ? "Submitting..." : "Submit Application"}
            </button>

          </form>
        </div>

      </div>
    </div>
  )
}