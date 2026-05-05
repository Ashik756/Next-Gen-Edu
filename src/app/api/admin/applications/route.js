// src/app/api/admin/applications/route.js
import { connectDB } from "@/lib/db";
import TeacherApplication from "@/models/TeacherApplication";
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

    const applications = await TeacherApplication.find({ status: "pending" })
      .populate("userId", "name email image")
      .sort({ createdAt: -1 })
      .limit(10);

    return NextResponse.json({ applications });

  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}