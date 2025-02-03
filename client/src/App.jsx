import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import PhoneVerification from './pages/auth/PhoneVerification';

export default function AppRoutes() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Login />} /> {/* Default route */}
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route path="/phone-verification" element={<PhoneVerification />} />
			</Routes>
		</Router>
	);
}
