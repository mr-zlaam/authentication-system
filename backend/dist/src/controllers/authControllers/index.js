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
exports.registerController = void 0;
const apiResponseUtil_1 = require("../../helper/apiResponseUtil");
const asynhandlerUtil_1 = require("../../helper/asynhandlerUtil");
const db_1 = require("../../db");
const slug_and_str_generator_1 = require("../../helper/slug_and_str_generator");
const CONSTANTS_1 = require("../../CONSTANTS");
const express_validator_1 = require("express-validator");
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
    const OTP = (0, slug_and_str_generator_1.generateOtp)();
    console.log(OTP);
    const registerUser = yield db_1.prisma.user.create({
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
        .json((0, apiResponseUtil_1.apiResponse)(201, "User created successfully", { registerUser }, registerUser));
}));
exports.registerController = registerController;
