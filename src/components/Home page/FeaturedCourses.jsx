// src/components/home/FeaturedCourses.jsx
"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { BookOpen, ArrowRight, Star } from "lucide-react"

function CourseCard({ course }) {
  return (
    <Link
      href={`/courses/${course.slug}`}
      className="bg-white/5 border border-white/8 rounded-xl overflow-hidden hover:border-white/20 transition group"
    >
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
          <Star size={11} className="text-yellow-400 ml-auto" fill="currentColor" />
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

export default function FeaturedCourses() {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    const load = async () => {
      const res = await fetch("/api/courses?featured=true")
      const data = await res.json()
      if (!cancelled) {
        setCourses(data.courses || [])
        setLoading(false)
      }
    }
    load()
    return () => { cancelled = true }
  }, [])

  return (
    <section className="max-w-7xl mx-auto px-6 pb-20">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-white text-2xl font-bold">Featured Courses</h2>
          <p className="text-white/40 text-sm mt-1">Handpicked by our team</p>
        </div>
        <Link
          href="/courses"
          className="flex items-center gap-1.5 text-sm text-white/50 hover:text-white transition"
        >
          View all
          <ArrowRight size={14} />
        </Link>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white/5 border border-white/8 rounded-xl overflow-hidden animate-pulse">
              <div className="aspect-video bg-white/5" />
              <div className="p-4 flex flex-col gap-2">
                <div className="h-3 bg-white/5 rounded w-1/3" />
                <div className="h-4 bg-white/5 rounded w-3/4" />
                <div className="h-3 bg-white/5 rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>
      ) : courses.length === 0 ? (
        <div className="text-center py-16 bg-white/5 border border-white/8 rounded-xl">
          <BookOpen size={40} className="text-white/20 mx-auto mb-3" />
          <p className="text-white/40 text-sm">No featured courses yet.</p>
          <Link
            href="/courses"
            className="inline-flex items-center gap-2 mt-4 text-[#7aff2e] text-sm hover:underline"
          >
            Browse all courses <ArrowRight size={14} />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {courses.map(course => (
            <CourseCard key={course._id} course={course} />
          ))}
        </div>
      )}
    </section>
  )
}