import { Request, Response } from "express";
import { Contact } from "../models/Contact";
import { asyncHandler } from "../utils/asyncHandler";
import { sendResponse } from "../utils/response";
import { CustomError } from "../utils/customError";
import { contactSchema } from "../validations/contactSchema";

// GET /api/contact
export const getContact = asyncHandler(async (_req: Request, res: Response) => {
  const contact = await Contact.findOne();
  sendResponse(res, {
    message: "Aloqa ma’lumotlari",
    data: contact,
  });
});

// POST /api/contact
export const createOrUpdateContact = asyncHandler(
  async (req: Request, res: Response) => {
    const validated = contactSchema.parse(req.body);

    // Faqat bitta contact bo'lishi kerak — yangilaymiz yoki yaratamiz
    const existing = await Contact.findOne();
    let saved;

    if (existing) {
      saved = await Contact.findByIdAndUpdate(existing._id, validated, {
        new: true,
      });
    } else {
      saved = await Contact.create(validated);
    }

    sendResponse(res, {
      message: "Aloqa ma’lumotlari saqlandi",
      data: saved,
    });
  }
);
// PUT /api/contact/:id
export const updateContact = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  // 1. ID validligini tekshiramiz
  if (!id || id.length !== 24) {
    throw new CustomError(400, "ID noto‘g‘ri formatda");
  }

  // 2. Validatsiya
  const validated = contactSchema.parse(req.body);

  // 3. Contact mavjudligini tekshiramiz
  const existing = await Contact.findById(id);
  if (!existing) {
    throw new CustomError(404, "Aloqa ma’lumotlari topilmadi");
  }

  // 4. Yangilaymiz
  const updated = await Contact.findByIdAndUpdate(id, validated, { new: true });

  sendResponse(res, {
    message: "Aloqa ma’lumotlari yangilandi",
    data: updated,
  });
});
// DELETE /api/contact/:id
export const deleteContact = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  // ID tekshiruv
  if (!id || id.length !== 24) {
    throw new CustomError(400, "ID noto‘g‘ri formatda");
  }

  const existing = await Contact.findById(id);
  if (!existing) {
    throw new CustomError(404, "Aloqa ma’lumotlari topilmadi");
  }

  await Contact.findByIdAndDelete(id);

  sendResponse(res, {
    message: "Aloqa ma’lumotlari o‘chirildi",
    data: existing,
  });
});
