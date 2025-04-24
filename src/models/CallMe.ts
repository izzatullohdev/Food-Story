import mongoose from "mongoose";

const callMeSchema = new mongoose.Schema({
  phone: { type: String, required: true },
});

export const CallMe = mongoose.model("CallMe", callMeSchema);
