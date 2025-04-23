import express from "express";
import {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/categoryController";
import { validate } from "../validations/validate";
import { createCategorySchema } from "../validations/categorySchema";

const router = express.Router();

// GET: barcha kategoriyalar
router.get("/", getAllCategories);

// POST: yangi kategoriya qo‘shish
router.post("/", validate(createCategorySchema), createCategory);

// PUT: mavjud kategoriya yangilash
router.put("/:id", validate(createCategorySchema.partial()), updateCategory);

// DELETE: kategoriya o‘chirish
router.delete("/:id", deleteCategory);

export default router;
