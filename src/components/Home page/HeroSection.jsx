// src/components/home/HeroSection.jsx
import Link from "next/link"
import { ArrowRight, Star } from "lucide-react"

export default function HeroSection() {
  return (
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
  )
}