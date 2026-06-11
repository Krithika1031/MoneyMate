import "../styles/Dashboard.css";

function Dashboard() {
  return (
    <div className="dashboard">

      <div className="dashboard-header">
        <h1>Welcome Back, Krithika 👋</h1>
<p>Track your money smarter today.</p>
        <div className="quick-actions">
  <button>+ Income</button>
  <button>+ Expense</button>
  <button>+ Goal</button>
</div>
      </div>

      <div className="summary-cards">

        <div className="summary-card income-card">
          <h3>Total Income</h3>
          <h2>₹25,000</h2>
        </div>

        <div className="summary-card expense-card">
          <h3>Total Expenses</h3>
          <h2>₹18,500</h2>
        </div>

        <div className="summary-card savings-card">
          <h3>Total Savings</h3>
          <h2>₹6,500</h2>
        </div>

      </div>

      <div className="dashboard-content">
        <div className="transactions-card">
          <h2>Recent Transactions</h2>

          <div className="transaction">
            <span>🍔 Food</span>
            <span>- ₹250</span>
          </div>

          <div className="transaction">
            <span>🚕 Travel</span>
            <span>- ₹500</span>
          </div>

          <div className="transaction">
            <span>🛍 Shopping</span>
            <span>- ₹1200</span>
          </div>

        </div>
        <div className="goal-progress-card">

          <h2>Laptop Goal 🎯</h2>

          <div className="progress-bar">
            <div className="progress-fill"></div>
          </div>

          <p>53% Complete</p>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;