import { Request, Response } from "express";
import { Category } from "../models/Category";
import { asyncHandler } from "../utils/asyncHandler";
import { sendResponse } from "../utils/response";
import { CustomError } from "../utils/customError";

// GET /api/categories
export const getAllCategories = asyncHandler(async (_req, res) => {
  const categories = await Category.find();
  sendResponse(res, {
    message: "Kategoriya ro‘yxati",
    data: categories,
  });
});

// POST /api/categories
export const createCategory = asyncHandler(async (req, res) => {
  const category = await Category.create(req.body);
  sendResponse(res, {
    statusCode: 201,
    message: "Kategoriya yaratildi",
    data: category,
  });
});

// PUT /api/categories/:id
export const updateCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updated = await Category.findByIdAndUpdate(id, req.body, { new: true });

  if (!updated) throw new CustomError(404, "Kategoriya topilmadi");

  sendResponse(res, {
    message: "Kategoriya yangilandi",
    data: updated,
  });
});

// DELETE /api/categories/:id
export const deleteCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const deleted = await Category.findByIdAndDelete(id);

  if (!deleted) throw new CustomError(404, "Kategoriya topilmadi");

  sendResponse(res, {
    message: "Kategoriya o‘chirildi",
    data: deleted,
  });
});
