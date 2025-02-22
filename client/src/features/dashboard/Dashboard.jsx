import { useEffect } from 'react';
import { updatePageTitle } from '@/lib/utils';

function Dashboard() {
	useEffect(() => {
		updatePageTitle('Dashboard');
	}, []);

	console.log('dashboard hi');
	return <h1> Welcome to HomeConnect! </h1>;
}

export default Dashboard;
