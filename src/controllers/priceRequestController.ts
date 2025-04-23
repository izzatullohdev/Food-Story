import { Request, Response } from "express";
import { PriceRequest } from "../models/PriceRequest";
import { asyncHandler } from "../utils/asyncHandler";
import { sendResponse } from "../utils/response";
import { priceRequestSchema } from "../validations/priceRequestSchema";

// GET /api/price-request
export const getAllRequests = asyncHandler(
  async (_req: Request, res: Response) => {
    const requests = await PriceRequest.find().sort({ createdAt: -1 });
    sendResponse(res, {
      message: "Barcha so‘rovlar",
      data: requests,
    });
  }
);

// POST /api/price-request
export const createRequest = asyncHandler(
  async (req: Request, res: Response) => {
    const validated = priceRequestSchema.parse(req.body);

    const created = await PriceRequest.create(validated);

    sendResponse(res, {
      statusCode: 201,
      message: "So‘rov qabul qilindi",
      data: created,
    });
  }
);
