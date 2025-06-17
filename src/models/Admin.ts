// models/Admin.ts
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { Document } from "mongoose";

interface AdminDocument extends Document {
  username: string;
  password: string;
  generateToken: () => string;
}
const adminSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// 🔑 Method qo‘shamiz
adminSchema.methods.generateToken = function () {
  const token = jwt.sign({ id: this._id }, process.env.JWT_SECRET as string, {
    expiresIn: "7d",
  });
  return token;
};

export const Admin = mongoose.model<AdminDocument>("Admin", adminSchema);
