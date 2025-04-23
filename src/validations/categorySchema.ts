import { z } from "zod";

export const createCategorySchema = z.object({
  name: z
    .string({
      required_error: "Kategoriya nomi kerak",
      invalid_type_error: "Kategoriya nomi noto‘g‘ri formatda",
    })
    .min(1, { message: "Kategoriya nomi bo‘sh bo‘lmasligi kerak" }),

  slug: z
    .string({
      required_error: "Slug kerak",
    })
    .min(1, { message: "Slug bo‘sh bo‘lmasligi kerak" }),
});
