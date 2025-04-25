import express from "express";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController";
import { productSchema } from "../validations/productSchema";
import { validate } from "../validations/validate";
import { upload } from "../middlewares/upload";
const router = express.Router();

router.get("/", getProducts);
router.post("/", upload.single("image"), createProduct);
router.put("/:id", validate(productSchema.partial()), updateProduct);
router.delete("/:id", deleteProduct);

export default router;
