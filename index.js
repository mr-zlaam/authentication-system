// function generateOtp() {
//   const otp = crypto.randomInt(100000, 1000000);
//   return otp.toString().padStart(6, "0");
// }
const otpExpiry = new Date(Date.now() + 30 * 60 * 1000); // Set expiration time to 30 minutes from now
console.log(otpExpiry);

const now = new Date();
console.log(now);

console.log(now < otpExpiry);
