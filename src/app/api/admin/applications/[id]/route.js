// src/app/api/admin/applications/[id]/route.js
import { connectDB } from "@/lib/db";
import TeacherApplication from "@/models/TeacherApplication";
import User from "@/models/User";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/auth";
import { NextResponse } from "next/server";

export async function PATCH(req, { params }) {
  try {
    // ✅ await করো
    const { id } = await params;

    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { status } = await req.json();

    if (!["approved", "rejected"].includes(status)) {
      return NextResponse.json({ error: "Invalid status." }, { status: 400 });
    }

    await connectDB();

    const application = await TeacherApplication.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!application) {
      return NextResponse.json({ error: "Application not found." }, { status: 404 });
    }

    if (status === "approved") {
      await User.findOneAndUpdate(
        { email: application.email },
        { role: "teacher" }
      );
    }

    return NextResponse.json({ message: `Application ${status} successfully.` });

  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}