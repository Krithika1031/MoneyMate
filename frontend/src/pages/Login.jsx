import "../styles/Login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");

const handleLogin = async () => {

  console.log("Login function called");

  if (!email.trim()) {
  toast.error("Please enter your email.");
  return;
}

if (!password.trim()) {
  toast.error("Please enter your password.");
  return;
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if (!emailRegex.test(email)) {
  toast.error("Please enter a valid email address.");
  return;
}
  setLoading(true);
  try {
    const res = await axios.post(
      "http://localhost:5000/api/auth/login",
      {
        email,
        password,
      }
    );
    console.log("FULL RESPONSE:", res.data);
console.log("USER:", res.data.user);
    
    localStorage.setItem("token", res.data.token);

    localStorage.setItem(
      "user",
      JSON.stringify(res.data.user)
    );

   toast.success("Login Successful 🎉");

setTimeout(() => {
  navigate("/dashboard");
}, 1000);
  } catch (err) {

    toast.error(
  err.response?.data?.message || "Login Failed"
  
);

  }
  finally {
    setLoading(false);
}
};

  return (
    <>
    <div className="auth-container">

      <div className="auth-card">

        <h2>Welcome Back 👋</h2>

        <p>Login to continue managing your finances.</p>

        <form
  onSubmit={(e) => {
    e.preventDefault();
    handleLogin();
  }}
>

          <input
  type="email"
  placeholder="Email Address"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>

         <input
  type="password"
  placeholder="Password"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
/>

<p
  className="forgot-password"
  onClick={() => navigate("/forgot-password")}
>
  Forgot Password?
</p>

<button
  type="submit"
  className="login-btn"
  disabled={loading}
>
  {loading ? "Logging in..." : "Login"}
</button>
        </form>

      </div>

    </div>
    </>
  );
}

export default Login;