// src/app/api/courses/[slug]/route.js
import { connectDB } from "@/lib/db";
import Course from "@/models/Course";
import Subject from "@/models/Subject";
import Chapter from "@/models/Chapter";
import Class from "@/models/Class";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    // ✅ await করো
    const { slug } = await params;

    await connectDB();

    const course = await Course.findOne({
      slug,
      isPublished: true,
    }).populate("teacherId", "name image email");

    if (!course) {
      return NextResponse.json({ error: "Course not found." }, { status: 404 });
    }

    const subjects = await Subject.find({ courseId: course._id }).sort({ order: 1 });

    const subjectsWithChapters = await Promise.all(
      subjects.map(async (subject) => {
        const chapters = await Chapter.find({ subjectId: subject._id }).sort({ order: 1 });

        const chaptersWithClasses = await Promise.all(
          chapters.map(async (chapter) => {
            const classes = await Class.find({ chapterId: chapter._id }).sort({ order: 1 });
            return { ...chapter.toObject(), classes }
          })
        );

        return { ...subject.toObject(), chapters: chaptersWithClasses }
      })
    );

    return NextResponse.json({
      course,
      curriculum: subjectsWithChapters,
    });

  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}