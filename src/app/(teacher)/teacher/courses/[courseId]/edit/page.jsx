// src/app/(teacher)/teacher/courses/[courseId]/edit/page.jsx
"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, Loader2 } from "lucide-react"
import Link from "next/link"

const CATEGORIES = ["SSC", "HSC", "Admission", "Skills", "Language", "Other"]

export default function EditCoursePage() {
  const { courseId } = useParams()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")
  const [form, setForm] = useState(null)

  useEffect(() => {
    const load = async () => {
      const res = await fetch(`/api/teacher/courses/${courseId}`)
      const data = await res.json()
      if (data.course) {
        setForm({
          title: data.course.title || "",
          description: data.course.description || "",
          thumbnail: data.course.thumbnail || "",
          category: data.course.category || "",
          price: data.course.price || "",
          isFree: data.course.isFree || false,
          isPublished: data.course.isPublished || false,
        })
      }
      setLoading(false)
    }
    load()
  }, [courseId])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }))
    setError("")
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    if (!form.title) return setError("Title is required.")
    if (!form.category) return setError("Category is required.")
    if (!form.isFree && !form.price) return setError("Price is required for paid courses.")

    setSaving(true)
    try {
      const res = await fetch(`/api/teacher/courses/${courseId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          price: form.isFree ? 0 : Number(form.price),
        }),
      })

      const data = await res.json()
      if (!res.ok) {
        setError(data.error || "Something went wrong.")
        return
      }

      router.push("/teacher/courses")

    } catch (err) {
      setError("Something went wrong.")
    } finally {
      setSaving(false)
    }
  }

  if (loading || !form) {
    return (
      <div className="flex items-center gap-2 text-white/40">
        <Loader2 size={16} className="animate-spin" />
        <span className="text-sm">Loading...</span>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto flex flex-col gap-6">

      <div className="flex items-center gap-3">
        <Link href="/teacher/courses" className="text-white/40 hover:text-white transition">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-white font-semibold text-lg">Edit Course</h1>
          <p className="text-white/40 text-sm">Update your course info</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        <div className="flex flex-col gap-1.5">
          <label className="text-sm text-white/70 font-medium">Course Title *</label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            className="bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm outline-none focus:border-[#7aff2e]/50 transition"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm text-white/70 font-medium">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={4}
            className="bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm outline-none focus:border-[#7aff2e]/50 transition resize-none"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm text-white/70 font-medium">Thumbnail URL</label>
          <input
            name="thumbnail"
            value={form.thumbnail}
            onChange={handleChange}
            placeholder="https://..."
            className="bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm outline-none focus:border-[#7aff2e]/50 transition placeholder:text-white/20"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm text-white/70 font-medium">Category *</label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm outline-none focus:border-[#7aff2e]/50 transition"
          >
            <option value="" className="bg-[#0E0E0E]">Select category</option>
            {CATEGORIES.map(cat => (
              <option key={cat} value={cat} className="bg-[#0E0E0E]">{cat}</option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-lg px-4 py-3">
          <input
            type="checkbox"
            id="isFree"
            name="isFree"
            checked={form.isFree}
            onChange={handleChange}
            className="w-4 h-4 accent-[#7aff2e]"
          />
          <label htmlFor="isFree" className="text-sm text-white/70 cursor-pointer">
            This is a free course
          </label>
        </div>

        {!form.isFree && (
          <div className="flex flex-col gap-1.5">
            <label className="text-sm text-white/70 font-medium">Price (৳) *</label>
            <input
              name="price"
              type="number"
              value={form.price}
              onChange={handleChange}
              min="0"
              className="bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm outline-none focus:border-[#7aff2e]/50 transition"
            />
          </div>
        )}

        <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-lg px-4 py-3">
          <input
            type="checkbox"
            id="isPublished"
            name="isPublished"
            checked={form.isPublished}
            onChange={handleChange}
            className="w-4 h-4 accent-[#7aff2e]"
          />
          <label htmlFor="isPublished" className="text-sm text-white/70 cursor-pointer">
            Publish this course (visible to students)
          </label>
        </div>

        <div className="flex gap-3 mt-2">
          <button
            type="submit"
            disabled={saving}
            className="flex-1 bg-[#7aff2e] hover:bg-[#8fff3a] disabled:opacity-50 text-black font-semibold py-2.5 rounded-lg text-sm transition cursor-pointer"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
          <Link
            href={`/teacher/courses/${courseId}/curriculum`}
            className="flex-1 text-center bg-white/5 hover:bg-white/10 text-white py-2.5 rounded-lg text-sm transition"
          >
            Go to Curriculum
          </Link>
        </div>

      </form>
    </div>
  )
}