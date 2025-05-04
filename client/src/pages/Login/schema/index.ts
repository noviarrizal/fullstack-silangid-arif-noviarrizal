import { z } from "zod";

export const loginSchema = z.object({
  email: z
  .string({
    required_error: "Email is required",
  })
  .email("Invalid email format"),
  password: z.string().min(5, "Password is required"),
});

export const registerSchema = z.object({
  name: z.string().min(3, "Username is required"),
  email: z
    .string({
      required_error: "Email is required",
    })
    .email("Invalid email format"),
  password: z.string().min(5, "Password is required"),
});

export const editSchema = z.object({
  name: z.string().min(3, "Username is required"),
  email: z
    .string({
      required_error: "Email is required",
    })
    .email("Invalid email format"),
});
