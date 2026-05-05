import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  // Login না থাকলে protected route এ ঢুকতে দেবে না
  if (!token) {
    if (
      pathname.startsWith("/admin") ||
      pathname.startsWith("/teacher") ||
      pathname.startsWith("/student")
    ) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  // Login থাকলে role check
  if (token) {
    const role = token.role;

    // ভুল role এ ঢুকতে চাইলে নিজের dashboard এ পাঠাবে
    if (pathname.startsWith("/admin") && role !== "admin") {
      return NextResponse.redirect(new URL(`/${role}`, req.url));
    }

    if (pathname.startsWith("/teacher") && role !== "teacher") {
      return NextResponse.redirect(new URL(`/${role}`, req.url));
    }

    if (pathname.startsWith("/student") && role !== "student") {
      return NextResponse.redirect(new URL(`/${role}`, req.url));
    }

    // Already logged in হলে login/register page এ যেতে দেবে না
    if (pathname.startsWith("/login") || pathname.startsWith("/register")) {
      return NextResponse.redirect(new URL(`/${role}`, req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/teacher/:path*",
    "/student/:path*",
    "/login",
    "/register",
  ],
};