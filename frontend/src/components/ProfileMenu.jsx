import "./../styles/ProfileMenu.css";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

function ProfileMenu() {
    const navigate = useNavigate();

  return (

    <div className="profile-menu">

      <button
onClick={()=>{
navigate("/profile");
}}
>

👤 My Profile

</button>

      <button
onClick={()=>{
navigate("/settings");
}}
>

⚙ Settings

</button>

      <button
onClick={()=>{
navigate("/change-password");
}}
>

🔒 Change Password

</button>

      <button
className="logout-btn"

onClick={() => {

  localStorage.removeItem("token");
  localStorage.removeItem("user");

  toast.success("Logged out successfully 👋");

  setTimeout(() => {
    navigate("/login", { replace: true });
  }, 700);

}}

>

🚪 Logout

</button>

    </div>

  );

}

export default ProfileMenu;