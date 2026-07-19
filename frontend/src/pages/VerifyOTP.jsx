import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { API_URL } from "../config";
import "../styles/VerifyOTP.css";

function VerifyOTP() {
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);

  const inputRefs = useRef([]);
  const navigate = useNavigate();

  const email = localStorage.getItem("email");

  // Timer
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(interval);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  // Verify OTP
  const handleVerifyOTP = async () => {
    try {
      const response = await fetch(`${API_URL}/api/auth/verify-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          otp,
        }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success("OTP Verified Successfully ✅");
        localStorage.removeItem("email");
        navigate("/login");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Server Error");
    }
  };

  // Resend OTP
  const handleResendOTP = async () => {
    try {
      const response = await fetch(`${API_URL}/api/auth/resend-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
        }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success("OTP Sent Again 📧");
        setTimer(30);
        setCanResend(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Unable to resend OTP");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-logo">💰 MoneyMate</div>

        <h2>Verify Email 📧</h2>

        <p>We've sent a 6-digit OTP to your email.</p>

        <div className="otp-container">
          {otp.padEnd(6).split("").map((digit, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              value={digit === " " ? "" : digit}
              ref={(el) => (inputRefs.current[index] = el)}
              onChange={(e) => {
                const value = e.target.value;

                if (!/^[0-9]?$/.test(value)) return;

                const otpArray = otp.padEnd(6).split("");
                otpArray[index] = value;

                const newOtp = otpArray.join("").trimEnd();
                setOtp(newOtp);

                if (value && index < 5) {
                  inputRefs.current[index + 1].focus();
                }
              }}
              onKeyDown={(e) => {
                if (e.key === "Backspace" && !otp[index] && index > 0) {
                  inputRefs.current[index - 1].focus();
                }
              }}
            />
          ))}
        </div>

        <button className="signup-btn" onClick={handleVerifyOTP}>
          Verify OTP
        </button>

        <div className="resend-section">
          {canResend ? (
            <p
              className="resend-link"
              onClick={handleResendOTP}
              style={{ cursor: "pointer" }}
            >
              Resend OTP
            </p>
          ) : (
            <p className="timer-text">
              Resend OTP in 00:{timer < 10 ? `0${timer}` : timer}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default VerifyOTP;