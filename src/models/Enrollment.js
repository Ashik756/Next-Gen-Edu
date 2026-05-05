// src/models/Enrollment.js
import mongoose from "mongoose";

const EnrollmentSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
  completedLessons: [{ type: mongoose.Schema.Types.ObjectId, ref: "Lesson" }],
  enrolledAt: { type: Date, default: Date.now },
}, { timestamps: true });

export default mongoose.models.Enrollment || mongoose.model("Enrollment", EnrollmentSchema);