// src/models/Module.js
import mongoose from "mongoose";

const ModuleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
  order: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.models.Module || mongoose.model("Module", ModuleSchema);