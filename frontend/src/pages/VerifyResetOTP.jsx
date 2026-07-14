import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/VerifyOTP.css";
import { toast } from "sonner";

function VerifyResetOTP() {

  const navigate = useNavigate();

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const email = localStorage.getItem("email");

  const handleVerifyOTP = async () => {
    if (!otp.trim()) {
  toast.error("Please enter the OTP.");
  return;
}

if (otp.length !== 6) {
  toast.error("OTP must be 6 digits.");
  return;
}
setLoading(true);

    try {

      const response = await fetch(
        "http://localhost:5000/api/auth/verify-reset-otp",
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

        toast.success("OTP verified successfully! ✅");

setTimeout(() => {
  navigate("/reset-password");
}, 1000);

      }

      else {

        toast.error(data.message)

      }

    }

    catch (error) {

      console.log(error);

      toast.error("Something went wrong. Please try again.");

    }
    finally {
  setLoading(false);
}

  };

  return (

    <div className="auth-container">

      <div className="auth-card">

        <h2>Verify Reset OTP 📧</h2>

        <p>Enter the OTP sent to your email.</p>
        <form
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          handleVerifyOTP();
        }}
      >

        <input
          type="text"
          maxLength="6"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e)=>setOtp(e.target.value)}
        />
<button
  type="submit"
  className="signup-btn"
  disabled={loading}
>
  {loading ? "Verifying..." : "Verify OTP"}
</button>
</form>

      </div>

    </div>

  );

}

export default VerifyResetOTP;