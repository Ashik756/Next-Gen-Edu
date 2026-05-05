// src/models/Chapter.js
import mongoose from "mongoose";

const ChapterSchema = new mongoose.Schema({
    title: { type: String, required: true },
    subjectId: { type: mongoose.Schema.Types.ObjectId, ref: "Subject", required: true },
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
    order: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.models.Chapter || mongoose.model("Chapter", ChapterSchema);