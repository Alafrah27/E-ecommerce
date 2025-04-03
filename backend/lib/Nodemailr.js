import dotenv from "dotenv";
import nodemailer from "nodemailer";
import { SignupTamplete } from "../Template/SingupTamplate.js";
import { PASSWORD_RESET_REQUEST_TEMPLATE } from "../Template/passwordRestRequest.js";
import { PASSWORD_RESET_SUCCESS_TEMPLATE } from "../Template/passwordRestScuess.js";
dotenv.config();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Use false for port 587
  auth: {
    user: process.env.EMAIL, // Your email
    pass: process.env.PASSWORD, // Your email app password
  },
  debug: true, // Add this for debugging information
});

export const MailVerification = async (email, name, otpCode) => {
  try {
    const info = await transporter.sendMail({
      from: '"from Musdar Company " <musdarthafa@gmail.com>', // sender address
      to: email,
      subject: " Musdar.Store", // Subject line
      text: "", // plain text body
      html: SignupTamplete.replace("{username}", name).replace(
        "{Verifycode}",
        otpCode
      ), // html body
    });
    return info;
  } catch (error) {
    console.log(error);
  }
  console.log("Message sent: %s", info.messageId);
};
export const ResetPasswordRequestTamplete = async (email, resultURL) => {
  try {
    const info = await transporter.sendMail({
      from: '"from Musdar Company " <musdarthafa@gmail.com>', // sender address
      to: email,
      subject: " Musdar.Store", // Subject line
      text: "", // plain text body
      html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resultURL),

      // html body
    });
    return info;
  } catch (error) {
    console.log(error);
  }
  console.log("Message sent: %s", info.messageId);
};
export const ResetPasswordTamplete = async (email) => {
  try {
    const info = await transporter.sendMail({
      from: '"from Musdar Company " <musdarthafa@gmail.com>', // sender address
      to: email,
      subject: " Musdar.Store", // Subject line
      text: "", // plain text body
      html: PASSWORD_RESET_SUCCESS_TEMPLATE,

      // html body
    });
    return info;
  } catch (error) {
    console.log(error);
  }
  console.log("Message sent: %s", info.messageId);
};
