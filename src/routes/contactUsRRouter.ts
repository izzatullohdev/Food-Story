import express from "express";
import {
  createCallMeRequest,
  deleteCallMeRequest,
  getCallMeRequests,
} from "../controllers/contactUsController";
import { callMeSchema } from "../validations/contactUsSchema";
import { validate } from "../validations/validate";

const router = express.Router();

router.post("/", validate(callMeSchema), createCallMeRequest);
router.get("/", getCallMeRequests);
router.delete("/:id", deleteCallMeRequest);

export default router;
