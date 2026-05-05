// src/app/api/teacher/courses/[courseId]/subjects/[subjectId]/chapters/[chapterId]/classes/route.js
import { connectDB } from "@/lib/db";
import Class from "@/models/Class";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || session.user.role !== "teacher") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        await connectDB();

        const classes = await Class.find({ chapterId: params.chapterId })
            .sort({ order: 1 })

        return NextResponse.json({ classes });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
    }
}

export async function POST(req, { params }) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || session.user.role !== "teacher") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { title, youtubeUrl, pdfUrl, isFreePreview } = await req.json();
        if (!title) {
            return NextResponse.json({ error: "Title is required." }, { status: 400 });
        }

        await connectDB();

        const count = await Class.countDocuments({ chapterId: params.chapterId })

        const cls = await Class.create({
            title,
            youtubeUrl,
            pdfUrl,
            isFreePreview,
            chapterId: params.chapterId,
            subjectId: params.subjectId,
            courseId: params.courseId,
            order: count,
        })

        return NextResponse.json({ class: cls }, { status: 201 });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
    }
}