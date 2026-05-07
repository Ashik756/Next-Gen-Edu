// src/models/TeacherApplication.js
import mongoose from "mongoose";

const TeacherApplicationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
  name: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  expertise: { type: String, required: true },
  bio: { type: String },
  socialLinks: { type: String },
  status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
}, { timestamps: true });

export default mongoose.models.TeacherApplication || mongoose.model("TeacherApplication", TeacherApplicationSchema);