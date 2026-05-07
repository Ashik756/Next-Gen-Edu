// src/components/ConditionalMain.jsx
"use client"

import { usePathname } from "next/navigation"

const DASHBOARD_ROUTES = ["/admin", "/teacher", "/student"]

export default function ConditionalMain({ children }) {
  const pathname = usePathname()
  const isDashboard = DASHBOARD_ROUTES.some(route => pathname.startsWith(route))

  return (
    <main className={`flex-1 ${isDashboard ? "" : "pt-16"}`}>
      {children}
    </main>
  )
}