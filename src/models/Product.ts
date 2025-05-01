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
    description: { type: String, required: true },
    title2: { type: String, required: true },
    description2: { type: String, required: true },
  },
  { timestamps: true }
);

export const Product = mongoose.model("Product", productSchema);
