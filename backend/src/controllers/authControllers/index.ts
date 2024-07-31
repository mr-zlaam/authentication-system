import { Request, Response } from "express";
import { apiResponse } from "../../helper/apiResponseUtil";
import { asyncHandler } from "../../helper/asynhandlerUtil";
import { prisma } from "../../db";
import { generateOtp } from "../../helper/slug_and_str_generator";
import { BAD_REQUEST } from "../../CONSTANTS";
import { validationResult } from "express-validator";
import { UserData } from "../../types";

const registerController = asyncHandler(async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { name, email, password }: UserData = req.body;
  const lowercaseMail = email.toLowerCase();
  const isUserExist = await prisma.user.findUnique({
    where: { email },
  });
  if (isUserExist) throw { status: BAD_REQUEST, message: "User already exist" };

  const OTP = generateOtp();
  console.log(OTP);
  const registerUser = await prisma.user.create({
    data: {
      name,
      email: lowercaseMail,
      password,
      otp: OTP,
      isVerfied: false,
      role: "USER",
    },
    select: {
      uid: true,
      email: true,
      name: true,
      role: true,
      isVerfied: true,
    },
  });

  return res
    .status(201)
    .json(
      apiResponse(
        201,
        "User created successfully",
        { registerUser },
        registerUser
      )
    );
});
export { registerController };
