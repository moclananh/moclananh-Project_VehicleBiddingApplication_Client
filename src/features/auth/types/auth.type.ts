import { z } from "zod";

export const RegisterSchema = z
  .object({
    username: z.string().optional(),
    email: z.string().email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    confirmPassword: z.string().min(6, "Confirm Password must be at least 6 characters long"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"], // The error will be associated with confirmPassword
  });
export const LoginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export type ILogin = z.infer<typeof LoginSchema>;
export type IRegister = z.infer<typeof RegisterSchema>;
