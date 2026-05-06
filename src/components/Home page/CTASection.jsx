// src/components/home/CTASection.jsx
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function CTASection() {
  return (
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
  )
}