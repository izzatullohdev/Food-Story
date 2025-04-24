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

    if (!image.startsWith("data:image/")) {
      throw new CustomError(400, "Rasm noto‘g‘ri formatda");
    }

    const uploaded = await cloudinary.uploader.upload(image, {
      folder: "products",
      resource_type: "image",
    });

    const product = await Product.create({
      title,
      description,
      price: parseFloat(price),
      category,
      image: uploaded.secure_url,
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
