import "../styles/LandingPage.css";

function LandingPage() {
  return (
    <>
    <nav className="navbar">
  <div className="logo">💰 MoneyMate</div>

  <div className="navbar-right">
    <div className="nav-links">
      <a href="#">Features</a>
      <a href="#">Goals</a>
      <a href="#">About</a>
    </div>

    <button className="nav-btn">
      Login
    </button>
  </div>
</nav>

    <section className="hero">
      <div className="hero-left">
        <h1>Know where your money goes.</h1>

        <p>
  Track expenses, achieve goals, and build better
  financial habits with
  <span className="brand-highlight"> MoneyMate</span>.
</p>

        <div className="hero-buttons">
          <button className="primary-btn">Get Started</button>
          <button className="secondary-btn">Login</button>
        </div>
       <div className="trust-line">
  <span>✓ Goal Tracking</span>
  <span>✓ Smart Insights</span>
  <span>✓ Expense Management</span>
</div>
      </div>
      <div class="hero-image">
    <div class="dashboard-preview">
        <h3>📊 MoneyMate Preview</h3>

        <div class="stat">
            <span>Income</span>
            <strong>₹25,000</strong>
        </div>

        <div class="stat">
            <span>Expenses</span>
            <strong>₹18,500</strong>
        </div>

        <div class="stat">
            <span>Savings</span>
            <strong>₹6,500</strong>
        </div>
        <p className="goal-label">🎯 Saving for Laptop</p>
        <div class="progress-bar">
            <div class="progress-fill"></div>
        </div>
        <p className="goal-text">53% Goal Progress</p>
    </div>
</div>
    </section>
    </>
  );
}

export default LandingPage;