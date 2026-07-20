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

    await User.create({
      fullName,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      success: true,
      message: "Account created successfully",
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


// ================= VERIFY RESET OTP =================
// ================= RESET PASSWORD =================
