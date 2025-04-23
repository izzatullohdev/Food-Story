import { Response } from "express";

export const sendResponse = <T>(
  res: Response,
  payload: {
    statusCode?: number;
    message?: string;
    data?: T;
  }
) => {
  const { statusCode = 200, message = "OK", data } = payload;

  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};
