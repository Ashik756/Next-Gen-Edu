// src/app/api/courses/id/[courseId]/route.js
import { connectDB } from "@/lib/db";
import Course from "@/models/Course";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    const { courseId } = await params;

    await connectDB();

    const course = await Course.findById(courseId)
      .populate("teacherId", "name image");

    if (!course || !course.isPublished) {
      return NextResponse.json({ error: "Course not found." }, { status: 404 });
    }

    return NextResponse.json({ course });

  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}