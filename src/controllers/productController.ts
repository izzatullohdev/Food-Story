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
    try {
      const { title, price, category, description } = req.body;

      if (!req.file) {
        throw new CustomError(400, "Rasm fayli yuborilmadi");
      }

      const result = await new Promise<{ secure_url: string }>(
        (resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: "products" },
            (error, result) => {
              if (error || !result)
                return reject(
                  error || new Error("Cloudinary yuklashda xatolik")
                );
              resolve({ secure_url: result.secure_url });
            }
          );

          if (!req.file) {
            throw new CustomError(400, "Rasm fayli yuborilmadi");
          }
          stream.end(req.file.buffer);
        }
      );

      const created = await Product.create({
        title,
        price: parseFloat(price),
        category,
        description,
        image: result.secure_url,
      });

      sendResponse(res, {
        statusCode: 201,
        message: "Mahsulot yaratildi",
        data: created,
      });
    } catch (err: any) {
      console.error("❌ CREATE PRODUCT ERROR:", err);
      throw new CustomError(500, "Serverda kutilmagan xatolik");
    }
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
