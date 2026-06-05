import "../styles/Login.css";

function Login() {
  return (
    <div className="auth-container">

      <div className="auth-card">

        <h2>Welcome Back 👋</h2>

        <p>Login to continue managing your finances.</p>

        <form>

          <input
            type="email"
            placeholder="Email Address"
          />

          <input
            type="password"
            placeholder="Password"
          />

          <button type="submit">
            Login
          </button>

        </form>

      </div>

    </div>
  );
}

export default Login;