import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { sendResponse } from "../utils/response";
import { callMeSchema } from "../validations/contactUsSchema";
import { contactUs } from "../models/contactUs";
export const createCallMeRequest = asyncHandler(
  async (req: Request, res: Response) => {
    const validated = callMeSchema.parse(req.body);
    const created = await contactUs.create(validated);

    sendResponse(res, {
      statusCode: 201,
      message: "So‘rov qabul qilindi",
      data: created,
    });
  }
);

// @route All Contact US
//@decription  GET /api/contact-us
export const getCallMeRequests = asyncHandler(
  async (_req: Request, res: Response) => {
    const items = await contactUs.find().sort({ createdAt: -1 });

    sendResponse(res, {
      message: "Barcha so‘rovlar",
      data: items,
    });
  }
);
export const deleteCallMeRequest = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!id) throw new Error("ID noto‘g‘ri");
    const deleted = await contactUs.findByIdAndDelete(id);
    sendResponse(res, {
      message: "So‘rov o‘chirildi",
      data: deleted,
    });
  }
);
