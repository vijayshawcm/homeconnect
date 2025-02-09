import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthContainer from './auth/AuthContainer'; // Import AuthContainer

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
			</Routes>
		</Router>
	);
}

export default AppRoutes;
