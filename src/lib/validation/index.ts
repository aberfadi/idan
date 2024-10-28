import * as z from "zod";
// Register Form Validation
export const RegisterV = z.object({
  firstname: z.string().min(1, "First name is required"),
  lastname: z.string().min(1, "Last name is required"),
  email: z.string().email(),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

// Login Form Validation
export const LoginV = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

// Recover Password Form Validation
export const RecPasV = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

// Post Validation
export const PostV = z.object({
  caption: z.string().min(1).max(2200),
  file: z.custom<File[]>(),
});
