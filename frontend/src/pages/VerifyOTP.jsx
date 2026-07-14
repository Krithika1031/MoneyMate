import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/VerifyOTP.css";
import { toast } from "sonner";

function VerifyOTP() {

  const [otp, setOtp] = useState("");

  const navigate = useNavigate();

  const email = localStorage.getItem("email");

  const handleVerifyOTP = async () => {

    try {

      const response = await fetch(
        "http://localhost:5000/api/auth/verify-otp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            otp,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {

        toast.success("OTP Verified Successfully ✅")

        localStorage.removeItem("email");

        navigate("/login");

      } else {

        toast.error(data.message)

      }

    } catch (error) {

      console.log(error);

      toast.error("Server Error")

    }

  };

  return (
    <div className="auth-container">
      <div className="auth-card">

        <h2>Verify Email 📧</h2>

        <p>We've sent a 6-digit OTP to your email.</p>

        <input
          type="text"
          maxLength="6"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />

        <button
          className="signup-btn"
          onClick={handleVerifyOTP}
        >
          Verify OTP
        </button>

      </div>
    </div>
  );
}

export default VerifyOTP;