import { Request, Response } from "express";
import { apiResponse } from "../../helper/apiResponseUtil";
import { asyncHandler } from "../../helper/asynhandlerUtil";
import { prisma } from "../../db";
import { generateOtp } from "../../helper/slug_and_str_generator";

const registerController = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, password, otp } = req.body;
  const isUserExist = await prisma.user.findUnique({
    where: { email },
  });
  const OTP = generateOtp();

  const registerUser = await prisma.user.create({
    data: {
      name,
      email,
      password,
      otp: OTP,
      isVerfied: false,
      role: "USER",
    },
  });
});
