// src/app/api/admin/analytics/route.js
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import Course from "@/models/Course";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const [totalUsers, totalTeachers, totalStudents, totalCourses] = await Promise.all([
      User.countDocuments(),
      User.countDocuments({ role: "teacher" }),
      User.countDocuments({ role: "student" }),
      Course.countDocuments(),
    ]);

    return NextResponse.json({ totalUsers, totalTeachers, totalStudents, totalCourses });

  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}