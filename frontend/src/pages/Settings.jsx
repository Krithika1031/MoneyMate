import "../styles/Settings.css";

function Settings() {
  return (
    <div className="settings-page">

      <div className="settings-card">

        <h2>⚙ Settings</h2>

        <div className="setting-item">

          <label>Theme</label>

          <select disabled>

  <option>Light</option>

</select>

<p className="coming-soon">
  Dark Mode Coming Soon 🌙
</p>

        </div>

        <div className="setting-item">

          <label>Currency</label>

          <select>

            <option>₹ INR</option>

            <option>$ USD</option>

            <option>€ EUR</option>

            <option>£ GBP</option>

          </select>

        </div>

        <div className="setting-item">

          <label>Notifications</label>

          <input type="checkbox" />

        </div>

      </div>

    </div>
  );
}

export default Settings;