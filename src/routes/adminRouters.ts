import { Router } from "express";
import {
  createAdmin,
  Login,
  updateAdmin,
} from "../controllers/adminController";
const router = Router();

router.post("/", createAdmin);
router.get("/", Login);
router.put("/:username", updateAdmin);
export default router;
