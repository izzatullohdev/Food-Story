import mongoose from "mongoose";

const contactUsSchema = new mongoose.Schema(
  {
    name: { type: String },
    email: { type: String },
    phone: { type: String, required: true },
  },
  { timestamps: true }
);

export const contactUs = mongoose.model("ContactUs", contactUsSchema);
