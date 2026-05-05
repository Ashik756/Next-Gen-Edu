// src/models/Course.js
import mongoose from "mongoose";

const CourseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String },
  thumbnail: { type: String },
  price: { type: Number, default: 0 },
  isFree: { type: Boolean, default: false },
  category: { type: String },
  teacherId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  isPublished: { type: Boolean, default: false },
  isFeatured: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.models.Course || mongoose.model("Course", CourseSchema);