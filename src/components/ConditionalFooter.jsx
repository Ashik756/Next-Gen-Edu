// src/components/ConditionalFooter.jsx
"use client"

import { usePathname } from "next/navigation"
import Footer from "./Footer"

const DASHBOARD_ROUTES = ["/admin", "/teacher", "/student","/teach"]

export default function ConditionalFooter() {
  const pathname = usePathname()
  const isDashboard = DASHBOARD_ROUTES.some(route => pathname.startsWith(route))
  if (isDashboard) return null
  return <Footer />
}