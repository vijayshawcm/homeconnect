import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthContainer from './auth/AuthContainer'; // Import AuthContainer
import NotFound from './pages/NotFound';

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
				{/* 404 Route */}
				<Route path="*" element={<NotFound />} />
			</Routes>
		</Router>
	);
}

export default AppRoutes;
