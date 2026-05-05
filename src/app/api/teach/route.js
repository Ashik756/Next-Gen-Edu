// src/app/api/teach/route.js
import { connectDB } from "@/lib/db";
import TeacherApplication from "@/models/TeacherApplication";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { name, email, expertise, bio, socialLinks } = await req.json();

    if (!name || !email || !expertise) {
      return NextResponse.json({ error: "Name, email and expertise are required." }, { status: 400 });
    }

    if (!email.endsWith("@gmail.com")) {
      return NextResponse.json({ error: "Only Gmail addresses are allowed." }, { status: 400 });
    }

    await connectDB();

    // Already applied check
    const existing = await TeacherApplication.findOne({ email });
    if (existing) {
      return NextResponse.json({ error: "You have already applied." }, { status: 400 });
    }

    // User আছে কিনা check করো
    const user = await User.findOne({ email });

    const application = await TeacherApplication.create({
      userId: user?._id || null,
      name,
      email,
      expertise,
      bio,
      socialLinks,
    })

    return NextResponse.json({ message: "Application submitted successfully!" }, { status: 201 });

  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}