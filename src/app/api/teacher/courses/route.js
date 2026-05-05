// src/app/api/teacher/courses/route.js
import { connectDB } from "@/lib/db";
import Course from "@/models/Course";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const session = await getServerSession(authOptions);
        if (!session || session.user.role !== "teacher") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        await connectDB();

        const courses = await Course.find({ teacherId: session.user.id })
            .sort({ createdAt: -1 })

        return NextResponse.json({ courses });
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

        const { title, description, thumbnail, category, price, isFree } = await req.json();

        if (!title) {
            return NextResponse.json({ error: "Title is required." }, { status: 400 });
        }

        await connectDB();

        // Slug বানাও
        const slug = title.toLowerCase()
            .replace(/[^a-z0-9\s]/g, "")
            .replace(/\s+/g, "-")
            + "-" + Date.now()

        const course = await Course.create({
            title,
            slug,
            description,
            thumbnail,
            category,
            price: isFree ? 0 : price,
            isFree,
            teacherId: session.user.id,
        })

        return NextResponse.json({ course }, { status: 201 });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
    }
}