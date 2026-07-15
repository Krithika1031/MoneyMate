import "../styles/LandingPage.css";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

function LandingPage() {
  const navigate = useNavigate();
  return (
    <>
    <Navbar />

    <section className="hero">
      <div className="hero-left">
        <h1>Know where your money goes.</h1>

        <p>
  Track expenses, achieve goals, and build better
  financial habits with
  <span className="brand-highlight"> MoneyMate</span>.
</p>

        <div className="hero-buttons">
         <button
  className="primary-btn"
  onClick={() => navigate("/signup")}
>
  Get Started
</button>
          <button
  className="secondary-btn"
  onClick={() => navigate("/login")}
>
  Login
</button>
        </div>
       <div className="trust-line">
  <span>✓ Goal Tracking</span>
  <span>✓ Smart Insights</span>
  <span>✓ Expense Management</span>
</div>
      </div>
      <div className="hero-image">
    <div className="dashboard-preview">
        <h3>📊 MoneyMate Preview</h3>

        <div className="stat">
            <span>Income</span>
            <strong>₹25,000</strong>
        </div>

        <div className="stat">
            <span>Expenses</span>
            <strong>₹18,500</strong>
        </div>

        <div className="stat">
            <span>Savings</span>
            <strong>₹6,500</strong>
        </div>
        <p className="goal-label">🎯 Saving for Laptop</p>
        <div className="preview-progress-bar">
    <div className="preview-progress-fill"></div>
</div>
        <p className="goal-text">53% Goal Progress</p>
    </div>
</div>
    </section>
    </>
  );
}

export default LandingPage;