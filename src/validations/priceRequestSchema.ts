import { z } from "zod";

export const priceRequestSchema = z.object({
  name: z.string().optional(),
  phone: z.string().min(6, "Telefon raqami noto‘g‘ri"),
  email: z.string().email("Email noto‘g‘ri"),
  region: z.string().min(1, "Region majburiy"),
});
