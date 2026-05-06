// src/app/(admin)/admin/loading.jsx
export default function Loading() {
  return (
    <div className="flex items-center gap-2 text-white/40 p-6">
      <div className="w-4 h-4 rounded-full border-2 border-white/20 border-t-white/60 animate-spin" />
      <span className="text-sm">Loading...</span>
    </div>
  )
}