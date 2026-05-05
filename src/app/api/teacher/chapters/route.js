// src/app/api/teacher/chapters/route.js
import { connectDB } from "@/lib/db";
import Chapter from "@/models/Chapter";
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
    const subjectId = searchParams.get("subjectId");

    await connectDB();

    const chapters = await Chapter.find({ subjectId }).sort({ order: 1 });
    return NextResponse.json({ chapters });

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

    const { title, subjectId, courseId } = await req.json();
    if (!title || !subjectId) {
      return NextResponse.json({ error: "Title and subjectId required." }, { status: 400 });
    }

    await connectDB();

    const count = await Chapter.countDocuments({ subjectId });
    const chapter = await Chapter.create({ title, subjectId, courseId, order: count });

    return NextResponse.json({ chapter }, { status: 201 });

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
    await Chapter.findByIdAndDelete(id);

    return NextResponse.json({ message: "Deleted." });

  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}