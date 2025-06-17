import { asyncHandler } from "../utils/asyncHandler";
import { sendResponse } from "../utils/response";
import { CustomError } from "../utils/customError";
import { Admin } from "../models/Admin";

// POST /api/admin
export const createAdmin = asyncHandler(async (req, res) => {
  const admin = await Admin.create(req.body);
  if (!admin) throw new CustomError(400, "Admin yaratilmadi");
  sendResponse(res, {
    statusCode: 201,
    message: "Admin yaratildi",
    data: admin,
  });
});

// GET /api/admin
export const Login = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  const admin = await Admin.findOne({ username });
  if (!admin) {
    return res.status(401).json({ message: "Foydalanuvchi topilmadi" });
  }

  const isMatch = password === admin.password;
  if (!isMatch) {
    return res.status(401).json({ message: "Parol noto‘g‘ri" });
  }

  const token = admin.generateToken() as string;
  res.status(200).json({
    success: true,
    message: "Kirish muvaffaqiyatli",
    token: token,
  });
});

// PUT /api/admin/:username
export const updateAdmin = asyncHandler(async (req, res) => {
  const { username } = req.params;
  const updated = await Admin.findByIdAndUpdate(username, req.body, {
    new: true,
    runValidators: true,
  });

  if (!updated) throw new CustomError(404, "Admin topilmadi");

  sendResponse(res, {
    message: "Admin yangilandi",
    data: updated,
  });
});
