import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/ForgotPassword.css";
import { toast } from "sonner";
function ForgotPassword() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendOTP = async () => {

   if (!email.trim()) {
  toast.error("Please enter your email.");
  return;
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if (!emailRegex.test(email)) {
  toast.error("Please enter a valid email address.");
  return;
}
    setLoading(true);
    try {

      const response = await fetch(
        "http://localhost:5000/api/auth/forgot-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {

        localStorage.setItem("email", email);

        toast.success("OTP sent successfully! 📧");

setTimeout(() => {
  navigate("/verify-reset-otp");
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

  <form
    noValidate
    onSubmit={(e) => {
      e.preventDefault();
      handleSendOTP();
    }}
  >

        <h2>Forgot Password 🔒</h2>

        <p>Enter your registered email.</p>

        <input
  type="email"
  placeholder="Enter Email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>

        <button
  type="submit"
  className="signup-btn"
  disabled={loading}
>
  {loading ? "Sending OTP..." : "Send OTP"}
</button>
        </form>

      </div>

    </div>

  );

}

export default ForgotPassword;