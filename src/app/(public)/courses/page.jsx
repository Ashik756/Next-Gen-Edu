// src/app/(public)/courses/page.jsx
"use client"

import { useEffect, useState } from "react"
import { Search, BookOpen, Loader2 } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const CATEGORIES = ["All", "SSC", "HSC", "Admission", "Skills", "Language", "Other"]

function CourseCard({ course }) {
  return (
    <Link href={`/courses/${course.slug}`} className="bg-white/5 border border-white/8 rounded-xl overflow-hidden hover:border-white/20 transition group">
      <div className="aspect-video bg-white/5 overflow-hidden">
        {course.thumbnail
          ? <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
          : <div className="w-full h-full flex items-center justify-center">
              <BookOpen size={32} className="text-white/20" />
            </div>
        }
      </div>
      <div className="p-4 flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <span className="text-[11px] px-2 py-0.5 rounded-full bg-white/5 text-white/40">
            {course.category}
          </span>
          {course.isFree && (
            <span className="text-[11px] px-2 py-0.5 rounded-full bg-[#7aff2e]/15 text-[#7aff2e]">
              Free
            </span>
          )}
        </div>
        <h3 className="text-white font-medium text-sm leading-snug group-hover:text-[#7aff2e] transition">
          {course.title}
        </h3>
        <div className="flex items-center justify-between mt-1">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-[#7aff2e] flex items-center justify-center text-black text-[10px] font-bold overflow-hidden">
              {course.teacherId?.image
                ? <Image src={course.teacherId.image} alt={course.teacherId.name} width={20} height={20} className="object-cover" />
                : course.teacherId?.name?.charAt(0).toUpperCase()
              }
            </div>
            <span className="text-white/40 text-xs">{course.teacherId?.name}</span>
          </div>
          <span className="text-white font-semibold text-sm">
            {course.isFree ? "Free" : `৳${course.price}`}
          </span>
        </div>
      </div>
    </Link>
  )
}

export default function CoursesPage() {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("All")
  const [type, setType] = useState("all")

  useEffect(() => {
    let cancelled = false
    const load = async () => {
      setLoading(true)
      const params = new URLSearchParams()
      if (category !== "All") params.set("category", category)
      if (type !== "all") params.set("type", type)
      if (search) params.set("search", search)

      const res = await fetch(`/api/courses?${params.toString()}`)
      const data = await res.json()
      if (!cancelled) {
        setCourses(data.courses || [])
        setLoading(false)
      }
    }
    load()
    return () => { cancelled = true }
  }, [category, type, search])

  return (
    <div className="min-h-screen bg-[#0E0E0E] px-4 py-12">
      <div className="max-w-7xl mx-auto flex flex-col gap-8">

        {/* Header */}
        <div className="text-center flex flex-col gap-2">
          <h1 className="text-white text-3xl font-bold">All Courses</h1>
          <p className="text-white/40 text-sm">Find the perfect course for your learning journey</p>
        </div>

        {/* Filters */}
        <div className="flex flex-col gap-4">

          {/* Search */}
          <div className="relative max-w-md mx-auto w-full">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search courses..."
              className="w-full bg-white/5 border border-white/10 rounded-lg pl-9 pr-4 py-2.5 text-white text-sm outline-none focus:border-[#7aff2e]/50 transition placeholder:text-white/20"
            />
          </div>

          {/* Category tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`shrink-0 px-4 py-1.5 rounded-full text-sm transition ${
                  category === cat
                    ? "bg-[#7aff2e] text-black font-semibold"
                    : "bg-white/5 text-white/50 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Type filter */}
          <div className="flex items-center gap-2">
            {[
              { value: "all", label: "All" },
              { value: "free", label: "Free" },
              { value: "paid", label: "Paid" },
            ].map(t => (
              <button
                key={t.value}
                onClick={() => setType(t.value)}
                className={`px-4 py-1.5 rounded-full text-sm transition ${
                  type === t.value
                    ? "bg-white/15 text-white font-medium"
                    : "bg-white/5 text-white/40 hover:text-white"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Results */}
        {loading ? (
          <div className="flex items-center justify-center py-20 gap-2 text-white/40">
            <Loader2 size={20} className="animate-spin" />
            <span className="text-sm">Loading courses...</span>
          </div>
        ) : courses.length === 0 ? (
          <div className="text-center py-20">
            <BookOpen size={40} className="text-white/20 mx-auto mb-3" />
            <p className="text-white/40 text-sm">No courses found.</p>
          </div>
        ) : (
          <>
            <p className="text-white/30 text-sm">{courses.length} course{courses.length !== 1 ? "s" : ""} found</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {courses.map(course => (
                <CourseCard key={course._id} course={course} />
              ))}
            </div>
          </>
        )}

      </div>
    </div>
  )
}