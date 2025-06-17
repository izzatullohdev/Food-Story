import { Router } from "express";
import {
  createAdmin,
  Login,
  updateAdmin,
} from "../controllers/adminController";
const router = Router();

router.post("/", createAdmin);
router.post("/login", Login);
router.put("/:username", updateAdmin);
export default router;
