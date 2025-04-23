import express from "express";
import {
  getContact,
  createOrUpdateContact,
  updateContact,
  deleteContact,
} from "../controllers/contactController";
import { validate } from "../validations/validate";
import { contactSchema } from "../validations/contactSchema";

const router = express.Router();

router.get("/", getContact);
router.post("/", createOrUpdateContact);

router.put("/:id", validate(contactSchema), updateContact);
router.delete("/:id", deleteContact);
export default router;
