import { z } from "zod";

export const ProductSchema = z.object({
  product_no: z.string().min(1),
  name: z.string().min(1),
  detail: z.string().min(1),
  price: z.coerce.number().min(1),
  // category_id: z.string().min(1),
  unit: z.string().min(1),
  amount: z.number().optional(),
});
