import { Request, Response } from "express";
import { apiResponse } from "../../helper/apiResponseUtil";
import { asyncHandler } from "../../helper/asynhandlerUtil";
import { prisma } from "../../db";
import {
  generateOtp,
  generateRandomStrings,
} from "../../helper/slug_and_str_generator";
import { BAD_REQUEST, CREATED } from "../../CONSTANTS";
import { validationResult } from "express-validator";
import { UserData } from "../../types";
import { sendOTP } from "../../helper/sendOTP";
import { passwordHasher } from "../../helper/passwordHasher";

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
  await sendOTP(email, OTP, name)
    .then((res) => console.log("OTP sent successfully"))
    .catch((err) => console.log(err));
  // password hashing
  const hashedPassword = (
    await passwordHasher(password, res)
  ).toString() as string;
  const registerUser = await prisma.user.create({
    data: {
      name,
      email: lowercaseMail,
      password: hashedPassword,
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
    .status(CREATED)
    .json(apiResponse(CREATED, "User created successfully", registerUser));
});

const verifyUserController = asyncHandler(
  async (req: Request, res: Response) => {
    const { otp: userOTP } = req.body;
    if (!userOTP.trim())
      throw {
        status: BAD_REQUEST,
        message: "Please enter OTP",
      };

    const isOTPValid = await prisma.user.findUnique({
      where: {
        otp: userOTP.toString(),
      },
    });
    if (!isOTPValid)
      throw {
        status: BAD_REQUEST,
        message: "Invalid OTP",
      };
    const verifiedUser = await prisma.user.update({
      where: {
        otp: userOTP.toString(),
      },
      data: {
        isVerfied: true,
        otp: "",
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
      .json(apiResponse(201, "OTP verified successfully", verifiedUser));
  }
);

// Exports
export { registerController, verifyUserController };
