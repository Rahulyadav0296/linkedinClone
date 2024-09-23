const express = require("express");
const router = express.Router();
const { sendOtp, verifyOtp, getUser } = require("../controllers/auth");

router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);
router.get("/signup/:id", getUser);

module.exports = router;
