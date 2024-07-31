export function generateRandomStrings(length: number) {
  const characters =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let randomString = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomString += characters.charAt(randomIndex);
  }
  return randomString;
}

export function generateSlug(slugString: string) {
  let slug = slugString.toLowerCase();
  slug = slug.replace(/[^a-z0-9\s-]/g, "");
  slug = slug.trim().replace(/\s+/g, "-");
  return slug;
}

// 5 digit random otp generator
export function generateOtp() {
  const otp = Math.floor(100000 + Math.random() * 900000);
  return otp.toString();
}
