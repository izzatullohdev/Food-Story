import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI as string);
    console.log(`✅ MongoDB ulandi: ${conn.connection.host}`);
  } catch (err) {
    console.error("❌ MongoDB ulanishda xatolik:", err);
    process.exit(1);
  }
};
