import { Request, Response } from "express";
import { Partner } from "../models/Partner";
import { asyncHandler } from "../utils/asyncHandler";
import { sendResponse } from "../utils/response";
import { CustomError } from "../utils/customError";
import cloudinary from "../config/cloudinary";

// GET /api/partners
export const getPartners = asyncHandler(
  async (_req: Request, res: Response) => {
    const partners = await Partner.find();
    sendResponse(res, {
      message: "Hamkorlar ro‘yxati",
      data: partners,
    });
  }
);

// POST /api/partners
export const createPartner = asyncHandler(
  async (req: Request, res: Response) => {
    if (!req.file) {
      throw new CustomError(400, "Rasm yuborilmadi");
    }

    const result = await new Promise<{ secure_url: string }>(
      (resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "partners" },
          (err, result) => {
            if (err || !result)
              return reject(err || new Error("Rasm yuklanmadi"));
            resolve({ secure_url: result.secure_url });
          }
        );
        if (!req.file) {
          throw new CustomError(400, "Rasm yuborilmadi");
        }
        stream.end(req.file.buffer);
      }
    );

    const created = await Partner.create({
      image: result.secure_url,
    });

    sendResponse(res, {
      statusCode: 201,
      message: "Hamkor yaratildi",
      data: created,
    });
  }
);
//PUT /api/partners:id
export const updatePartner = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const existing = await Partner.findById(id);
    if (!existing) throw new CustomError(404, "Partner topilmadi");

    let imageUrl = existing.image;

    if (req.file) {
      // Yangi rasm yuklangan bo‘lsa, eski rasmni Cloudinarydan o‘chirish mumkin
      // (agar saqlangan bo‘lsa - optional)
      const result = await new Promise<{ secure_url: string }>(
        (resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: "partners" },
            (err, result) => {
              if (err || !result)
                return reject(err || new Error("Yangi rasm yuklanmadi"));
              resolve({ secure_url: result.secure_url });
            }
          );
          if (!req.file) {
            throw new CustomError(404, "Partner topilmadi");
          }
          stream.end(req.file.buffer);
        }
      );

      imageUrl = result.secure_url;
    }

    const updated = await Partner.findByIdAndUpdate(
      id,
      { name: req.body.name, image: imageUrl },
      { new: true }
    );

    sendResponse(res, {
      message: "Partner yangilandi",
      data: updated,
    });
  }
);
//DELETE /api/partners:id
export const deletePartner = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const existing = await Partner.findById(id);
    if (!existing) throw new CustomError(404, "Partner topilmadi");

    await Partner.findByIdAndDelete(id);

    // Optional: Cloudinary’dagi rasmni o‘chirish uchun `public_id` saqlangan bo‘lishi kerak

    sendResponse(res, {
      message: "Partner o‘chirildi",
      data: existing,
    });
  }
);
