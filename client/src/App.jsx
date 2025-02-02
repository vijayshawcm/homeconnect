import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

export default function AppRoutes() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Login />} /> {/* Default route */}
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
			</Routes>
		</Router>
	);
}
