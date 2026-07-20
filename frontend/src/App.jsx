import { Toaster } from "sonner";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import VerifyResetOTP from "./pages/VerifyResetOTP";
import ResetPassword from "./pages/ResetPassword";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import ChangePassword from "./pages/ChangePassword";

function App() {
  return (
    <BrowserRouter>
    <Toaster
    position="top-right"
    richColors
    closeButton
  />
      <Routes>

       <Route path="/" element={<Home />} />

        <Route path="/signup" element={<Signup />} />
      
<Route
  path="/verify-reset-otp"
  element={<VerifyResetOTP />}
/>
      <Route
    path="/forgot-password"
    element={<ForgotPassword />}
/>
<Route
  path="/reset-password"
  element={<ResetPassword />}
/>
        <Route path="/login" element={<Login />} />

       <Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>
<Route
path="/profile"
element={<Profile/>}
/>
<Route
path="/settings"
element={<Settings/>}
/>
<Route
path="/change-password"
element={<ChangePassword/>}
/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;