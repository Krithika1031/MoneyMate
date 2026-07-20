import axios from "axios";
import { API_URL } from "../config";
import { useState } from "react";
import "../styles/ChangePassword.css";

function ChangePassword() {

  const [currentPassword, setCurrentPassword] =
    useState("");

  const [newPassword, setNewPassword] =
    useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const handleChangePassword = async () => {
  if (!currentPassword || !newPassword || !confirmPassword) {
    alert("Please fill all fields");
    return;
  }

  if (newPassword !== confirmPassword) {
    alert("New passwords do not match");
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

    alert(res.data.message);

    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");

  } catch (error) {
    alert(
      error.response?.data?.message || "Something went wrong"
    );
  }
};

  return (

    <div className="change-password-page">

      <div className="change-password-card">

        <h2>🔒 Change Password</h2>

        <input
          type="password"
          placeholder="Current Password"
          value={currentPassword}
          onChange={(e)=>
            setCurrentPassword(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e)=>
            setNewPassword(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e)=>
            setConfirmPassword(e.target.value)
          }
        />

       <button
  className="signup-btn"
  onClick={handleChangePassword}
>
  Update Password
</button>

      </div>

    </div>

  );

}

export default ChangePassword;