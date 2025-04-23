import { z } from "zod";

export const productSchema = z.object({
  title: z.string().min(1, { message: "Nom majburiy" }),
  category: z.string().min(1, { message: "Category ID kerak" }),
  price: z.number().positive({ message: "Narx musbat son bo‘lishi kerak" }),
  description: z.string().optional(),
});
