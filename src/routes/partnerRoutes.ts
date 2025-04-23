import express from "express";
import {
  getPartners,
  createPartner,
  updatePartner,
  deletePartner,
} from "../controllers/partnerController";
import { upload } from "../middlewares/upload";

const router = express.Router();

router.get("/", getPartners);
router.post("/", upload.single("image"), createPartner);
router.put("/:id", upload.single("image"), updatePartner);
router.delete("/:id", deletePartner);

export default router;
