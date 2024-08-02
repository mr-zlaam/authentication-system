"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyUserController = exports.registerController = void 0;
const express_validator_1 = require("express-validator");
const CONSTANTS_1 = require("../../CONSTANTS");
const db_1 = require("../../db");
const apiResponseUtil_1 = require("../../helper/apiResponseUtil");
const asynhandlerUtil_1 = require("../../helper/asynhandlerUtil");
const passwordHasher_1 = require("../../helper/passwordHasher");
const sendOTP_1 = require("../../helper/sendOTP");
const slug_and_str_generator_1 = require("../../helper/slug_and_str_generator");
const registerController = (0, asynhandlerUtil_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password } = req.body;
    const lowercaseMail = email.toLowerCase();
    const isUserExist = yield db_1.prisma.user.findUnique({
        where: { email },
    });
    if (isUserExist)
        throw { status: CONSTANTS_1.BAD_REQUEST, message: "User already exist" };
    const { otp: OTP, otpExpiry } = (0, slug_and_str_generator_1.generateOtp)();
    yield (0, sendOTP_1.sendOTP)(email, OTP, name)
        .then((res) => console.log("OTP sent successfully"))
        .catch((err) => console.log(err));
    // password hashing
    const hashedPassword = (yield (0, passwordHasher_1.passwordHasher)(password, res)).toString();
    const registerUser = yield db_1.prisma.user.create({
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
        .status(CONSTANTS_1.OK)
        .json((0, apiResponseUtil_1.apiResponse)(CONSTANTS_1.OK, "User created successfully", registerUser));
}));
exports.registerController = registerController;
// Verify User if he is real or just bot
const verifyUserController = (0, asynhandlerUtil_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { otp: userOTP } = req.body;
    if (!userOTP.trim())
        throw {
            status: CONSTANTS_1.BAD_REQUEST,
            message: "Please enter OTP",
        };
    const user = yield db_1.prisma.user.findUnique({
        where: {
            otp: userOTP.toString(),
        },
    });
    if (!user)
        throw {
            status: CONSTANTS_1.BAD_REQUEST,
            message: "User Doesn't exist",
        };
    if (((_a = user.otp) === null || _a === void 0 ? void 0 : _a.trim()) !== userOTP.trim()) {
        throw {
            status: CONSTANTS_1.BAD_REQUEST,
            message: "Invalid OTP",
        };
    }
    // check if otp is expired
    if (user.otpExpiry && user.otpExpiry < new Date()) {
        throw {
            status: CONSTANTS_1.BAD_REQUEST,
            message: "OTP is expired",
        };
    }
    const verifiedUser = yield db_1.prisma.user.update({
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
        .status(CONSTANTS_1.OK)
        .json((0, apiResponseUtil_1.apiResponse)(CONSTANTS_1.OK, "OTP verified successfully", verifiedUser));
}));
exports.verifyUserController = verifyUserController;
