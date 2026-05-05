// src/app/api/teacher/courses/[courseId]/subjects/[subjectId]/chapters/route.js
import { connectDB } from "@/lib/db";
import Chapter from "@/models/Chapter";
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

        const chapters = await Chapter.find({ subjectId: params.subjectId })
            .sort({ order: 1 })

        return NextResponse.json({ chapters });
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

        const { title } = await req.json();
        if (!title) {
            return NextResponse.json({ error: "Title is required." }, { status: 400 });
        }

        await connectDB();

        const count = await Chapter.countDocuments({ subjectId: params.subjectId })

        const chapter = await Chapter.create({
            title,
            subjectId: params.subjectId,
            courseId: params.courseId,
            order: count,
        })

        return NextResponse.json({ chapter }, { status: 201 });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
    }
}