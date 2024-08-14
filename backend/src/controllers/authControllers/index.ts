import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { BAD_REQUEST, FORBIDDEN, OK } from "../../CONSTANTS";
import { prisma } from "../../db";
import { apiResponse } from "../../helper/apiResponseUtil";
import { asyncHandler } from "../../helper/asynhandlerUtil";
import { passwordHasher, verifyPassword } from "../../helper/passwordHasher";
import { sendOTP } from "../../helper/sendOTP";
import { generateOtp } from "../../helper/slug_and_str_generator";
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

  const { otp: OTP, otpExpiry } = generateOtp();
  await sendOTP(email, OTP, name)
    .then(() => console.log("OTP sent successfully"))
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
      otpExpiry,
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
    .status(OK)
    .json(apiResponse(OK, "User created successfully", registerUser));
});
// Verify User if he is real or just bot
const verifyUserController = asyncHandler(
  async (req: Request, res: Response) => {
    const { otp: userOTP } = req.body;
    if (!userOTP.trim())
      throw {
        status: BAD_REQUEST,
        message: "Please enter OTP",
      };
    const user = await prisma.user.findUnique({
      where: {
        otp: userOTP.toString(),
      },
    });

    if (!user)
      throw {
        status: BAD_REQUEST,
        message: "User Doesn't exist",
      };
    if (user.otp?.trim() !== userOTP.trim()) {
      throw {
        status: BAD_REQUEST,
        message: "Invalid OTP",
      };
    }
    // check if otp is expired
    if (user.otpExpiry && user.otpExpiry < new Date()) {
      throw {
        status: BAD_REQUEST,
        message: "OTP is expired",
      };
    }

    const verifiedUser = await prisma.user.update({
      where: {
        otp: userOTP.toString(),
      },
      data: {
        isVerfied: true,
        otp: null,
        otpExpiry: null,
        otpRequestCount: 0,
        cooldownExpiry: null,
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
      .status(OK)
      .json(apiResponse(OK, "OTP verified successfully", verifiedUser));
  }
);

// ** User LoginController
const loginControlller = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw {
      status: BAD_REQUEST,
      message: "Please enter email and password",
    };
  }
  const checkIfUserExist = await prisma.user.findUnique({
    where: { email },
  });
  if (!checkIfUserExist) {
    throw {
      status: BAD_REQUEST,
      message: "Please register yourself first",
    };
  }
  const isPasswordValid = await verifyPassword(
    password,
    checkIfUserExist?.password,
    res
  );
  if (!isPasswordValid) {
    throw {
      status: FORBIDDEN,
      message: "Invalid credentials",
    };
  }
  //TODO: add sessions for users using jwt tokens.

  /* Enter jwt code here */
  return res
    .status(OK)
    .json(
      apiResponse(
        OK,
        `${checkIfUserExist.name || "user"} logged in successfully`
      )
    );
});
// Exports
export { registerController, verifyUserController, loginControlller };
