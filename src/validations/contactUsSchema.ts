import { z } from "zod";

export const callMeSchema = z.object({
  name: z.string().optional(),
  email: z.string().email("Email noto‘g‘ri").optional(),
  phone: z
    .string()
    .min(7, "Telefon raqam noto‘g‘ri")
    .max(20, "Telefon raqam juda uzun"),
});
