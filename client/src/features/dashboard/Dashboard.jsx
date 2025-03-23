import { useEffect } from 'react';
import { useHomeStore } from '@/store/home';
import { userAuthStore } from '@/store/userAuth';
import RoomScrollArea from './components/RoomScrollArea';
import BentoGrid from './components/BentoGrid';
import WelcomeUser from './components/WelcomeUser';

function Dashboard() {
	const { user } = userAuthStore();
	const { currentHome, updateHome, isLoading } = useHomeStore();

	useEffect(() => {
		if (currentHome?._id) {
			updateHome();
		}
	}, [currentHome?._id, updateHome]);

	if (isLoading) {
		return (
			<div className="flex h-full w-full items-center justify-center">
				<div className="h-32 w-32 animate-spin rounded-full border-b-2 border-t-2 border-primary"></div>
			</div>
		);
	}

	return (
		<div className="flex-1 space-y-4 p-4">
			<WelcomeUser user={user.fullName} />
			<RoomScrollArea rooms={currentHome.rooms} />
			<BentoGrid />
		</div>
	);
}

export default Dashboard;
