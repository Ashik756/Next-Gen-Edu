// src/app/api/courses/route.js
import { connectDB } from "@/lib/db";
import Course from "@/models/Course";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const type = searchParams.get("type"); // "free" or "paid"
    const search = searchParams.get("search");// src/app/api/courses/route.js এ GET এ
    const featured = searchParams.get("featured");
    
    await connectDB();
    
    let query = { isPublished: true };
    
    if (featured === "true") query.isFeatured = true;
    if (category) query.category = category;
    if (type === "free") query.isFree = true;
    if (type === "paid") query.isFree = false;
    if (search) query.title = { $regex: search, $options: "i" };

    const courses = await Course.find(query)
      .populate("teacherId", "name image")
      .sort({ createdAt: -1 });

    return NextResponse.json({ courses });

  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}