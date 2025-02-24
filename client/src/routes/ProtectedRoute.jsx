// Route to reroute users to login page if they arent authenticated.
import { Navigate, Outlet } from 'react-router-dom';
import { userAuthStore } from '@/store/userAuth';

export default function ProtectedRoute() {
	console.log('protected route hi');
	const { isAuthenticated } = userAuthStore();

	if (isAuthenticated) {
		return <Outlet />; // Route user to the page they are trying to access if they are authenticated
	} else {
		return <Navigate to="/login" />; //Re-route user to login page if they are not authenticated
	}
}
