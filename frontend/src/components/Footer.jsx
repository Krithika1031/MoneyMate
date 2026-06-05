import "../styles/Footer.css";

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-content">

        <div className="footer-brand">
          <h2>💰 MoneyMate</h2>
          <p>
            Track expenses, achieve goals, and build
            better financial habits.
          </p>
        </div>

        <div className="footer-links">
          <h3>Quick Links</h3>
          <a href="#">Features</a>
          <a href="#">Goals</a>
          <a href="#">About</a>
        </div>

        <div className="footer-contact">
          <h3>Contact</h3>
          <p>contact@moneymate.com</p>
          <p>Bangalore, India</p>
        </div>

      </div>

      <div className="footer-bottom">
        © 2026 MoneyMate. All rights reserved. | Developed by Krithika Bhat
      </div>

    </footer>
  );
}

export default Footer;