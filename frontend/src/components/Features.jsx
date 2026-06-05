import "../styles/Features.css";
function Features() {
  return (
    <section className="features-section">
      <h2>Why Choose MoneyMate?</h2>

      <p className="features-subtitle">
        Everything you need to build better financial habits.
      </p>

      <div className="features-grid">

        <div className="feature-card">
          <h3>🎯 Goal Tracking</h3>
          <p>Save for laptops, vacations, gold, homes and more.</p>
        </div>

        <div className="feature-card">
          <h3>💡 Smart Insights</h3>
          <p>Understand your spending patterns instantly.</p>
        </div>

        <div className="feature-card">
          <h3>📊 Reports & Analytics</h3>
          <p>Visualize where every rupee goes.</p>
        </div>

        <div className="feature-card">
          <h3>🔥 Daily Streaks</h3>
          <p>Build consistency and stronger money habits.</p>
        </div>

      </div>
    </section>
  );
}

export default Features;