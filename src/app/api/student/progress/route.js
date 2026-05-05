// src/app/api/student/progress/route.js
import { connectDB } from "@/lib/db";
import Enrollment from "@/models/Enrollment";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/auth";
import { NextResponse } from "next/server";

export async function PATCH(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { enrollmentId, classId } = await req.json();

    await connectDB();

    const enrollment = await Enrollment.findOne({
      _id: enrollmentId,
      studentId: session.user.id,
    });

    if (!enrollment) {
      return NextResponse.json({ error: "Enrollment not found." }, { status: 404 });
    }

    // Already completed check
    if (!enrollment.completedLessons.includes(classId)) {
      enrollment.completedLessons.push(classId);
      await enrollment.save();
    }

    return NextResponse.json({ completedLessons: enrollment.completedLessons });

  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}