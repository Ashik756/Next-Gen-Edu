// src/models/Class.js
import mongoose from "mongoose";

const ClassSchema = new mongoose.Schema({
    title: { type: String, required: true },
    youtubeUrl: { type: String },
    pdfUrl: { type: String },
    isFreePreview: { type: Boolean, default: false },
    chapterId: { type: mongoose.Schema.Types.ObjectId, ref: "Chapter", required: true },
    subjectId: { type: mongoose.Schema.Types.ObjectId, ref: "Subject", required: true },
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
    order: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.models.Class || mongoose.model("Class", ClassSchema);