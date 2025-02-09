import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import PhoneVerification from "./pages/auth/PhoneVerification";
import OTPVerification from "./pages/auth/OTPVerification";
import ProtectedRoute  from "./pages/auth/ProtectedRoute";
import AppliancePage from "./pages/home/AppliancePage";
import Dashboard from "./pages/home/Dashboard";

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} /> {/* Default route */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/phone-verification" element={<PhoneVerification />} />
        <Route path="/otp-verification" element={<OTPVerification />} />
        <Route path="/appliancePage" element={<AppliancePage />} />
        {/* Put protected routes in here */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </Router>
  );
}
