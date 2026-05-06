// src/app/(admin)/admin/error.jsx
"use client"

export default function Error({ error, reset }) {
  return (
    <div className="flex flex-col items-center justify-center p-12 gap-4">
      <p className="text-red-400 text-sm">Something went wrong.</p>
      <button
        onClick={reset}
        className="text-xs px-4 py-2 bg-white/5 text-white/60 rounded-lg hover:text-white transition"
      >
        Try again
      </button>
    </div>
  )
}