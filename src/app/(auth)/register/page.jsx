// app/(auth)/register/page.js
"use client"

import Link from "next/link"
import { useState } from "react"
import { FcGoogle } from "react-icons/fc"
import { Eye, EyeOff } from "lucide-react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const [form, setForm] = useState({
    name: "", email: "", password: "", confirm: ""
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setError("")
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    if (!form.name || !form.email || !form.password || !form.confirm) {
      return setError("All fields are required.")
    }
    if (form.password !== form.confirm) {
      return setError("Passwords do not match.")
    }
    if (form.password.length < 6) {
      return setError("Password must be at least 6 characters.")
    }

    setLoading(true)
    try {
      // Step 1 — Register
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password,
        }),
      })

      const data = await res.json()
      if (!res.ok) {
        setError(data.error || "Something went wrong.")
        return
      }

      // Step 2 — Auto login
      const result = await signIn("credentials", {
        email: form.email,
        password: form.password,
        redirect: false,
      })

      if (result?.error) {
        // Login fail হলে manually login page এ পাঠাও
        router.push("/login")
        return
      }

      // Step 3 — Session থেকে role নিয়ে redirect
      const sessionRes = await fetch("/api/auth/session")
      const session = await sessionRes.json()
      const role = session?.user?.role || "student"

      const redirectMap = {
        admin: "/admin",
        teacher: "/teacher",
        student: "/student",
      }

      router.push(redirectMap[role] || "/student")

    } catch (err) {
      setError("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleGoogle = () => {
    signIn("google", { callbackUrl: "/api/auth/role-redirect" })
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0E0E0E] px-4">
      <div className="w-full max-w-sm rounded-2xl bg-[#161616] border border-white/8 p-8 flex flex-col gap-6">

        <div className="text-center">
          <h1 className="text-3xl font-bold text-white">Create Account</h1>
          <p className="text-white/40 text-sm mt-1">Start your learning journey.</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          {/* Error */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-xs px-4 py-2.5 rounded-lg">
              {error}
            </div>
          )}

          {/* Name */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm text-white/80 font-medium">Your Name</label>
            <input
              name="name"
              type="text"
              placeholder="John Doe"
              value={form.name}
              onChange={handleChange}
              className="w-full bg-transparent border border-white/15 rounded-lg px-4 py-2.5 text-white text-sm outline-none focus:border-[#7aff2e]/60 transition placeholder:text-white/20"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm text-white/80 font-medium">Email</label>
            <input
              name="email"
              type="email"
              placeholder="example@gmail.com"
              value={form.email}
              onChange={handleChange}
              className="w-full bg-transparent border border-white/15 rounded-lg px-4 py-2.5 text-white text-sm outline-none focus:border-[#7aff2e]/60 transition placeholder:text-white/20"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm text-white/80 font-medium">Password</label>
            <div className="relative">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                className="w-full bg-transparent border border-white/15 rounded-lg px-4 py-2.5 pr-11 text-white text-sm outline-none focus:border-[#7aff2e]/60 transition placeholder:text-white/20"
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition cursor-pointer">
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm text-white/80 font-medium">Confirm Password</label>
            <div className="relative">
              <input
                name="confirm"
                type={showConfirm ? "text" : "password"}
                placeholder="••••••••"
                value={form.confirm}
                onChange={handleChange}
                className="w-full bg-transparent border border-white/15 rounded-lg px-4 py-2.5 pr-11 text-white text-sm outline-none focus:border-[#7aff2e]/60 transition placeholder:text-white/20"
              />
              <button type="button" onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition cursor-pointer">
                {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#7aff2e] hover:bg-[#8fff3a] disabled:opacity-50 text-black font-semibold py-2.5 rounded-lg text-sm transition mt-1 cursor-pointer"
          >
            {loading ? "Creating account..." : "Create Account"}
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-white/30 text-xs">Or continue with</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          {/* Google */}
          <button type="button" onClick={handleGoogle}
            className="w-full flex items-center justify-center gap-2 border border-white/15 hover:border-white/30 text-white py-2.5 rounded-lg text-sm font-medium transition cursor-pointer">
            <FcGoogle size={18} />
            Sign up with Google
          </button>

          <p className="text-center text-xs text-white/40">
            Already have an account?{" "}
            <Link href="/login" className="text-white/70 hover:text-white underline transition">Login</Link>
          </p>
        </form>
      </div>
    </div>
  )
}