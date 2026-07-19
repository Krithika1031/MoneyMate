import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import otpGenerator from "otp-generator";

import User from "../models/User.js";
import sendEmail from "../utils/sendEmail.js";

// ======================= REGISTER =======================

export const registerUser = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already registered",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    const otpExpiry = new Date(Date.now() + 5 * 60 * 1000);

    await User.create({
      fullName,
      email,
      password: hashedPassword,
      otp,
      otpExpiry,
      isVerified: false,
    });

    await sendEmail(
      email,
      "MoneyMate Email Verification",
      `
      <h2>Welcome to MoneyMate 💰</h2>

      <p>Hello <b>${fullName}</b>,</p>

      <p>Your OTP is:</p>

      <h1>${otp}</h1>

      <p>OTP expires in 5 minutes.</p>
      `
    );

    res.status(201).json({
      success: true,
      message: "OTP Sent Successfully",
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ======================= VERIFY OTP =======================

export const verifyOTP = async (req, res) => {
  console.log("verifyOTP called");
  console.log(req.body);
  try {

    const { email, otp } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.otp !== otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    if (user.otpExpiry < new Date()) {
      return res.status(400).json({
        success: false,
        message: "OTP Expired",
      });
    }

    user.isVerified = true;
    user.otp = "";
    user.otpExpiry = null;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Email verified successfully",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }
};

// ======================= RESEND OTP =======================

export const resendOTP = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    user.otp = otp;
    user.otpExpiry = new Date(Date.now() + 5 * 60 * 1000);

    await user.save();

    await sendEmail(
      email,
      "MoneyMate Email Verification",
      `
      <h2>Your New OTP</h2>

      <p>Your new OTP is:</p>

      <h1>${otp}</h1>

      <p>OTP expires in 5 minutes.</p>
      `
    );

    res.status(200).json({
      success: true,
      message: "OTP sent successfully",
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ======================= LOGIN =======================

export const loginUser = async (req, res) => {

  try {

    const { email, password } = req.body;

    const user = await User.findOne({
      email,
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (!user.isVerified) {
      return res.status(401).json({
        success: false,
        message: "Please verify your email first.",
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid password",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.status(200).json({
      success: true,
      message: "Login Successful",
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
      },
    });

  } catch (error) {

    console.log("LOGIN ERROR:");
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }

};
// ================= FORGOT PASSWORD =================

export const forgotPassword = async (req, res) => {
  try {

    const { email } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Email not registered",
      });
    }

    // Generate OTP
    const otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    // OTP expires in 5 minutes
    user.otp = otp;
    user.otpExpiry = Date.now() + 5 * 60 * 1000;

    await user.save();

    // Send Email
    await sendEmail(
      email,
      "Reset Your MoneyMate Password",
      `
      <div style="font-family:Arial;padding:20px">
        <h2>MoneyMate Password Reset 🔐</h2>

        <p>Your OTP is:</p>

        <h1 style="color:#4F46E5;letter-spacing:5px">
          ${otp}
        </h1>

        <p>This OTP is valid for 5 minutes.</p>

        <p>If you didn't request this, please ignore this email.</p>

        <br>

        <h3>MoneyMate Team 💜</h3>
      </div>
      `
    );

    res.status(200).json({
      success: true,
      message: "OTP sent successfully",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }
};
// ================= VERIFY RESET OTP =================

export const verifyResetOTP = async (req, res) => {

  try {

    const { email, otp } = req.body;

    const user = await User.findOne({ email });

    if (!user) {

      return res.status(404).json({
        success: false,
        message: "User not found",
      });

    }

    if (user.otp !== otp) {

      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });

    }

    if (user.otpExpiry < Date.now()) {

      return res.status(400).json({
        success: false,
        message: "OTP Expired",
      });

    }

    res.status(200).json({
      success: true,
      message: "OTP Verified Successfully",
    });

  }

  catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }

};
// ================= RESET PASSWORD =================

export const resetPassword = async (req, res) => {

  try {

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {

      return res.status(404).json({
        success: false,
        message: "User not found",
      });

    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user.password = hashedPassword;

    // Clear OTP after successful reset
    user.otp = "";
    user.otpExpiry = null;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Password reset successfully",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }

};