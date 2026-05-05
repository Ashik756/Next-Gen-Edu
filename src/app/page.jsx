// src/app/(public)/page.jsx
"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { BookOpen, ArrowRight, Star } from "lucide-react"

function FeaturedCourseCard({ course }) {
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
          <span className="text-[11px] px-2 py-0.5 rounded-full bg-white/5 text-white/40">{course.category}</span>
          {course.isFree && <span className="text-[11px] px-2 py-0.5 rounded-full bg-[#7aff2e]/15 text-[#7aff2e]">Free</span>}
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

export default function HomePage() {
  const [featuredCourses, setFeaturedCourses] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    const load = async () => {
      const res = await fetch("/api/courses?featured=true")
      const data = await res.json()
      if (!cancelled) {
        setFeaturedCourses(data.courses || [])
        setLoading(false)
      }
    }
    load()
    return () => { cancelled = true }
  }, [])

  return (
    <div className="min-h-screen bg-[#0E0E0E]">

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 pt-24 pb-16 text-center flex flex-col items-center gap-6">
        <div className="inline-flex items-center gap-2 bg-[#7aff2e]/10 border border-[#7aff2e]/20 text-[#7aff2e] text-xs px-4 py-1.5 rounded-full">
          <Star size={12} fill="currentColor" />
          Bangladesh`s Best LMS Platform
        </div>
        <h1 className="text-white text-4xl md:text-6xl font-bold leading-tight max-w-3xl">
          Learn from the{" "}
          <span className="text-[#7aff2e]">Best Teachers</span>{" "}
          in Bangladesh
        </h1>
        <p className="text-white/40 text-lg max-w-xl">
          Access hundreds of courses from expert teachers. Learn at your own pace, anytime, anywhere.
        </p>
        <div className="flex items-center gap-4 flex-wrap justify-center">
          <Link
            href="/courses"
            className="flex items-center gap-2 bg-[#7aff2e] text-black px-6 py-3 rounded-full font-semibold text-sm hover:bg-[#8fff3a] transition"
          >
            Browse Courses
            <ArrowRight size={16} />
          </Link>
          <Link
            href="/register"
            className="flex items-center gap-2 border border-white/20 text-white px-6 py-3 rounded-full text-sm hover:border-white/40 transition"
          >
            Get Started Free
          </Link>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-8 md:gap-16 mt-4">
          {[
            { value: "500+", label: "Students" },
            { value: "50+", label: "Courses" },
            { value: "20+", label: "Teachers" },
          ].map(stat => (
            <div key={stat.label} className="text-center">
              <p className="text-white text-2xl font-bold">{stat.value}</p>
              <p className="text-white/40 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Courses */}
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
        ) : featuredCourses.length === 0 ? (
          <div className="text-center py-16 bg-white/5 border border-white/8 rounded-xl">
            <BookOpen size={40} className="text-white/20 mx-auto mb-3" />
            <p className="text-white/40 text-sm">No featured courses yet.</p>
            <Link href="/courses" className="inline-flex items-center gap-2 mt-4 text-[#7aff2e] text-sm hover:underline">
              Browse all courses <ArrowRight size={14} />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {featuredCourses.map(course => (
              <FeaturedCourseCard key={course._id} course={course} />
            ))}
          </div>
        )}
      </section>

      {/* CTA — Teach with us */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="bg-[#7aff2e]/5 border border-[#7aff2e]/15 rounded-2xl p-10 text-center flex flex-col items-center gap-4">
          <h2 className="text-white text-2xl font-bold">Are you a Teacher?</h2>
          <p className="text-white/40 text-sm max-w-md">
            Share your knowledge with thousands of students. Apply to teach on our platform today.
          </p>
          <Link
            href="/teach"
            className="flex items-center gap-2 bg-[#7aff2e] text-black px-6 py-3 rounded-full font-semibold text-sm hover:bg-[#8fff3a] transition"
          >
            Start Teaching
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

    </div>
  )
}