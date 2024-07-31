import nodemailer from "nodemailer";
import { SERVER_MAIL, SERVER_MAIL_PASS } from "../config";
import fs from "node:fs";
import path from "node:path";
let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: SERVER_MAIL,
    pass: SERVER_MAIL_PASS, // Use the app password if 2FA is enabled
  },
});
export async function sendOTP(to: string, otp: string, name: string) {
  const templatePath = path.resolve(__dirname, "../../dist/src/templ/");
  let htmlTemplate = fs.readFileSync(templatePath, "utf8");
  htmlTemplate = htmlTemplate.replace("{{otp}}", otp).replace("{{name}}", name);

  let mailOptions = {
    from: "zlaam.dev@gmail.com",
    to: to,
    subject: "OTP Verification",
    html: htmlTemplate,
  };
  try {
    let info = await transporter.sendMail(mailOptions);
    console.log("OTP sent: " + info.response);
  } catch (error) {
    console.log(error);
    if (error instanceof Error)
      console.error("Error sending OTP:", error.message);
  }
}
