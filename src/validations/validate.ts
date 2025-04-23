import { Request, Response, NextFunction, RequestHandler } from "express";
import { ZodSchema } from "zod";

export const validate = (schema: ZodSchema): RequestHandler => {
  return async (req, res, next): Promise<void> => {
    try {
      req.body = schema.parse(req.body);
      next();
    } catch (err: any) {
      const errors = err.errors?.map((e: any) => ({
        field: e.path.join("."),
        message: e.message,
      }));

      res.status(400).json({
        success: false,
        message: "Validatsiya xatoligi",
        errors,
      });
    }
  };
};
