// src/models/Subscription.js
import mongoose from "mongoose";

const SubscriptionSchema = new mongoose.Schema({
  teacherId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  plan: { type: String, enum: ["monthly", "yearly"] },
  startDate: { type: Date },
  endDate: { type: Date },
  status: { type: String, enum: ["active", "expired"], default: "active" },
}, { timestamps: true });

export default mongoose.models.Subscription || mongoose.model("Subscription", SubscriptionSchema);