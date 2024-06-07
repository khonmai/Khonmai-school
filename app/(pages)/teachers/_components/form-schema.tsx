import { z } from "zod";

export const TeacherSchema = z.object({
  teacher_no: z.string().min(1),
  title: z.string().min(1),
  f_name: z.string().min(1),
  l_name: z.string().min(1),
  nickname: z.string().min(1),
});

export const ChangePasswordSchema = z
  .object({
    oldpassword: z.string(),
    newpassword: z.string().min(4),
    confirmpassword: z.string(),
  })
  .superRefine(({ confirmpassword, newpassword }, ctx) => {
    if (confirmpassword !== newpassword) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords did not match",
        path: ["confirmpassword"],
      });
    }
  });
