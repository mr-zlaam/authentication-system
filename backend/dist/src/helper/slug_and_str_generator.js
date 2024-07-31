"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRandomStrings = generateRandomStrings;
exports.generateSlug = generateSlug;
exports.generateOtp = generateOtp;
const node_crypto_1 = __importDefault(require("node:crypto"));
function generateRandomStrings(length) {
    const characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let randomString = "";
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        randomString += characters.charAt(randomIndex);
    }
    return randomString;
}
function generateSlug(slugString) {
    let slug = slugString.toLowerCase();
    slug = slug.replace(/[^a-z0-9\s-]/g, "");
    slug = slug.trim().replace(/\s+/g, "-");
    return slug;
}
// 5 digit random otp generator
function generateOtp() {
    const otp = node_crypto_1.default.randomInt(100000, 1000000);
    return otp.toString().padStart(6, "0");
}
