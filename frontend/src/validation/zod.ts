import { UserType } from "@/types";
import z from "zod";
// USER VALIDATION SCHEMA
export const userSchema: z.ZodSchema<UserType> = z.object({
  firstName: z
    .string()
    .min(1, { message: "First Name is required" })
    .max(50, { message: "First Name is too long" }),
  lastName: z
    .string()
    .min(1, { message: "Last Name is required" })
    .max(50, { message: "Last Name is too long" }),
  email: z
    .string()
    .min(4, { message: "Email must contain at least 4 characters" })
    .max(200, { message: "Email is too long" })
    .email({ message: "Must be a valid email address" }),
  password: z
    .string({ message: "Password is required" })
    .min(6, { message: "Password must contain at least 6 characters" })
    .max(50, { message: "Password is too long" }),
});
// OTP VALIDATION SCHEMA
export const FormSchema = z.object({
  pin: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});
