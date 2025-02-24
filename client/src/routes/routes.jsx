<<<<<<< HEAD:client/src/routes.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthContainer from "./auth/AuthContainer"; // Import AuthContainer
import ProtectedRoute from "./pages/auth/ProtectedRoute";
import Dashboard from "./home/Dashboard";
import NotFound from "./pages/NotFound";

function AppRoutes() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<AuthContainer mode="login" />} />
        <Route path="/register" element={<AuthContainer mode="register" />} />
        <Route
          path="/forgot-password"
          element={<AuthContainer mode="forgot-password" />}
        />
        <Route path="/verify" element={<AuthContainer mode="verify" />} />
        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        {/* 404 Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
=======
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from '@/features/landing/LandingPage';
import AuthContainer from '@/features/auth/AuthContainer'; // Import AuthContainer
import ProtectedRoute from '@/routes/ProtectedRoute';
import Dashboard from '@/features/dashboard/Dashboard';
import NotFound from '@/pages/NotFound';

function AppRoutes() {
	return (
		<Router>
			<Routes>
				{/* Root Route */}
				<Route path="/" element={<LandingPage />} />
				{/* Public Routes */}
				<Route path="/login" element={<AuthContainer mode="login" />} />
				<Route path="/register" element={<AuthContainer mode="register" />} />
				{/* prettier-ignore */}
				<Route path="/forgot-password" element={<AuthContainer mode="forgot-password" />} />
				{/* Protected Routes */}
				<Route element={<ProtectedRoute />}>
					<Route path="/dashboard" element={<Dashboard />} />
				</Route>
				{/* 404 Route */}
				<Route path="*" element={<NotFound />} />
			</Routes>
		</Router>
	);
>>>>>>> main:client/src/routes/routes.jsx
}

export default AppRoutes;
