import axios from "axios";
import { API_URL } from "../config";
import { useState } from "react";
import "../styles/ChangePassword.css";
import { toast } from "sonner";

function ChangePassword() {

  const [currentPassword, setCurrentPassword] =
    useState("");

  const [newPassword, setNewPassword] =
    useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const handleChangePassword = async () => {
  if (!currentPassword || !newPassword || !confirmPassword) {
    toast.error("Please fill all the fields.");
    return;
  }

  if (newPassword !== confirmPassword) {
    toast.error("New password and confirm password do not match.");
    return;
  }

  try {
    const token = localStorage.getItem("token");

    const res = await axios.put(
      `${API_URL}/auth/change-password`,
      {
        currentPassword,
        newPassword,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    toast.success("Password updated successfully!");

    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");

  } catch (error) {
    toast.error(
  error.response?.data?.message || "Something went wrong. Please try again."
);
  }
};

  return (

    <div className="change-password-page">

  <form
    className="change-password-card"
    onSubmit={(e) => {
      e.preventDefault();
      handleChangePassword();
    }}
  > 
       <h2>Change password 🔐</h2>

        <input
          type="password"
          placeholder="Current Password"
          autoComplete="current-password"
          value={currentPassword}
          onChange={(e)=>
            setCurrentPassword(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="New Password"
          autoComplete="new-password"
          value={newPassword}
          onChange={(e)=>
            setNewPassword(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Confirm Password"
          autoComplete="current-password"
          value={confirmPassword}
          onChange={(e)=>
            setConfirmPassword(e.target.value)
          }
        />

       <button
      type="submit"
      className="signup-btn"
    >
      Update Password
    </button>

  </form>

</div>

  );

}

export default ChangePassword;