import { asyncHandler } from "../utils/asyncHandler";
import { sendResponse } from "../utils/response";
import { CustomError } from "../utils/customError";
import { CallMe } from "../models/CallMe"; // ✅ to‘g‘ri

// POST /api/callme
export const createCallme = asyncHandler(async (req, res) => {
  const callme = await CallMe.create(req.body);
  if (!callme) throw new CustomError(400, "Callme yaratilmadi");
  sendResponse(res, {
    statusCode: 201,
    message: "Callme yaratildi",
    data: callme,
  });
});

// GET /api/callme
export const getAllCallmes = asyncHandler(async (_req, res) => {
  const callmes = await CallMe.find();
  sendResponse(res, {
    message: "Callme ro‘yxati",
    data: callmes,
  });
});

// DELETE /api/callme/:id
export const deleteCallme = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const deleted = await CallMe.findByIdAndDelete(id);
  if (!deleted) throw new CustomError(404, "Callme topilmadi");
  sendResponse(res, {
    message: "Callme o‘chirildi",
    data: deleted,
  });
});
