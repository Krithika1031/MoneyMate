import "../styles/Signup.css";

function Signup() {
  return (
    <div className="auth-container">

      <div className="auth-card">

        <h2>Create Account 🚀</h2>

        <p>Start your financial journey today.</p>

        <form>

          <input
            type="text"
            placeholder="Full Name"
          />

          <input
            type="email"
            placeholder="Email Address"
          />

          <input
            type="password"
            placeholder="Password"
          />

          <button type="submit">
            Sign Up
          </button>

        </form>

      </div>

    </div>
  );
}

export default Signup;