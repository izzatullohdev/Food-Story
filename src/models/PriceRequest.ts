import mongoose from "mongoose";

const priceRequestSchema = new mongoose.Schema(
  {
    name: { type: String },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    region: { type: String, required: true },
  },
  { timestamps: true }
);

export const PriceRequest = mongoose.model("PriceRequest", priceRequestSchema);
