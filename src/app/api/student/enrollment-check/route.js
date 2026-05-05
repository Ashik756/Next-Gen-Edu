// src/app/api/student/enrollment-check/route.js
import { connectDB } from "@/lib/db";
import Enrollment from "@/models/Enrollment";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ enrollment: null });
    }

    const { searchParams } = new URL(req.url);
    const courseId = searchParams.get("courseId");

    await connectDB();

    const enrollment = await Enrollment.findOne({
      studentId: session.user.id,
      courseId,
    });

    return NextResponse.json({ enrollment });

  } catch (err) {
    console.error(err);
    return NextResponse.json({ enrollment: null });
  }
}