import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";
import { toast } from "sonner";
import { API_URL } from "../config";

function ResetPassword() {

  const navigate = useNavigate();

  const email = localStorage.getItem("email");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async () => {


    if (!password.trim()) {
  toast.error("Please enter a new password.");
  return;
}

if (password.length < 8) {
  toast.error("Password must be at least 8 characters.");
  return;
}

if (!confirmPassword.trim()) {
  toast.error("Please confirm your password.");
  return;
}

if (password !== confirmPassword) {
  toast.error("Passwords do not match.");
  return;
}
    setLoading(true);
    try {

      const response = await fetch(
        `${API_URL}/api/auth/...`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {

       toast.success("Password updated successfully! 🎉");

localStorage.removeItem("email");

setTimeout(() => {
  navigate("/login");
}, 1000);
      }

      else {

        toast.error(data.message)

      }

    }

    catch (error) {

      toast.error(error);

      toast.error("Something went wrong. Please try again.");

    }
    finally {
  setLoading(false);
}

  };

  return (

    <div className="auth-container">

      <div className="auth-card">
          <div className="auth-logo">
    💰 MoneyMate
</div>
        <h2>Create New Password 🔒</h2>

        <p>Enter your new password.</p>
        <form
  noValidate
  onSubmit={(e) => {
    e.preventDefault();
    handleResetPassword();
  }}
>

        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
        />

        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e)=>setConfirmPassword(e.target.value)}
        />

        <button
  type="submit"
  className="signup-btn"
  disabled={loading}
>
  {loading ? (
<>
<div className="spinner"></div>

<span>Updating...</span>
</>
) : (
"Update Password"
)}
</button>
         
        </form> 
      </div>

    </div>

  );

}

export default ResetPassword;