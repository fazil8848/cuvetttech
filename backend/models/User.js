const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  companyEmail: { type: String, required: true },
  phone: { type: String, required: true },
  isVerified: { type: Boolean, default: false },
  companyName: { type: String, required: true },
  employeeSize: { type: String, required: true },
  otpMail: { type: String },
  otpPhone: { type: String },
});

module.exports = mongoose.model("User", UserSchema);
