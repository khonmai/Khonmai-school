import { z } from "zod";

export const StudentSchema = z.object({
  student_no: z.string().min(1),
  title: z.string().min(1),
  f_name: z.string().min(1),
  l_name: z.string().min(1),
  nickname: z.string().min(1),
  adderss_1: z.string().nullable(),
  adderss_2: z.string().nullable(),
  phone: z.string().nullable(),
  remark: z.string().nullable(),
});
