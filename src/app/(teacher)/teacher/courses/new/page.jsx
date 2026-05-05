// src/app/(teacher)/teacher/courses/new/page.jsx
"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

const CATEGORIES = ["SSC", "HSC", "Admission", "Skills", "Language", "Other"]

export default function NewCoursePage() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [form, setForm] = useState({
        title: "",
        description: "",
        thumbnail: "",
        category: "",
        price: "",
        isFree: false,
    })

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

        setLoading(true)
        try {
            const res = await fetch("/api/teacher/courses", {
                method: "POST",
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

            // Course create হলে curriculum page এ নিয়ে যাও
            router.push(`/teacher/courses/${data.course._id}/curriculum`)

        } catch (err) {
            setError("Something went wrong.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="max-w-2xl mx-auto flex flex-col gap-6">

            {/* Header */}
            <div className="flex items-center gap-3">
                <Link href="/teacher/courses" className="text-white/40 hover:text-white transition">
                    <ArrowLeft size={20} />
                </Link>
                <div>
                    <h1 className="text-white font-semibold text-lg">Create New Course</h1>
                    <p className="text-white/40 text-sm">Fill in the basic info to get started</p>
                </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                {error && (
                    <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-4 py-3 rounded-lg">
                        {error}
                    </div>
                )}

                {/* Title */}
                <div className="flex flex-col gap-1.5">
                    <label className="text-sm text-white/70 font-medium">Course Title *</label>
                    <input
                        name="title"
                        value={form.title}
                        onChange={handleChange}
                        placeholder="e.g. HSC Physics Complete Course"
                        className="bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm outline-none focus:border-[#7aff2e]/50 transition placeholder:text-white/20"
                    />
                </div>

                {/* Description */}
                <div className="flex flex-col gap-1.5">
                    <label className="text-sm text-white/70 font-medium">Description</label>
                    <textarea
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        placeholder="What will students learn in this course?"
                        rows={4}
                        className="bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm outline-none focus:border-[#7aff2e]/50 transition placeholder:text-white/20 resize-none"
                    />
                </div>

                {/* Thumbnail */}
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

                {/* Category */}
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

                {/* Free/Paid toggle */}
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

                {/* Price */}
                {!form.isFree && (
                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm text-white/70 font-medium">Price (৳) *</label>
                        <input
                            name="price"
                            type="number"
                            value={form.price}
                            onChange={handleChange}
                            placeholder="e.g. 999"
                            min="0"
                            className="bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm outline-none focus:border-[#7aff2e]/50 transition placeholder:text-white/20"
                        />
                    </div>
                )}

                {/* Submit */}
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#7aff2e] hover:bg-[#8fff3a] disabled:opacity-50 text-black font-semibold py-2.5 rounded-lg text-sm transition mt-2 cursor-pointer"
                >
                    {loading ? "Creating..." : "Create Course & Add Curriculum →"}
                </button>

            </form>
        </div>
    )
}