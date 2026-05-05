// src/app/api/student/learn/[enrollmentId]/route.js
import { connectDB } from "@/lib/db";
import Enrollment from "@/models/Enrollment";
import Course from "@/models/Course";
import Subject from "@/models/Subject";
import Chapter from "@/models/Chapter";
import Class from "@/models/Class";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    const { enrollmentId } = await params;
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const enrollment = await Enrollment.findOne({
      _id: enrollmentId,
      studentId: session.user.id,
    });

    if (!enrollment) {
      return NextResponse.json({ error: "Enrollment not found." }, { status: 404 });
    }

    const course = await Course.findById(enrollment.courseId)
      .populate("teacherId", "name image");

    const subjects = await Subject.find({ courseId: course._id }).sort({ order: 1 });

    const curriculum = await Promise.all(
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

    return NextResponse.json({ enrollment, course, curriculum });

  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}