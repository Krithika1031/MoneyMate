import { useState, useEffect } from "react";
import jsPDF from "jspdf";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "../styles/Dashboard.css";
import ProfileMenu from "../components/ProfileMenu";
import { toast } from "sonner";

function Dashboard() {
  const [income, setIncome] = useState(0);
  const [showIncomeForm, setShowIncomeForm] = useState(false);
  const [incomeAmount, setIncomeAmount] = useState("");
  const [incomeSource, setIncomeSource] = useState("");
  const [expense, setExpense] = useState(0);
  const [goals, setGoals] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [showExpenseForm, setShowExpenseForm] = useState(false);
  const [expenseAmount, setExpenseAmount] = useState("");
  const [expenseSource, setExpenseSource] = useState("");
  const [showGoalForm, setShowGoalForm] = useState(false);
  const [goalName, setGoalName] = useState("");
  const [goalTarget, setGoalTarget] = useState("");
  const [savingAmount, setSavingAmount] = useState("");
  const [showSavingForm, setShowSavingForm] = useState(null);
  const [showAllTransactions, setShowAllTransactions] = useState(false);
  const [editingGoal, setEditingGoal] = useState(null);
  const [transactionFilter, setTransactionFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const currency = localStorage.getItem(`currency_${user.email}`) || "INR";

const userEmail = user?.email || "guest";
  const incomeKey = `income_${userEmail}`;
  const expenseKey = `expense_${userEmail}`;
  const goalKey = `goals_${userEmail}`;
  const transactionKey = `transactions_${userEmail}`;
 
  useEffect(() => {
    const savedIncome = JSON.parse(localStorage.getItem(incomeKey));
    const savedExpense = JSON.parse(localStorage.getItem(expenseKey));
    const savedGoals = JSON.parse(localStorage.getItem(goalKey));
    const savedTransactions = JSON.parse(localStorage.getItem(transactionKey));
    if (savedTransactions) setTransactions(savedTransactions);
    if (savedIncome) setIncome(savedIncome.amount);
    if (savedExpense) setExpense(savedExpense.amount);
    if (savedGoals) setGoals(savedGoals);
  }, [incomeKey, expenseKey, goalKey, transactionKey]);

const totalSavings =
goals.reduce(
  (sum, goal) =>
    sum + goal.saved,
  0
);

const balance =
income -
expense -
totalSavings;
const downloadPDF = () => {
  const doc = new jsPDF();
  const currency = "Rs.";

  doc.setFontSize(18);
  doc.text("MoneyMate Transaction Report", 20, 20);

  doc.setFontSize(12);

  let y = 40;

  // Table Header
  doc.text("Date", 20, y);
  doc.text("Type", 60, y);
  doc.text("Source", 100, y);
  doc.text("Amount", 170, y);

  y += 10;
  doc.line(20, y - 5, 190, y - 5);

  // Transactions
  transactions.forEach((t) => {
    doc.text(String(t.date), 20, y);
    doc.text(String(t.type), 60, y);
    doc.text(String(t.source), 100, y);
    doc.text(`${currency} ${t.amount}`, 170, y);

    y += 10;

    // Add new page if required
    if (y > 270) {
      doc.addPage();
      y = 20;
    }
  });

  y += 10;
  doc.line(20, y - 5, 190, y - 5);

  y += 10;

  const incomeCount = transactions.filter(
    (t) => t.type === "Income"
  ).length;

  const expenseCount = transactions.filter(
    (t) => t.type === "Expense"
  ).length;

  const savingCount = transactions.filter(
    (t) => t.type === "Saving"
  ).length;

  // Analytics Summary
  doc.setFontSize(16);
  doc.text("Analytics Summary", 20, y);

  y += 15;
  doc.setFontSize(12);

  doc.text(`Total Transactions: ${transactions.length}`, 20, y);
  y += 10;

  doc.text(`Income Entries: ${incomeCount}`, 20, y);
  y += 10;

  doc.text(`Expense Entries: ${expenseCount}`, 20, y);
  y += 10;

  doc.text(`Saving Entries: ${savingCount}`, 20, y);

  y += 15;

  // Monthly Summary
  doc.setFontSize(16);
  doc.text("Monthly Summary", 20, y);

  y += 15;
  doc.setFontSize(12);

  doc.text(`Total Income: ${currency} ${income}`, 20, y);
  y += 10;

  doc.text(`Total Expense: ${currency} ${expense}`, 20, y);
  y += 10;

  doc.text(`Total Savings: ${currency} ${totalSavings}`, 20, y);
  y += 10;

  doc.text(`Current Balance: ${currency} ${balance}`, 20, y);

  y += 20;

  // Insights
  doc.setFontSize(16);
  doc.text("Insights", 20, y);

  y += 15;
  doc.setFontSize(12);

  doc.text(
    `Highest Expense: ${currency} ${
      highestExpense ? highestExpense.amount : 0
    }`,
    20,
    y
  );

  y += 10;

  doc.text(`Active Goals: ${activeGoals}`, 20, y);

  y += 10;

  doc.text(`Savings Rate: ${savingsRate}%`, 20, y);

  y += 20;

  // Goals
  doc.setFontSize(16);
  doc.text("Goals", 20, y);

  y += 15;

  goals.forEach((goal) => {
    doc.setFontSize(12);

    doc.text(
      `${goal.name} | Saved ${currency} ${goal.saved} | Target ${currency} ${goal.target}`,
      20,
      y
    );

    y += 10;

    if (y > 270) {
      doc.addPage();
      y = 20;
    }
  });

  const today = new Date().toISOString().split("T")[0];
  doc.save(`MoneyMate_Report_${today}.pdf`);
};
const filteredTransactions =
transactions.filter((item) => {

  const matchesFilter =
    transactionFilter === "All" ||
    item.type === transactionFilter;

  const matchesSearch =
    item.source
      .toLowerCase()
      .includes(
        searchTerm.toLowerCase()
      );
  return (
    matchesFilter &&
    matchesSearch
  );

});
  const deleteTransaction = (transactionToDelete) => {
  let newIncome = income;
  let newExpense = expense;
  if (transactionToDelete.type === "Income") {
    newIncome =
      income - Number(transactionToDelete.amount);
    setIncome(newIncome);
    localStorage.setItem(
      incomeKey,
      JSON.stringify({
        amount: newIncome,
      })
    );
  }
  if (transactionToDelete.type === "Expense") {
    newExpense =
      expense - Number(transactionToDelete.amount);
    setExpense(newExpense);
    localStorage.setItem(
      expenseKey,
      JSON.stringify({
        amount: newExpense,
      })
    );
  }
 const updatedTransactions =
  transactions.filter(
    (t) =>
      !(
        t.source === transactionToDelete.source &&
        t.amount === transactionToDelete.amount &&
        t.type === transactionToDelete.type &&
        t.date === transactionToDelete.date
      )
  );
  setTransactions(updatedTransactions);
localStorage.setItem(
  transactionKey,
  JSON.stringify(updatedTransactions)
);
};
const incomeCount =
  transactions.filter(
    (t) => t.type === "Income"
  ).length;

const expenseCount =
  transactions.filter(
    (t) => t.type === "Expense"
  ).length;

const savingCount =
  transactions.filter(
    (t) => t.type === "Saving"
  ).length;
  const expenses =
  transactions.filter(
    (t) => t.type === "Expense"
  );

const highestExpense =
  expenses.length > 0
    ? expenses.reduce(
        (max, item) =>
          Number(item.amount) >
          Number(max.amount)
            ? item
            : max
      )
    : null;
    const savingsRate =
  income > 0
    ? Math.round(
        (totalSavings / income) * 100
      )
    : 0;
    const activeGoals =
  goals.length;
  const chartData = [
  {
    name: "Income",
    amount: income,
  },
  {
    name: "Expense",
    amount: expense,
  },
  {
    name: "Savings",
    amount: totalSavings,
  },
  {
    name: "Balance",
    amount: balance,
  },
];
  return (
    <div className="dashboard-container">

      <div className="dashboard-header">

  <div className="header-left">

    <h1>
Welcome Back, {user?.fullName.split(" ")[0]} 👋
</h1>

    <p>
      Track your money smarter today.
    </p>

  </div>

  <div className="header-right">

    <button className="notification-btn">
      🔔
    </button>

    <button
  className="profile-btn"
  onClick={() =>
    setShowProfileMenu(!showProfileMenu)
  }
>
  👤
</button>

  </div>

</div>
    {showProfileMenu && <ProfileMenu />}
      <div className="action-buttons">

  <button
    onClick={() => {
      setShowIncomeForm(true);
      setShowExpenseForm(false);
      setShowGoalForm(false);
    }}
  >
    + Income
  </button>

  <button
    onClick={() => {
      setShowIncomeForm(false);
      setShowExpenseForm(true);
      setShowGoalForm(false);
    }}
  >
    + Expense
  </button>

  <button
    onClick={() => {
      setShowIncomeForm(false);
      setShowExpenseForm(false);
      setShowGoalForm(true);
    }}
  >
    + Goal
  </button>

</div>
      {showIncomeForm && (
  <div className="income-form">

    <h3>Add Income</h3>

   <input
  type="text"
  placeholder="Income Source"
  value={incomeSource}
  onChange={(e) => setIncomeSource(e.target.value)}
/>

   <input
  type="number"
  placeholder="Amount"
  value={incomeAmount}
  onChange={(e) => setIncomeAmount(e.target.value)}
/>

    <button
  onClick={() => {

    if (!incomeSource || !incomeAmount) {
      toast.error("Please fill all fields")
      return;
    }

    const newIncome =
      income + Number(incomeAmount);

    setIncome(newIncome);

    localStorage.setItem(
      incomeKey,
      JSON.stringify({
        amount: newIncome,
      })
    );

    const updatedTransactions = [
      ...transactions,
      {
        type: "Income",
        source: incomeSource,
        amount: incomeAmount,
        date: new Date().toLocaleDateString(),
      },
    ];

    setTransactions(updatedTransactions);

    localStorage.setItem(
      transactionKey,
      JSON.stringify(updatedTransactions)
    );

    setIncomeAmount("");
    setIncomeSource("");
    setShowIncomeForm(false);
  }}
>
  Save Income
</button>

  </div>
)}
{showExpenseForm && (
  <div className="income-form">

    <h3>Add Expense</h3>

    <input
      type="text"
      placeholder="Expense Name"
      value={expenseSource}
      onChange={(e) => setExpenseSource(e.target.value)}
    />

    <input
      type="number"
      placeholder="Amount"
      value={expenseAmount}
      onChange={(e) => setExpenseAmount(e.target.value)}
    />

    <button
  onClick={() => {

    if (!expenseSource || !expenseAmount) {
      toast.error("Please fill all fields")
      return;
    }

    const newExpense =
      expense + Number(expenseAmount);

    setExpense(newExpense);

    localStorage.setItem(
      expenseKey,
      JSON.stringify({
        amount: newExpense,
      })
    );

    const updatedTransactions = [
      ...transactions,
      {
         type: "Expense",
         source: expenseSource,
         amount: expenseAmount,
         date: new Date().toLocaleDateString(),
      },
    ];

    setTransactions(updatedTransactions);

    localStorage.setItem(
      transactionKey,
      JSON.stringify(updatedTransactions)
    );

    setExpenseAmount("");
    setExpenseSource("");
    setShowExpenseForm(false);

  }}
>
  Save Expense
</button>

  </div>
)}
{showGoalForm && (
  <div className="goal-form">
    <h3>Create Goal</h3>

    <input
      type="text"
      placeholder="Goal Name"
      value={goalName}
      onChange={(e) => setGoalName(e.target.value)}
    />

    <input
      type="number"
      placeholder="Target Amount"
      value={goalTarget}
      onChange={(e) => setGoalTarget(e.target.value)}
    />

    <button
  onClick={() => {

    if (!goalName || !goalTarget) {
      toast.error("Please fill all fields")
      return;
    }

   if (editingGoal) {

  const updatedGoals =
    goals.map((g) =>
      g.id === editingGoal
        ? {
            ...g,
            name: goalName,
            target: Number(goalTarget),
          }
        : g
    );

  setGoals(updatedGoals);

  localStorage.setItem(
    goalKey,
    JSON.stringify(updatedGoals)
  );

  setEditingGoal(null);

} else {

  const newGoal = {
    id: Date.now(),
    name: goalName,
    target: Number(goalTarget),
    saved: 0,
  };

  const updatedGoals = [
    ...goals,
    newGoal,
  ];

  setGoals(updatedGoals);

  localStorage.setItem(
    goalKey,
    JSON.stringify(updatedGoals)
  );
}

setGoalName("");
setGoalTarget("");
setShowGoalForm(false);
  }}
>
  Save Goal
</button>
      </div>
      
    )}

      <div className="summary-cards">

        <div className="card balance-card">
          <h3>💳 Balance</h3>
<h2>₹{balance}</h2>
        </div>

        <div className="card income-card">
         <h3>📈 Total Income</h3>
          <h2>₹{income}</h2>
        </div>

        <div className="card expense-card">
          <h3>📉 Total Expenses</h3>
          <h2>₹{expense}</h2>
        </div>

      </div>

      <div className="dashboard-bottom">

        <div className="transactions-card">

 <div className="transactions-header">

  <h2>Recent Transactions</h2>

  <button
  className="download-btn"
  onClick={downloadPDF}
>
  ⬇️
</button>
</div>
          <input
  type="text"
  placeholder="🔍 Search Transactions"
  value={searchTerm}
  onChange={(e) =>
    setSearchTerm(e.target.value)
  }
  className="search-bar"
/>
          <div className="transaction-filters">

  <button
    onClick={() =>
      setTransactionFilter("All")
    }
  >
    All
  </button>

  <button
    onClick={() =>
      setTransactionFilter("Income")
    }
  >
    Income
  </button>

  <button
    onClick={() =>
      setTransactionFilter("Expense")
    }
  >
    Expense
  </button>

  <button
    onClick={() =>
      setTransactionFilter("Saving")
    }
  >
    Savings
  </button>

</div>

          {transactions.length === 0 ? (
  <p className="empty-text">
    📝 No transactions yet.
    <br />
    Start by adding your first income or expense.
  </p>
) : (
  <>
{
  (
    showAllTransactions
      ? [...filteredTransactions].reverse()
      : [...filteredTransactions]
          .slice(-5)
          .reverse()
  ).map((item, index) => (

  <div key={index} className="transaction-item">

  <div className="transaction-left">

    <div>
      {item.type === "Income"
        ? "🟢"
        : item.type === "Expense"
        ? "🔴"
        : "🎯"} {item.source}
    </div>

    <small>
      {item.date || ""}
    </small>

  </div>

  <div className="transaction-right">

    <span className="transaction-amount">
      {item.type === "Income"
        ? `+₹${item.amount}`
        : `-₹${item.amount}`}
    </span>

    <button
      className="delete-btn"
      onClick={() => deleteTransaction(item)}
    >
      🗑
    </button>

  </div>

</div>
  ))
}
{transactions.length > 5 && (

  <button
    className="show-more-btn"
    onClick={() =>
      setShowAllTransactions(
        !showAllTransactions
      )
    }
  >

    {showAllTransactions
      ? "▲ Show Less"
      : "▼ Show All"}

  </button>

)}
</>
)}
</div>
  <div className="goal-card">
  <h2>Goal Progress</h2>
  {goals.length > 0 ? (
<>
  {goals.map((goal) => (

    <div
      key={goal.id}
      className="goal-summary"
    >
    <div className="goal-header">

  <h3>🎯 {goal.name}</h3>

  <div className="goal-actions">

  <button
    className="goal-edit-icon"
    onClick={() => {

      setGoalName(goal.name);

      setGoalTarget(goal.target);
      setEditingGoal(goal.id);

      setShowIncomeForm(false);
      setShowExpenseForm(false);

      setShowGoalForm(true);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

    }}
  >
    ✏️
  </button>

  <button
    className="goal-delete-icon"
    onClick={() => {

      const updatedGoals =
        goals.filter(
          (g) => g.id !== goal.id
        );

      setGoals(updatedGoals);

      localStorage.setItem(
        goalKey,
        JSON.stringify(updatedGoals)
      );

    }}
  >
    🗑
  </button>
  </div>

</div>

  <div className="goal-amounts">
    <span>Saved</span>
    <span>₹{goal.saved}</span>
  </div>

  <div className="goal-amounts">
    <span>Target</span>
    <span>₹{goal.target}</span>
  </div>

  <div className="progress-bar">
    <div
      className="progress-fill"
     style={{

  width: `${Math.min(
    (goal.saved / goal.target) * 100,
    100
  )}%`,

  background:
    goal.saved >= goal.target
      ? "#22c55e"
      : "#f59e0b",

}}
    ></div>
  </div>

  <p className="goal-percent">
    {Math.round(
      (goal.saved / goal.target) * 100
    )}% Completed
  </p>
  {goal.saved >= goal.target && (

  <div className="goal-achieved">

    🏆 Goal Achieved!

  </div>

)}

  <button
  className="add-savings-btn"
  onClick={() =>
    setShowSavingForm(goal.id)
  }
>
  + Add Savings
</button>

{showSavingForm === goal.id && (

  <div className="saving-form">

    <input
      type="number"
      placeholder="Enter Saving Amount"
      value={savingAmount}
      onChange={(e) =>
        setSavingAmount(e.target.value)
      }
    />

    <button
      className="save-savings-btn"
      onClick={() => {
        
        const updatedGoals =
          goals.map((g) => {

            if (g.id === goal.id) {

              return {
                ...g,
                saved:
                  g.saved +
                  Number(savingAmount)
              };

            }

            return g;

          });

        setGoals(updatedGoals);

        localStorage.setItem(
          goalKey,
          JSON.stringify(updatedGoals)
        );

        const savingTransaction = {
          type: "Saving",
          source: `Goal: ${goal.name}`,
          amount: savingAmount,
          date: new Date().toLocaleDateString(),
        };

        const updatedTransactions = [
          ...transactions,
          savingTransaction,
        ];

        setTransactions(updatedTransactions);

        localStorage.setItem(
          transactionKey,
          JSON.stringify(updatedTransactions)
        );

        setSavingAmount("");
        setShowSavingForm(null);

      }}
    >
      Save
    </button>

  </div>

)}

<hr
  style={{
    margin: "20px 0",
    border: "none",
    borderTop: "1px solid #eee"
  }}
/>

</div>

  ))}
  </>
) : (
  <>
  <p className="empty-text">
    🎯 No goals yet.
    <br />
    Create your first savings goal.
  </p>

  <button
    className="create-goal-btn"
    onClick={() => {

      setShowIncomeForm(false);
      setShowExpenseForm(false);
      setShowGoalForm(true);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

    }}
  >
    + Create Goal
  </button>
</>
)}
        </div>

      </div>
      <div className="analytics-card">

  <h2>📊 Analytics</h2>

  <div className="analytics-grid">

    <div className="analytics-item">
      <h3>{transactions.length}</h3>
      <p>Total Transactions</p>
    </div>

    <div className="analytics-item">
      <h3>{incomeCount}</h3>
      <p>Income Entries</p>
    </div>

    <div className="analytics-item">
      <h3>{expenseCount}</h3>
      <p>Expense Entries</p>
    </div>

    <div className="analytics-item">
      <h3>{savingCount}</h3>
      <p>Saving Entries</p>
    </div>

  </div>
<div className="analytics-grid">

  <div className="analytics-item">
    <h3>
      {highestExpense
        ? `₹${highestExpense.amount}`
        : "₹0"}
    </h3>

    <p>Highest Expense</p>
  </div>

  <div className="analytics-item">
    <h3>{activeGoals}</h3>

    <p>Active Goals</p>
  </div>

  <div className="analytics-item">
    <h3>{savingsRate}%</h3>

    <p>Savings Rate</p>
  </div>
  
   <div className="analytics-item">

  <h3>₹{balance}</h3>

  <p>Current Balance</p>

</div>
</div>
<div className="insights-card">

  <h2>💡 Insights</h2>

  <div className="insight-item">
    • You have {transactions.length} transactions.
  </div>

  <div className="insight-item">
    • Your highest expense is ₹
    {highestExpense
      ? highestExpense.amount
      : 0}.
  </div>

  <div className="insight-item">
    • You currently have {activeGoals}
    {" "}
    active goal(s).
  </div>

  <div className="insight-item">
    • Your savings rate is
    {" "}
    {savingsRate}%.
  </div>

</div>
<div className="monthly-summary-card">

  <h2>📅 Monthly Summary</h2>

  <div className="monthly-grid">

    <div className="monthly-item">
      <h3>₹{income}</h3>
      <p>Total Income</p>
    </div>

    <div className="monthly-item">
      <h3>₹{expense}</h3>
      <p>Total Expense</p>
    </div>

    <div className="monthly-item">
      <h3>₹{totalSavings}</h3>
      <p>Total Savings</p>
    </div>

    <div className="monthly-item">
      <h3>₹{balance}</h3>
      <p>Closing Balance</p>
    </div>

  </div>

</div>
</div>

{/* <div className="chart-card">

  <h2>
    📈 Financial Overview
  </h2>

  <ResponsiveContainer
    width="100%"
    height={300}
  >

    <BarChart
      data={chartData}
    >

      <XAxis
        dataKey="name"
      />

      <YAxis />

      <Tooltip />

      <Bar
        dataKey="amount"
        fill="#4f46e5"
      />

    </BarChart>

  </ResponsiveContainer>

</div> */}

    </div>
    
  );
}

export default Dashboard;