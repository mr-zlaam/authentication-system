import { body, check } from "express-validator";
// Validation for User model fields
export const userValidators = [
  // Validate name
  body("name")
    .optional()
    .isString()
    .withMessage("Name must be a string")
    .isLength({ min: 1 })
    .withMessage("Name is required"),

  // Validate email
  body("email")
    .isEmail()
    .withMessage("Must be a valid email address")
    .isLength({ min: 1 })
    .withMessage("Email is required"),

  // Validate password
  body("password")
    .isString()
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),

  // Validate role
  body("role")
    .isIn(["ADMIN", "MODERATOR", "USER"])
    .withMessage("Role must be one of ADMIN, MODERATOR, USER"),

  // Validate otp
  body("otp")
    .optional()
    .isString()
    .isLength({ min: 1, max: 5 })
    .withMessage("OTP is required"),
];
