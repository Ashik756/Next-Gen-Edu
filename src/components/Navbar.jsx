"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Logo from "./Logo";

const NAV_LINKS = [
  { name: "Home", path: "/" },
  { name: "All Courses", path: "#" },
  { name: "Next Gen Store", path: "#" },
  { name: "Contact Us", path: "#" },
];

const ROLE_DASHBOARD = {
  admin: "/admin",
  teacher: "/teacher",
  student: "/student",
};

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { data: session } = useSession();

  const user = session?.user;
  const dashboardPath = ROLE_DASHBOARD[user?.role] || "/student";

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <nav className="w-full fixed top-0 left-0 z-50 bg-[#0E0E0E]/80 backdrop-blur-md border-b border-white/8 shadow-lg shadow-[#7aff2e]/5">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        <Logo />

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(({ name, path }) => (
            <Link key={name} href={path} className="relative group text-sm">
              <span className={`transition ${pathname === path ? "text-[#7aff2e]" : "text-white/50 group-hover:text-white"}`}>
                {name}
              </span>
              <span className={`absolute left-0 -bottom-1 h-px bg-[#7aff2e] transition-all duration-300 ${pathname === path ? "w-full" : "w-0 group-hover:w-full"}`} />
            </Link>
          ))}
        </div>

        {/* Desktop auth */}
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <Link href={dashboardPath} className="flex items-center gap-2 bg-linear-65 from-[#C2FF97] to-[#7BFD00] text-black px-4 py-1.5 rounded-full text-sm font-semibold">
              {user.image
                ? <Image src={user.image} alt={user.name} width={30} height={30} className="rounded-full" />
                : <div className="bg-linear-65 from-[#C2FF97] to-[#7BFD00] text-black px-4 py-2 rounded-full text-lg font-semibold">{user.name?.charAt(0).toUpperCase()}</div>
              }
              Dashboard
            </Link>
          ) : (
            <>
              <Link href="/login" className="text-white/50 hover:text-white text-sm border border-white/20 px-4 py-2 rounded-full transition">
                Login
              </Link>
              <Link href="/register" className="bg-linear-65 from-[#C2FF97] to-[#7BFD00] text-black px-4 py-2 rounded-full text-sm font-semibold">
                Get Started
              </Link>
            </>
          )}
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden text-[#7aff2e] p-2" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
        <div className="px-6 pt-2 pb-6 flex flex-col gap-4 border-t border-white/8">
          {NAV_LINKS.map(({ name, path }) => (
            <Link key={name} href={path} onClick={() => setIsOpen(false)}
              className={`text-sm ${pathname === path ? "text-[#7aff2e]" : "text-white/50"}`}>
              {name}
            </Link>
          ))}
          <div className="flex flex-col gap-3 pt-4 border-t border-white/8">
            {user ? (
              <Link href={dashboardPath} onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-2 bg-linear-65 from-[#C2FF97] to-[#7BFD00] text-black py-2 rounded-full text-sm font-semibold">
                {user.image
                  ? <Image src={user.image} alt={user.name} width={20} height={20} className="rounded-full" />
                  : <div className="w-5 h-5 rounded-full bg-black flex items-center justify-center text-[10px] font-bold">{user.name?.charAt(0).toUpperCase()}</div>
                }
                Dashboard
              </Link>
            ) : (
              <>
                <Link href="/login" onClick={() => setIsOpen(false)}
                  className="w-full text-white/70 border border-white/20 py-2 rounded-full text-sm font-semibold text-center">
                  Login
                </Link>
                <Link href="/register" onClick={() => setIsOpen(false)}
                  className="w-full bg-linear-65 from-[#C2FF97] to-[#7BFD00] text-black py-2 rounded-full text-sm font-semibold text-center">
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}