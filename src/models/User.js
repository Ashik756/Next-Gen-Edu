import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: { type: String, requied: true },
    email: { type: String, requied: true },
    password: { type: String },
    image: { type: String },
    role: { type: String, enum: ["admin", "teacher", "student"], default: "student" }
}, { timestamps: true });

export default mongoose.models.User || mongoose.model("User", UserSchema);