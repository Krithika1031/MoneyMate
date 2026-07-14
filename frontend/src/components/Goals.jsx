import "../styles/Goals.css";
function Goals() {
  return (
    <section id="goals" className="goals-section">
      <div className="goals-left">
        <h2>Achieve Your Financial Goals</h2>

        <p>
          Create savings goals and track your progress in real time.
        </p>

        <div className="goal-progress">
  <h3>💻 Laptop Goal</h3>

  <div className="goal-progress-bar">
    <div className="goal-progress-fill"></div>
  </div>

  <p>₹32,000 saved of ₹60,000</p>
  <span>53% Complete</span>

  <p className="goal-tip">
    You're halfway there! Keep saving.
  </p>
</div>
</div>

      <div className="goals-right">
        <div className="goal-chip">📱 New Phone</div>
        <div className="goal-chip">✈️ Dream Vacation</div>
        <div className="goal-chip">🏠 House</div>
        <div className="goal-chip">💍 Wedding Fund</div>
        <div className="goal-chip">🎓 Education</div>
      </div>
    </section>
  );
}

export default Goals;