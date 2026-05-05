// src/components/DashboardLayout.jsx
"use client"

import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import DashboardSidebar from "./DashboardSidebar"

export default function DashboardLayout({ children, title }) {
    return (
        <SidebarProvider className="bg-[#0E0E0E]">
            <div className="flex min-h-screen w-full bg-[#0E0E0E] text-white">
                <DashboardSidebar />
                <SidebarInset className="flex flex-col flex-1 bg-[#0E0E0E]">
                    <header className="flex h-14 items-center gap-2 px-4 border-b border-white/8 bg-[#0E0E0E] sticky top-0 z-10">
                        <SidebarTrigger className="text-white/50 hover:text-white" />
                        <Separator orientation="vertical" className="h-4 bg-white/10" />
                        <span className="text-sm font-medium text-white/70">{title}</span>
                    </header>
                    <main className="flex-1 p-6 bg-[#0E0E0E]">
                        {children}
                    </main>
                </SidebarInset>
            </div>
        </SidebarProvider>
    )
}