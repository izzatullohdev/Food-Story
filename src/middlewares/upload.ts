import multer from "multer";

// 🧠 Faylni RAMda saqlaymiz (hard diskga yozilmaydi)
const storage = multer.memoryStorage();

// ✅ Filter — faqat rasm fayllar
const fileFilter = (
  req: Express.Request,
  file: Express.Multer.File,
  cb: any
) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Faqat rasm fayllar ruxsat etiladi!"), false);
  }
};

// 🔧 Limitlar va sozlamalar
export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 30 * 1024 * 1024, //
  },
});
