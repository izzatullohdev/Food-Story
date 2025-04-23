// src/models/Product.ts
import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    image: { type: String, required: true },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    price: { type: Number, required: true },
    description: { type: String },
  },
  { timestamps: true }
);

export const Product = mongoose.model("Product", productSchema);
