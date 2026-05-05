// src/app/api/teacher/classes/route.js
import { connectDB } from "@/lib/db";
import Class from "@/models/Class";
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
    const chapterId = searchParams.get("chapterId");

    await connectDB();

    const classes = await Class.find({ chapterId }).sort({ order: 1 });
    return NextResponse.json({ classes });

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

    const { title, youtubeUrl, pdfUrl, isFreePreview, chapterId, subjectId, courseId } = await req.json();
    if (!title || !chapterId) {
      return NextResponse.json({ error: "Title and chapterId required." }, { status: 400 });
    }

    await connectDB();

    const count = await Class.countDocuments({ chapterId });
    const cls = await Class.create({
      title, youtubeUrl, pdfUrl, isFreePreview,
      chapterId, subjectId, courseId, order: count,
    });

    return NextResponse.json({ class: cls }, { status: 201 });

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
    await Class.findByIdAndDelete(id);

    return NextResponse.json({ message: "Deleted." });

  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}