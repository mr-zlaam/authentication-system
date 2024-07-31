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
const asynhandlerUtil_1 = require("../../helper/asynhandlerUtil");
const db_1 = require("../../db");
const slug_and_str_generator_1 = require("../../helper/slug_and_str_generator");
const registerController = (0, asynhandlerUtil_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, otp } = req.body;
    const isUserExist = yield db_1.prisma.user.findUnique({
        where: { email },
    });
    const OTP = (0, slug_and_str_generator_1.generateOtp)();
    const registerUser = yield db_1.prisma.user.create({
        data: {
            name,
            email,
            password,
            otp: OTP,
            isVerfied: false,
            role: "USER",
        },
    });
}));
