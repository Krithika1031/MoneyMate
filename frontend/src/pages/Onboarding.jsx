import { useState } from "react";
import "../styles/Onboarding.css";

function Onboarding() {
  const [step, setStep] = useState(1);

const [currency, setCurrency] = useState("");
const [userType, setUserType] = useState("");
const [income, setIncome] = useState("");
const [goal, setGoal] = useState("");

  return (
    <div className="onboarding-container">
      <div className="onboarding-card">

        {step === 1 && (
          <>
            <h1>Welcome to MoneyMate 🎉</h1>

            <p>
              Let's personalize your experience and help you
              build better financial habits.
            </p>

            <button
              className="next-btn"
              onClick={() => setStep(2)}
            >
              Get Started
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <h1>Choose Your Currency</h1>

            <div className="currency-options">
              <label className="currency-option">
               <input
  type="radio"
  name="currency"
  value="INR"
  onChange={(e) => setCurrency(e.target.value)}
/>
₹ Indian Rupee (INR)
              </label>

              <label className="currency-option">
               <input
  type="radio"
  name="currency"
  value="USD"
  onChange={(e) => setCurrency(e.target.value)}
/>
$ US Dollar (USD)
              </label>

              <label className="currency-option">
               <input
  type="radio"
  name="currency"
  value="EUR"
  onChange={(e) => setCurrency(e.target.value)}
/>
€ Euro (EUR)
              </label>

              <label className="currency-option">
                <input
  type="radio"
  name="currency"
  value="GBP"
  onChange={(e) => setCurrency(e.target.value)}
/>
  £ British Pound (GBP)
              </label>
            </div>

            <button
  className="next-btn"
  onClick={() => setStep(3)}
>
  Continue
</button>
          </>
        )}
        {step === 3 && (
  <>
    <h1>What describes you best?</h1>

    <div className="currency-options">

      <label className="currency-option">
        <input
          type="radio"
          name="userType"
          value="Student"
          onChange={(e) => setUserType(e.target.value)}
        />
        🎓 Student
      </label>

      <label className="currency-option">
        <input
          type="radio"
          name="userType"
          value="Salaried"
          onChange={(e) => setUserType(e.target.value)}
        />
        💼 Salaried Employee
      </label>

      <label className="currency-option">
        <input
          type="radio"
          name="userType"
          value="Freelancer"
          onChange={(e) => setUserType(e.target.value)}
        />
        🚀 Freelancer
      </label>

      <label className="currency-option">
        <input
          type="radio"
          name="userType"
          value="Business"
          onChange={(e) => setUserType(e.target.value)}
        />
        🏢 Business Owner
      </label>

    </div>

    <button className="next-btn" onClick={() => setStep(4)}>
      Continue
    </button>
  </>
)}
{step === 4 && (
  <>
    <h1>Monthly Income</h1>

<p>Enter your approximate monthly income.</p>

<input
  type="number"
  placeholder="Enter amount"
  value={income}
  onChange={(e) => setIncome(e.target.value)}
  className="income-input"
/>

<button className="next-btn" onClick={() => setStep(5)}>
  Continue
</button>

<button
  className="skip-btn"
  onClick={() => {
    setIncome("Not Provided");
    setStep(5);
  }}
>
  Skip for now
</button>
</>
)}

{step === 5 && (
  <>
    <h1>Would you like to set a savings goal?</h1>

    <div className="currency-options">

      <label className="currency-option">
        <input
          type="radio"
          name="goal"
          value="Laptop"
          onChange={(e) => setGoal(e.target.value)}
        />
        💻 Laptop
      </label>

      <label className="currency-option">
        <input
          type="radio"
          name="goal"
          value="Phone"
          onChange={(e) => setGoal(e.target.value)}
        />
        📱 Phone
      </label>

      <label className="currency-option">
        <input
          type="radio"
          name="goal"
          value="Vacation"
          onChange={(e) => setGoal(e.target.value)}
        />
        ✈️ Vacation
      </label>

      <label className="currency-option">
        <input
          type="radio"
          name="goal"
          value="Custom"
          onChange={(e) => setGoal(e.target.value)}
        />
        🎯 Custom Goal
      </label>

    </div>

    <button className="next-btn" onClick={() => setStep(6)}>
      Continue
    </button>
    <button
  className="skip-btn"
  onClick={() => {
    setGoal("Not Set");
    setStep(6);
  }}
>
  Skip for now
</button>
  </>
)}
{step === 6 && (
  <>
    <h1>You're All Set 🎉</h1>

    <p>
      Welcome to MoneyMate. <br></br>
      You're ready to start tracking your finances <br></br> and achieve your goals.
    </p>

    <div className="summary-box">
      <p><strong> 💰Currency:</strong> {currency}</p>
      <p><strong>💼Profile:</strong> {userType}</p>
      <p>
  <strong>📈Income:</strong>{" "}
  {income || "Not Provided"}
</p>

<p>
  <strong>🎯Goal:</strong>{" "}
  {goal || "Not Set"}
</p>
    </div>

    <button
      className="next-btn"
      onClick={() => alert("Dashboard Coming Next 🚀")}
    >
      Go To Dashboard
    </button>
  </>
)}

      </div>
    </div>
  );
}

export default Onboarding;