import mongoose from "mongoose";

const partnerSchema = new mongoose.Schema(
  {
    image: { type: String, required: true }, // Cloudinary link
  },
  { timestamps: true }
);

export const Partner = mongoose.model("Partner", partnerSchema);
