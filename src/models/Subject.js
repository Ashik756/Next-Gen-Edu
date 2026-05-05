// src/models/Subject.js
import mongoose from "mongoose";

const SubjectSchema = new mongoose.Schema({
    title: { type: String, required: true },
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
    order: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.models.Subject || mongoose.model("Subject", SubjectSchema);