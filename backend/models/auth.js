const mongoose = require("mongoose");

const OtpSchema = new mongoose.Schema({
  mobile: { type: String, required: true },
  username: { type: String, required: true },
  otp: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: "10m" }, // OTP expires in 5 minutes
});

module.exports = mongoose.model("OTP", OtpSchema);
