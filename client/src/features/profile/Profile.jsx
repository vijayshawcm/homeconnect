import { useEffect } from 'react';
import { updatePageTitle } from '@/lib/utils';
import ProfileHeader from '@/features/profile/components/ProfileHeader';
import ProfileStats from '@/features/profile/components/ProfileStats';
import RecentActivity from '@/features/profile/components/RecentActivity';

function Profile() {
	useEffect(() => {
		updatePageTitle('Profile');
	}, []);

	// Mock user data
	const user = {
		username: 'Test',
		fullName: 'Test Test',
		email: 'test@gmail.com',
		bio: 'Smart home enthusiast and tech lover',
		avatarUrl: '',
	};

	return (
		<div className="container py-6 max-w-5xl">
			<ProfileHeader user={user} />
			<ProfileStats />
			<RecentActivity />
		</div>
	);
}

export default Profile;
