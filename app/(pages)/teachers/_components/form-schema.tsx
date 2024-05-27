import { z } from "zod";

export const TeacherSchema = z.object({
  teacher_no: z.string().min(1),
  title: z.string().min(1),
  f_name: z.string().min(1),
  l_name: z.string().min(1),
  nickname: z.string().min(1),
});
