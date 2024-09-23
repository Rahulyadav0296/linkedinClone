const OTP = require("./models/auth"); // Ensure the path is correct

const testOtp = new OTP({
  formattedNumber: "+1234567890",
  otp: "1234",
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@example.com",
  profilePicture: "path/to/picture",
});

testOtp
  .save()
  .then(() => console.log("Test OTP document saved!"))
  .catch((err) => console.error("Error saving test OTP:", err));
