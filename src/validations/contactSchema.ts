import { z } from "zod";

export const contactSchema = z.object({
  phone: z.string().min(5, "Telefon raqami noto‘g‘ri"),
  address: z.string().min(5, "Manzil noto‘g‘ri"),
  email: z.string().email("Email noto‘g‘ri"),
});
