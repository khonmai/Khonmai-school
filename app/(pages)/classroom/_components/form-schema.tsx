import { z } from "zod";

export const ClassRoomSchema = z.object({
  name: z.string().min(1),
});
