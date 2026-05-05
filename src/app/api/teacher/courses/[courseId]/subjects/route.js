// src/app/api/teacher/courses/[courseId]/subjects/route.js
import { connectDB } from "@/lib/db";
import Subject from "@/models/Subject";
import Course from "@/models/Course";
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

        const subjects = await Subject.find({ courseId: params.courseId })
            .sort({ order: 1 })

        return NextResponse.json({ subjects });
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

        const count = await Subject.countDocuments({ courseId: params.courseId })

        const subject = await Subject.create({
            title,
            courseId: params.courseId,
            order: count,
        })

        return NextResponse.json({ subject }, { status: 201 });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
    }
}