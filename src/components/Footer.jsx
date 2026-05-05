// src/components/common/Footer.jsx
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="border-t border-white/8 bg-[#0E0E0E] py-8 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-white/30 text-sm">
          © 2025 Next Gen Edu. All rights reserved.
        </p>
        <div className="flex items-center gap-6">
          <Link href="/teach" className="text-white/40 hover:text-[#7aff2e] text-sm transition">
            Teach With Us
          </Link>
          <Link href="/courses" className="text-white/40 hover:text-white text-sm transition">
            Courses
          </Link>
          <Link href="/login" className="text-white/40 hover:text-white text-sm transition">
            Login
          </Link>
        </div>
      </div>
    </footer>
  )
}