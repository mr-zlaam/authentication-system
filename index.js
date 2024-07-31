function generateOtp() {
  const otp = crypto.randomInt(100000, 1000000);
  return otp.toString().padStart(6, "0");
}
