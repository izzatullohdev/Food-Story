import multer from "multer";
import { Request } from "express";

// RAMda saqlash
const storage = multer.memoryStorage();

// Faqat rasm fayllar
const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("❌ Faqat rasm fayllarga ruxsat etiladi!"));
  }
};

export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 30 * 1024 * 1024, // 30 MB
  },
});
