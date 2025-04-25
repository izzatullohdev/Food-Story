import { Request, Response } from "express";
import { Product } from "../models/Product";
import { asyncHandler } from "../utils/asyncHandler";
import { sendResponse } from "../utils/response";
import { CustomError } from "../utils/customError";
import cloudinary from "../config/cloudinary";

// GET /api/products?category=661f...abc
export const getProducts = asyncHandler(async (req: Request, res: Response) => {
  const { category } = req.query;
  const filter = category ? { category } : {};
  const products = await Product.find(filter).populate("category", "name slug");

  sendResponse(res, {
    message: "Mahsulotlar ro‘yxati",
    data: products,
  });
});

export const createProduct = asyncHandler(
  async (req: Request, res: Response) => {
    const { title, description, price, category, image } = req.body;

    // 1. Image validatsiya
    if (
      !image ||
      typeof image !== "string" ||
      !image.startsWith("data:image/")
    ) {
      throw new CustomError(400, "Rasm noto‘g‘ri formatda yoki mavjud emas");
    }

    // 2. Rasmni Cloudinaryga yuklash
    const result = await new Promise<{ secure_url: string }>(
      (resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "products" },
          (err, result) => {
            if (err || !result)
              return reject(err || new Error("Rasm yuklanmadi"));
            resolve({ secure_url: result.secure_url });
          }
        );
        if (!req.file) {
          throw new CustomError(400, "Rasm yuborilmadi");
        }
        stream.end(req.file.buffer);
      }
    );
    // 3. Mahsulotni yaratish
    const product = await Product.create({
      title,
      description,
      price: parseFloat(price),
      category,
      image: result.secure_url,
    });

    sendResponse(res, {
      statusCode: 201,
      message: "Mahsulot yaratildi",
      data: product,
    });
  }
);

// PUT /api/products/:id
export const updateProduct = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const updated = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updated) throw new CustomError(404, "Mahsulot topilmadi");

    sendResponse(res, {
      message: "Mahsulot yangilandi",
      data: updated,
    });
  }
);

// DELETE /api/products/:id
export const deleteProduct = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const deleted = await Product.findByIdAndDelete(id);

    if (!deleted) throw new CustomError(404, "Mahsulot topilmadi");

    sendResponse(res, {
      message: "Mahsulot o‘chirildi",
      data: deleted,
    });
  }
);
