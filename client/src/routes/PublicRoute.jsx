import { Navigate, Outlet } from 'react-router-dom';
import { userAuthStore } from '@/store/userAuth';

export default function PublicRoute() {
	const { isAuthenticated } = userAuthStore();
	// redirect to default page is user is authenticated
	return isAuthenticated ? <Navigate to="/dashboard" replace /> : <Outlet />;
}
