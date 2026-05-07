// src/components/sidebar-config.js

import {
  LayoutDashboardIcon, UsersIcon, BookOpenIcon,
  ClipboardListIcon, Settings2Icon, BarChartIcon,
  GraduationCapIcon, PlusCircleIcon, PlayCircleIcon,
  CreditCardIcon, UserIcon,
} from "lucide-react"

export const adminSidebarData = {
  navMain: [
    {
      title: "Dashboard",
      url: "/admin",
      icon: <LayoutDashboardIcon />,
    },
    {
      title: "Users",
      url: "/admin/users",
      icon: <UsersIcon />,
    },
    {
      title: "Applications",
      url: "/admin/applications",
      icon: <ClipboardListIcon />,
    },
    {
      title: "Courses",
      url: "/admin/courses",
      icon: <BookOpenIcon />,
    },
    {
      title: "Analytics",
      url: "/admin/analytics",
      icon: <BarChartIcon />,
    },
    {
      title: "Plans",
      url: "/admin/plans",
      icon: <CreditCardIcon />,
    },
    {
      title: "Settings",
      url: "/admin/settings",
      icon: <Settings2Icon />,
    },
  ],
}

export const teacherSidebarData = {
  navMain: [
    {
      title: "Dashboard",
      url: "/teacher",
      icon: <LayoutDashboardIcon />,
    },
    {
      title: "My Courses",
      url: "/teacher/courses",
      icon: <BookOpenIcon />,
    },
    {
      title: "Create Course",
      url: "/teacher/courses/new",
      icon: <PlusCircleIcon />,
    },
    {
      title: "Students",
      url: "/teacher/students",
      icon: <UsersIcon />,
    },
    {
      title: "Analytics",
      url: "/teacher/analytics",
      icon: <BarChartIcon />,
    },
    {
      title: "Subscription",
      url: "/teacher/subscription",
      icon: <CreditCardIcon />,
    },
    {
      title: "Settings",
      url: "/teacher/settings",
      icon: <Settings2Icon />,
    },
  ],
}

export const studentSidebarData = {
  navMain: [
    {
      title: "Dashboard",
      url: "/student",
      icon: <LayoutDashboardIcon />,
    },
    {
      title: "My Courses",
      url: "/student/courses",
      icon: <PlayCircleIcon />,
    },
    {
      title: "Browse Courses",
      url: "/courses",
      icon: <GraduationCapIcon />,
    },
    {
      title: "Purchases",
      url: "/student/purchases",
      icon: <CreditCardIcon />,
    },
    {
      title: "Profile",
      url: "/student/profile",
      icon: <UserIcon />,
    },
  ],
}