import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { CustomError } from "../utils/customError";

export const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  let statusCode = 500;
  let message = "Serverda kutilmagan xatolik";

  // Zod xatosi
  if (err instanceof ZodError) {
    statusCode = 400;
    message = err.errors.map((e) => `${e.path[0]}: ${e.message}`).join(", ");
  }

  // Biz yaratgan CustomError
  else if (err instanceof CustomError) {
    statusCode = err.statusCode;
    message = err.message;
  }

  res.status(statusCode).json({
    success: false,
    message,
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
};
