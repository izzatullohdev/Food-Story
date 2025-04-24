import { Router } from "express";
import {
  createCallme,
  getAllCallmes,
  deleteCallme,
} from "../controllers/callmeController";
const router = Router();

router.get("/", getAllCallmes);
router.post("/", createCallme);
router.delete("/:id", deleteCallme);

export default router;
