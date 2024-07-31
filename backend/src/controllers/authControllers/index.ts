import { Request, Response } from "express";
import { apiResponse } from "../../helper/apiResponseUtil";
import { asyncHandler } from "../../helper/asynhandlerUtil";
import { prisma } from "../../db";
import {
  generateOtp,
  generateRandomStrings,
} from "../../helper/slug_and_str_generator";
import { BAD_REQUEST } from "../../CONSTANTS";
import { validationResult } from "express-validator";
import { UserData } from "../../types";
import { sendOTP } from "../../helper/sendOTP";

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
  const parsedOTP = OTP.split("_")[0];
  await sendOTP(email, parsedOTP, name)
    .then((res) => console.log("OTP sent successfully"))
    .catch((err) => console.log(err));
  const randomSTR = generateRandomStrings(10);
  const registerUser = await prisma.user.create({
    data: {
      name,
      email: lowercaseMail,
      password,
      otp: `${OTP}_${randomSTR}`,
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

const verifyUserController = asyncHandler(
  async (req: Request, res: Response) => {
    const { otp: userOTP } = req.body;
    if (!userOTP.trim())
      throw {
        status: BAD_REQUEST,
        message: "Please enter OTP",
      };
    const user = await prisma.user.findFirst({
      where: {
        otp: {
          startsWith: userOTP,
        },
      },
    });
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
