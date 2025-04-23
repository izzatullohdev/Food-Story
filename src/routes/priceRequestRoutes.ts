import express from "express";
import {
  createRequest,
  getAllRequests,
} from "../controllers/priceRequestController";

const router = express.Router();

router.get("/", getAllRequests);
router.post("/", createRequest);

export default router;
