import "../styles/HowItWorks.css";
function HowItWorks() {
  return (
    <section id="how-it-works" className="how-section">

      <h2>How MoneyMate Works</h2>

      <p className="how-subtitle">
        Start tracking your finances in four simple steps.
      </p>

      <div className="steps-container">

        <div className="step-card">
          <div className="step-number">1</div>
          <h3>Add Income</h3>
          <p>Add salary, pocket money, business income and more.</p>
        </div>

        <div className="step-card">
          <div className="step-number">2</div>
          <h3>Track Expenses</h3>
          <p>Record daily spending in just a few seconds.</p>
        </div>

        <div className="step-card">
          <div className="step-number">3</div>
          <h3>Set Goals</h3>
          <p>Create savings goals and monitor progress.</p>
        </div>

        <div className="step-card">
          <div className="step-number">4</div>
          <h3>Grow Your Savings</h3>
          <p>Build stronger financial habits every day.</p>
        </div>

      </div>

    </section>
  );
}

export default HowItWorks;