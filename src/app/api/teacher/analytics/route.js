import { connectDB } from "@/lib/db";
import Course from "@/models/Course";
import Enrollment from "@/models/Enrollment";
import Subscription from "@/models/Subscription";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/auth";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "teacher") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const teacherId = new mongoose.Types.ObjectId(session.user.id);

    const courses = await Course.find({ teacherId }).select("_id");
    const courseIds = courses.map(c => c._id);

    const [totalCourses, totalStudents, subscription] = await Promise.all([
      Course.countDocuments({ teacherId }),
      Enrollment.countDocuments({ courseId: { $in: courseIds } }),
      Subscription.findOne({ teacherId, status: "active" }).sort({ createdAt: -1 }),
    ])

    return NextResponse.json({ totalCourses, totalStudents, subscription });

  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}