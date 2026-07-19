import axios from "axios";
import "../styles/Signup.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { API_URL } from "../config";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { motion } from "framer-motion";
import { API_URL } from "../config";

function Signup() {
  const navigate = useNavigate();

  // States
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [errors, setErrors] = useState({});
  const [passwordStrength, setPasswordStrength] = useState("");
  const passwordChecks = {
  length: password.length >= 8,
  uppercase: /[A-Z]/.test(password),
  lowercase: /[a-z]/.test(password),
  number: /[0-9]/.test(password),
  special: /[^A-Za-z0-9]/.test(password),
};
  const [validEmail, setValidEmail] = useState(false);
const [validPassword, setValidPassword] = useState(false);
const [validConfirmPassword, setValidConfirmPassword] = useState(false);

  // Validation
  const validateForm = () => {
    let newErrors = {};

    // Full Name
    if (!fullName.trim()) {
      newErrors.fullName = "Full Name is required";
    }

    // Email Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const validateEmail = () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email.trim()) {
    setErrors((prev) => ({
      ...prev,
      email: "Email is required",
    }));

    setValidEmail(false);
  }

  else if (!emailRegex.test(email)) {
    setErrors((prev) => ({
      ...prev,
      email: "Enter a valid email address",
    }));

    setValidEmail(false);
  }

  else {

    setErrors((prev) => ({
      ...prev,
      email: "",
    }));

    setValidEmail(true);
    

  }
};
    // Password
    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 8) {
      newErrors.password =
        "Password must contain at least 8 characters";
    }

    // Confirm Password
    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword =
        "Passwords do not match";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };
  const validateName = () => {
  if (!fullName.trim()) {
    setErrors((prev) => ({
      ...prev,
      fullName: "Full Name is required",
    }));
  } else {
    setErrors((prev) => ({
      ...prev,
      fullName: "",
    }));
  }
};

const validateEmail = () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email.trim()) {
    setErrors((prev) => ({
      ...prev,
      email: "Email is required",
    }));
  } else if (!emailRegex.test(email)) {
    setErrors((prev) => ({
      ...prev,
      email: "Enter a valid email address",
    }));
  } else {
  setErrors((prev) => ({
    ...prev,
    email: "",
  }));

  setValidEmail(true);

  toast.success("Email is valid ✅");
}

};

const validatePassword = () => {
  if (!password) {
    setErrors((prev) => ({
      ...prev,
      password: "Password is required",
    }));
  } else if (password.length < 8) {
    setErrors((prev) => ({
      ...prev,
      password:
        "Password must contain at least 8 characters",
    }));
  } else {
    setErrors((prev) => ({
      ...prev,
      password: "",
    }));
  }
};

const validateConfirmPassword = () => {
  if (!confirmPassword) {
    setErrors((prev) => ({
      ...prev,
      confirmPassword:
        "Please confirm your password",
    }));
  } else if (password !== confirmPassword) {
    setErrors((prev) => ({
      ...prev,
      confirmPassword:
        "Passwords do not match",
    }));
  } else {
    setErrors((prev) => ({
      ...prev,
      confirmPassword: "",
    }));
  }
};

  // Signup button
 const handleSignup = async () => {
  setLoading(true);


  if (!validateForm()) {
    toast.error("Validation Failed");
    return;
  }

  try {

    const response = await fetch(
      `${API_URL}/api/auth/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName,
          email,
          password,
        }),
      }
    );

    const data = await response.json();

    if (data.success) {

  toast.success("Account created successfully 🎉");

  setTimeout(() => {
    navigate("/login");
  }, 700);

    } else {

      toast.error(
    data.message || "Unable to create account."
);

    }

  } catch (error) {

    toast.error("ERROR:");

    toast.error(
"Something went wrong. Please try again."
);

  }
finally{
    setLoading(false);
}
};

  const checkPasswordStrength = (value) => {
  let strength = 0;

  if (value.length >= 8) strength++;

  if (/[A-Z]/.test(value)) strength++;

  if (/[a-z]/.test(value)) strength++;

  if (/[0-9]/.test(value)) strength++;

  if (/[^A-Za-z0-9]/.test(value)) strength++;

  if (strength <= 2)
    setPasswordStrength("Weak");

  else if (strength <= 4)
    setPasswordStrength("Medium");

  else
    setPasswordStrength("Strong");
};
  return (
    <motion.div

className="auth-container"

initial={{opacity:0}}

animate={{opacity:1}}

transition={{duration:.5}}

>
      <div className="auth-card">
         <div className="auth-logo">
    💰 MoneyMate
</div>
        <h2>Create Account 🚀</h2>

        <p>Start your financial journey today.</p>

        {/* Full Name */}

        <input
          className={errors.fullName ? "input-error" : ""}
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          onBlur={validateName}
        />

        {errors.fullName && (
          <p className="error-text">⚠ {errors.fullName}</p>
        )}

        {/* Email */}

       <div className="input-wrapper">

<input
  className={errors.email ? "input-error" : ""}
  type="email"
  placeholder="Email Address"
  value={email}
  onChange={(e)=>setEmail(e.target.value)}
  onBlur={validateEmail}
/>

{validEmail && (
    <span className="success-icon">
        ✔
    </span>
)}

</div>

        {errors.email && (
          <p className="error-text">⚠ {errors.email}</p>
        )}

        {/* Password */}

        <div className="password-field">

          <input
            className={errors.password ? "input-error" : ""}
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => {
  setPassword(e.target.value);
  checkPasswordStrength(e.target.value);
}}
            onBlur={validatePassword}
          />

          <span
            className="toggle-password"
            onClick={() => setShowPassword(!showPassword)}
          >
           {showPassword ? <FiEyeOff /> : <FiEye />}
          </span>

        </div>

        {errors.password && (
          <p className="error-text">
            ⚠ {errors.password}
          </p>
        )}
        {password && (
  <>
    <div className="strength-container">

      <div
        className={`strength-bar ${passwordStrength.toLowerCase()}`}
      ></div>

      <p
        className={`strength-text ${passwordStrength.toLowerCase()}`}
      >
        {passwordStrength} Password
      </p>

    </div>

    <div className="password-checklist">

      <p className={passwordChecks.length ? "valid" : "invalid"}>
        {passwordChecks.length ? "✔" : "✖"} At least 8 characters
      </p>

      <p className={passwordChecks.uppercase ? "valid" : "invalid"}>
        {passwordChecks.uppercase ? "✔" : "✖"} One uppercase letter
      </p>

      <p className={passwordChecks.lowercase ? "valid" : "invalid"}>
        {passwordChecks.lowercase ? "✔" : "✖"} One lowercase letter
      </p>

      <p className={passwordChecks.number ? "valid" : "invalid"}>
        {passwordChecks.number ? "✔" : "✖"} One number
      </p>

      <p className={passwordChecks.special ? "valid" : "invalid"}>
        {passwordChecks.special ? "✔" : "✖"} One special character
      </p>

    </div>
  </>
)}
        {/* Confirm Password */}

        <div className="password-field">

          <input
            className={
              errors.confirmPassword ? "input-error" : ""
            }
            type={
              showConfirmPassword
                ? "text"
                : "password"
            }
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) =>
              setConfirmPassword(e.target.value)
            }
            onBlur={validateConfirmPassword}
          />

          <span
            className="toggle-password"
            onClick={() =>
              setShowConfirmPassword(
                !showConfirmPassword
              )
            }
          >
            {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
          </span>

        </div>

        {errors.confirmPassword && (
          <p className="error-text">
            ⚠ {errors.confirmPassword}
          </p>
        )}

        <button
  type="button"
  className="signup-btn"
  onClick={handleSignup}
  disabled={loading}
>

{loading ? (

<>
<div className="spinner"></div>

<span>Creating Account...</span>
</>

) : (

"Sign Up"

)}

</button>
<p className="bottom-link">
Already have an account?

<span onClick={()=>navigate("/login")}>
 Login
</span>

</p>

      </div>
    </motion.div>
  );
}

export default Signup;