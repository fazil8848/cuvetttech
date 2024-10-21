const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
  registerCompany,
  login,
  verifyOtp,
  sendOTP,
  logout,
} = require("../controller/authController");
const { auth } = require("../middleware/auth");

const router = express.Router();

router.post("/verify_otp", verifyOtp);
router.post("/register", registerCompany);
router.post("/login", login);
router.post("/sendOTP", sendOTP);
router.post("/logout", auth, logout);

module.exports = router;
