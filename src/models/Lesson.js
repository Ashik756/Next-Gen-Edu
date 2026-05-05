// src/models/Lesson.js
import mongoose from "mongoose";

const LessonSchema = new mongoose.Schema({
  title: { type: String, required: true },
  youtubeUrl: { type: String },
  isFreePreview: { type: Boolean, default: false },
  moduleId: { type: mongoose.Schema.Types.ObjectId, ref: "Module", required: true },
  order: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.models.Lesson || mongoose.model("Lesson", LessonSchema);