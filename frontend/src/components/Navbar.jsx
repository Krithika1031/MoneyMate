import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="logo">💰 MoneyMate</div>

      <div className={`nav-menu ${menuOpen ? "active" : ""}`}>
        <a href="#features" onClick={() => setMenuOpen(false)}>
          Features
        </a>

        <a href="#goals" onClick={() => setMenuOpen(false)}>
          Goals
        </a>

        <a href="#how-it-works" onClick={() => setMenuOpen(false)}>
          About
        </a>

        <button
          className="nav-btn"
          onClick={() => {
            navigate("/login");
            setMenuOpen(false);
          }}
        >
          Login
        </button>
      </div>

      <div
        className="hamburger"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        ☰
      </div>
    </nav>
  );
}

export default Navbar;