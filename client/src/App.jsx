<<<<<<< HEAD
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import PhoneVerification from "./pages/auth/PhoneVerification";
import OTPVerification from "./pages/auth/OTPVerification";
import AppliancePage from "./pages/home/AppliancePage";
import { useHomeStore } from "./store/home";
import { useEffect } from "react";
import { useRoomStore } from "./store/room";
import Sidebar from "./components/home/Sidebar";

export default function AppRoutes() {
  const { homes, fetchHomes } = useHomeStore();
  const { rooms, fetchRoomsByHome } = useRoomStore();

  useEffect(() => {
    fetchHomes();
  }, [fetchHomes]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} /> {/* Default route */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/phone-verification" element={<PhoneVerification />} />
        <Route path="/otp-verification" element={<OTPVerification />} />
        {homes.map((home) => {
          console.log(home.name);
        })}
      </Routes>
    </Router>
  );
=======
import React from 'react';
import AppRoutes from './routes';

function App() {
	return (
		<div className="min-h-screen">
			<AppRoutes />
		</div>
	);
>>>>>>> main
}

export default App;
