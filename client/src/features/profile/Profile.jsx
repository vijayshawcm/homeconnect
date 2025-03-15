import { useEffect, useState } from 'react';
import { updatePageTitle } from '@/lib/utils';
import ProfileHeader from '@/features/profile/components/ProfileHeader';
import ProfileStats from '@/features/profile/components/ProfileStats';
import RecentActivity from '@/features/profile/components/RecentActivity';
import ConnectedDevices from '@/features/profile/components/ConnectedDevices';
import { Toaster } from 'sonner';

function Profile() {
	useEffect(() => {
		updatePageTitle('Profile');
	}, []);

	// Mock user data
	const [user, setUser] = useState({
		username: 'Test',
		fullName: 'Test Test',
		email: 'test@gmail.com',
		bio: 'Smart home enthusiast and tech lover',
		avatarUrl: '',
		joinDate: 'March 2025',
	});

	const handleProfileUpdate = (updatedUser) => {
		setUser(updatedUser);
	};

	return (
		<>
			<div className="container py-8 max-w-6xl mx-auto px-4 sm:px-6">
				<ProfileHeader user={user} onProfileUpdate={handleProfileUpdate} />
				<ProfileStats />
				<div className="grid gap-4 md:grid-cols-2">
					<RecentActivity />
					<ConnectedDevices />
				</div>
			</div>
			<Toaster position="bottom-right" richColors />
		</>
	);
}

export default Profile;
