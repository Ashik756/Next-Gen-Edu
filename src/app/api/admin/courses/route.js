// src/app/api/admin/courses/route.js
import { connectDB } from "@/lib/db";
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

    const courses = await Course.find()
      .populate("teacherId", "name email")
      .sort({ createdAt: -1 });

    return NextResponse.json({ courses });

  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}

export async function PATCH(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { courseId, isFeatured } = await req.json();

    await connectDB();

    const course = await Course.findByIdAndUpdate(
      courseId,
      { isFeatured },
      { new: true }
    );

    return NextResponse.json({ course });

  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}