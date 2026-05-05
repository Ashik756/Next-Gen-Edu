"use client"

import { useSession } from "next-auth/react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { signOut } from "next-auth/react"
import {
  Sidebar, SidebarContent, SidebarFooter,
  SidebarHeader, SidebarMenu, SidebarMenuItem,
  SidebarMenuButton, SidebarRail,
} from "@/components/ui/sidebar"
import { LogOutIcon } from "lucide-react"
import { adminSidebarData, teacherSidebarData, studentSidebarData } from "./sidebar-config"
import Logo from "./Logo"

const SIDEBAR_DATA = {
  admin: adminSidebarData,
  teacher: teacherSidebarData,
  student: studentSidebarData,
}

function isLinkActive(pathname, url) {
  if (url === "/admin" || url === "/teacher" || url === "/student") {
    return pathname === url
  }
  return pathname.startsWith(url)
}

export default function DashboardSidebar() {
  const { data: session, status } = useSession()
  const pathname = usePathname()
  const user = session?.user
  const role = user?.role || "student"

  if (status === "loading") {
    return (
      <Sidebar collapsible="icon" className="bg-[#0E0E0E] border-r border-white/8">
        <SidebarHeader className="p-4">
          <Logo />
        </SidebarHeader>
      </Sidebar>
    )
  }

  const { navMain } = SIDEBAR_DATA[role] || SIDEBAR_DATA["student"]

  return (
    <Sidebar collapsible="icon">

      <SidebarHeader className="p-4">
        <Logo />
      </SidebarHeader>

      <SidebarContent className="p-2">
        <SidebarMenu>
          {navMain.map((item) => {
            const isActive = isLinkActive(pathname, item.url)
            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  asChild
                  isActive={isActive}
                  tooltip={item.title}
                >
                  <Link
                    href={item.url}
                    className={`flex items-center gap-2 transition ${
                      isActive
                        ? "text-[#7aff2e] font-medium"
                        : "text-white/60 hover:text-white"
                    }`}
                  >
                    <span className={isActive ? "text-[#7aff2e]" : "text-white/40"}>
                      {item.icon}
                    </span>
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )
          })}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-white/8">
        <div className="flex items-center gap-3 mb-3">
          {user?.image
            ? <Image src={user.image} alt={user.name} width={32} height={32} className="rounded-full" />
            : <div className="w-8 h-8 rounded-full bg-[#7aff2e] flex items-center justify-center text-black font-bold text-sm">
                {user?.name?.charAt(0).toUpperCase()}
              </div>
          }
          <div className="flex flex-col group-data-[collapsible=icon]:hidden">
            <span className="text-sm font-medium text-white">{user?.name}</span>
            <span className="text-xs text-white/40">{user?.email}</span>
          </div>
        </div>
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="flex items-center gap-2 text-sm text-white/50 hover:text-white transition w-full group-data-[collapsible=icon]:justify-center cursor-pointer"
        >
          <LogOutIcon size={16} />
          <span className="group-data-[collapsible=icon]:hidden">Logout</span>
        </button>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}