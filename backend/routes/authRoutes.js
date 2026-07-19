import express from "express";

import {
  registerUser,
  loginUser,
  forgotPassword,
  verifyResetOTP,
  resetPassword,
} from "../controllers/authController.js";
const router = express.Router();

// Register
router.post("/register", registerUser);

router.post("/forgot-password", forgotPassword);

router.post( "/verify-reset-otp",verifyResetOTP);

router.post("/reset-password", resetPassword);

// Login
router.post("/login", loginUser);

export default router;