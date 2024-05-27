import { z } from "zod";

export const TripSchema = z.object({
  name: z.string().min(1),
});
