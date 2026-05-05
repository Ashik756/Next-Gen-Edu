// src/app/api/student/enroll/route.js
import { connectDB } from "@/lib/db";
import Enrollment from "@/models/Enrollment";
import Course from "@/models/Course";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { courseId } = await req.json();

    if (!courseId) {
      return NextResponse.json({ error: "courseId is required." }, { status: 400 });
    }

    await connectDB();

    // Course আছে কিনা check
    const course = await Course.findById(courseId);
    if (!course || !course.isPublished) {
      return NextResponse.json({ error: "Course not found." }, { status: 404 });
    }

    // Already enrolled check
    const existing = await Enrollment.findOne({
      studentId: session.user.id,
      courseId,
    });
    if (existing) {
      return NextResponse.json({ enrollmentId: existing._id, message: "Already enrolled." });
    }

    // Enroll করো
    const enrollment = await Enrollment.create({
      studentId: session.user.id,
      courseId,
    });

    return NextResponse.json({ enrollmentId: enrollment._id }, { status: 201 });

  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}