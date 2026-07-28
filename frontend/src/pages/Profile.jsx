import { FaEye, FaEyeSlash } from "react-icons/fa";
import "../styles/Profile.css";

  const [showPassword, setShowPassword] = useState(false);
function Profile() {

  const user = JSON.parse(localStorage.getItem("user"));


  const userEmail = user?.email || "guest";

  const income = JSON.parse(
    localStorage.getItem(`income_${userEmail}`)
  );

  const expense = JSON.parse(
    localStorage.getItem(`expense_${userEmail}`)
  );

  const transactions =
    JSON.parse(
      localStorage.getItem(`transactions_${userEmail}`)
    ) || [];

  const goals =
    JSON.parse(
      localStorage.getItem(`goals_${userEmail}`)
    ) || [];

  const totalIncome = income?.amount || 0;

  const totalExpense = expense?.amount || 0;

  const balance = totalIncome - totalExpense;

  return (

    <div className="profile-page">

      <div className="profile-card">

        <div className="profile-avatar">
          👤
        </div>

        <h2>{user?.fullName}</h2>

        <p>{user?.email}</p>

        <hr />
        <div className="profile-field">
  <label>Password</label>

  <div className="password-display">

    <input
      type="text"
      readOnly
      value={
        showPassword
          ? "Hidden for your security 🔒"
          : "••••••••••••"
      }
    />

    <button
      type="button"
      className="eye-btn"
      onClick={() =>
        setShowPassword(!showPassword)
      }
    >
      {showPassword ? <FaEyeSlash /> : <FaEye />}
    </button>

  </div>

  <button
    className="change-password-btn"
    onClick={() => navigate("/change-password")}
  >
    Change Password
  </button>

</div>

        <div className="profile-info">

          <div>
            <h4>Member Since</h4>
            <p>July 2026</p>
          </div>

          <div>
            <h4>Total Transactions</h4>
            <p>{transactions.length}</p>
          </div>

          <div>
            <h4>Current Balance</h4>
            <p>₹{balance}</p>
          </div>

          <div>
            <h4>Total Income</h4>
            <p>₹{totalIncome}</p>
          </div>

          <div>
            <h4>Total Expenses</h4>
            <p>₹{totalExpense}</p>
          </div>

          <div>
            <h4>Goals</h4>
            <p>{goals.length}</p>
          </div>

        </div>

      </div>

    </div>

  );

}

export default Profile;