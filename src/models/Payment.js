// src/models/Payment.js
import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  type: { type: String, enum: ["course", "subscription"] },
  amount: { type: Number },
  status: { type: String, enum: ["pending", "success", "failed"], default: "pending" },
}, { timestamps: true });

export default mongoose.models.Payment || mongoose.model("Payment", PaymentSchema);