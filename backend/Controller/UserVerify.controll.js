import {
  ResetPasswordRequestTamplete,
  ResetPasswordTamplete,
} from "../lib/Nodemailr.js";
import User from "../model/User.model.js";
import dotenv from "dotenv";
import crypto from "crypto";
import bcrypt from "bcryptjs";
dotenv.config();
export const userVerify = async (req, res) => {
  try {
    const { code } = req.body;
    const user = await User.findOne({ otpCode: code });
    if (!user) {
      return res.status(400).json({ message: "Invalid code or expired" });
    }
    user.isVerify = true;
    await user.save();
    return res.status(200).json({ message: "Email has been verified" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "email not found" });
    }

    const resetToken = crypto.randomBytes(20).toString("hex");
    const resetTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000; // 1 hour

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpiresAt = resetTokenExpiresAt;

    await user.save();

    const link =
      `${process.env.CLIENT_URL}/restpassword/${resetToken}` ||
      `${process.env.ADMIN_URL}/restpassword/${resetToken}`;

    await ResetPasswordRequestTamplete(user.email, link);

    return res.status(200).json({ message: "Email has been verified" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { password } = req.body;
    const { token } = req.params;

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpiresAt: { $gt: Date.now() },
    });
    if (!user) {
      return res.status(400).json({ message: "Invalid reset token" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpiresAt = undefined;
    await user.save();

    await ResetPasswordTamplete(user.email);

    return res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
    console.log(error);
  }
};
