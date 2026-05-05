// src/app/api/student/analytics/route.js
import { connectDB } from "@/lib/db";
import Enrollment from "@/models/Enrollment";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const studentId = session.user.id;

    const [totalEnrolled, recentEnrollments] = await Promise.all([
      Enrollment.countDocuments({ studentId }),
      Enrollment.find({ studentId })
        .populate("courseId", "title thumbnail isFree price teacherId")
        .sort({ enrolledAt: -1 })
        .limit(5),
    ])

    return NextResponse.json({ totalEnrolled, recentEnrollments });

  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}