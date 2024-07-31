import { body, check } from "express-validator";
// Validation for User model fields
export const userValidators = [
  // Validate name
  body("name").isLength({ min: 1 }).withMessage("Name is required"),

  // Validate email
  body("email")
    .isLength({ min: 1 })
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Must be a valid email address"),

  // Validate password
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];
