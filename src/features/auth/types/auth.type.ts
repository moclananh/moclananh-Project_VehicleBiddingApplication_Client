import { z } from "zod";

export const RegisterSchema = z
  .object({
    userName: z.string({
      required_error: "Username is required",
    }),
    email: z
      .string({
        required_error: "Email is required",
      })
      .email("Invalid email format"),
    password: z
      .string({
        required_error: "Password is required",
      })
      .min(6, "Password must be at least 6 characters long"),
    confirmPassword: z
      .string({
        required_error: "Confirm Password is required",
      })
      .min(6, "Confirm Password must be at least 6 characters long"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"], // The error will be associated with confirmPassword
  });
export const LoginSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
    })
    .email("Invalid email format"),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(6, "Password must be at least 6 characters long"),
});

export type ILogin = z.infer<typeof LoginSchema>;
export type RegisterFormField = z.infer<typeof RegisterSchema>;

export enum Role {
  Admin = "Admin",
  Dealer = "Dealer",
}
export interface IUser {
  id: string;
  userName: string;
  email: string;
  role: Role;
  budget: number;
  token: string;
}
export type UserRegister = Omit<IUser, "id" | "token"> & { password: string };
