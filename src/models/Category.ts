// src/models/Category.ts
import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true }, // masalan: meat → "meat"
  },
  { timestamps: true }
);

export const Category = mongoose.model("Category", categorySchema);
