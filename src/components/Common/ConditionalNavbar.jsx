"use client"

import { usePathname } from "next/navigation"
import Navbar from "./Navbar"

const DASHBOARD_ROUTES = ["/admin", "/teacher", "/student"]

export default function ConditionalNavbar() {
  const pathname = usePathname()

  const isDashboard = DASHBOARD_ROUTES.some(route => pathname.startsWith(route))

  if (isDashboard) return null

  return <Navbar />
}