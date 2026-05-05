// src/app/api/teacher/subjects/route.js
import { connectDB } from "@/lib/db";
import Subject from "@/models/Subject";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "teacher") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const courseId = searchParams.get("courseId");

    await connectDB();

    const subjects = await Subject.find({ courseId }).sort({ order: 1 });
    return NextResponse.json({ subjects });

  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "teacher") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { title, courseId } = await req.json();
    if (!title || !courseId) {
      return NextResponse.json({ error: "Title and courseId required." }, { status: 400 });
    }

    await connectDB();

    const count = await Subject.countDocuments({ courseId });
    const subject = await Subject.create({ title, courseId, order: count });

    return NextResponse.json({ subject }, { status: 201 });

  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "teacher") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    await connectDB();
    await Subject.findByIdAndDelete(id);

    return NextResponse.json({ message: "Deleted." });

  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}