const nodemailer = require("nodemailer");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const twilio = require("twilio");
const { otpEmailTemplate } = require("../utils/mailTemplate");

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const registerCompany = async (req, res) => {
  const { name, phone, companyName, companyEmail, employeeSize } = req.body;

  try {
    const otpMail = Math.floor(100000 + Math.random() * 900000);
    const otpPhone = Math.floor(100000 + Math.random() * 900000);

    const existingUser = await User.findOne({ companyEmail });

    if (existingUser) {
      console.log(existingUser, "Existing Email");
      return res.status(401).json({ error: "Existing Email" });
    }

    const user = new User({
      name,
      phone,
      isVerified: false,
      companyName,
      companyEmail,
      employeeSize,
      otpMail,
      otpPhone,
    });

    const savedUser = await user.save();

    await transporter
      .sendMail({
        from: process.env.EMAIL,
        to: companyEmail,
        subject: "Verify Your Account",
        html: otpEmailTemplate(otpMail),
      })
      .then(() => console.log("mail send"))
      .catch((error) => console.error(error));

    await client.messages.create({
      body: `Your OTP is: ${otpPhone}`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phone,
    });

    res.status(201).json({
      message:
        "Registration successful! Please verify your email and phone number with the OTP.",
      id: savedUser._id,
    });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
    console.log(error);
  }
};

const verifyOtp = async (req, res) => {
  const { type, otp, id } = req.body;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const otps = {
      mobile: user.otpPhone,
      email: user.otpMail,
    };

    if (otp !== otps[type]) {
      return res.status(400).json({ message: `Invalid ${type} OTP.` });
    }

    user[type === "mobile" ? "otpPhone" : "otpMail"] = "";

    user.isVerified = !user.otpPhone && !user.otpMail;

    let token;
    if (user.isVerified) {
      token = jwt.sign(
        { id: user._id, email: user.companyEmail },
        process.env.JWT_SECRET,
        {
          expiresIn: "1d",
        }
      );
    }

    await user.save();

    return res.status(200).json({
      message: user.isVerified
        ? "Both OTPs verified successfully!"
        : `${type} OTP verified successfully!`,
      token: token || null,
      userName: user.name,
    });
  } catch (error) {
    console.error("Error verifying OTP:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

const sendOTP = async (req, res) => {
  const { email } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000);
  try {
    const user = await User.findOne({ companyEmail: email });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    await transporter.sendMail({
      from: process.env.EMAIL,
      to: email,
      subject: "Login to your Account",
      html: otpEmailTemplate(otp),
    });

    let token;
    if (user) {
      token = jwt.sign(
        { id: user._id, email: user.companyEmail },
        process.env.JWT_SECRET,
        {
          expiresIn: "1d",
        }
      );
    }

    res
      .status(201)
      .json({ otp, message: "OTP sent to your email. Please verify.", token });
  } catch (error) {
    console.error("Error sending OTP:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ error: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ error: "Invalid email or password" });

    if (!user.isVerified)
      return res.status(400).json({ error: "Please verify your email first" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.status(200).json({ token, userName: user.name });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

const logout = async (req, res) => {
  res.status(200).json({ message: "Logout successful" });
};

module.exports = { registerCompany, login, verifyOtp, sendOTP, logout };
