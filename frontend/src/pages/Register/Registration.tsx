import React, { ChangeEvent, FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setToken, setUserId } from "../../utils/authSlice";
import "./Registration.css";

interface UserResponse {
  success: boolean;
  message: string;
}

interface VerifiedResponse {
  success: boolean;
  message: string;
  token: string;
  otpRecord: {
    _id: string;
  };
}

const Registration: React.FC = () => {
  const [mobile, setMobile] = useState<string>("");
  const [username, setUserName] = useState<string>("");
  const [otp, setOtp] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [showOtp, setShowOtp] = useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleRegister = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setMessage("");

    fetch("http://localhost:5000/api/send-otp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ mobile: mobile, username: username }),
    })
      .then((res) => res.json())
      .then((data: UserResponse) => {
        if (!data.success) {
          setError(data.message);
        } else {
          setMessage(data.message);
          setShowOtp(true);
        }
      })
      .catch((err) => {
        console.error(err);
        setError("An error occurred during registration.");
      });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!otp) {
      setError("OTP Cannot be empty.");
      return;
    }

    fetch("http://localhost:5000/api/verify-otp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ mobile: mobile, otp: otp }),
    })
      .then((response) => response.json())
      .then((data: VerifiedResponse) => {
        console.log("Response data:", data); // Debug log
        if (data.success) {
          console.log("Verified message:", data.message); // Debug log
          setMessage(data.message);
          dispatch(setToken(data.token));
          dispatch(setUserId(data.otpRecord._id));
          setTimeout(() => {
            navigate("/"); // Ensure navigate is correctly imported
          }, 500);
        } else {
          setError("Invalid OTP");
        }
      })
      .catch((err) => {
        console.error("Error during OTP verification:", err);
        setError("Failed to verify OTP. Please try again.");
      });
  };

  return (
    <>
      <form
        className="registration-form"
        onSubmit={!showOtp ? handleRegister : handleSubmit}
      >
        <h1>Sign Up</h1>

        <div className="form-input">
          <input
            name="mobile"
            type="text"
            value={mobile}
            onChange={(e) => {
              setMobile(e.target.value);
            }}
            required
            disabled={showOtp}
            placeholder="Enter your Mobile Number..."
          />
          <input
            name="username"
            type="text"
            value={username}
            onChange={(e) => {
              setUserName(e.target.value);
            }}
            required
            disabled={showOtp}
            placeholder="Enter your Username..."
          />
          {showOtp && (
            <input
              type="text"
              value={otp}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setOtp(e.target.value);
                setError("");
              }}
              required
              placeholder="Enter Otp please..."
            />
          )}
        </div>

        {error && <p className="error-message">{error}</p>}
        <button type="submit" className="submit-button">
          {!showOtp ? "Register" : "Login"}
        </button>
        {message && <p className="success-message">{message}</p>}
      </form>
    </>
  );
};

export default Registration;
