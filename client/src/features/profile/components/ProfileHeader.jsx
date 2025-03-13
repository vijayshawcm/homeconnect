import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Edit } from 'lucide-react';

function ProfileHeader({ user }) {
	// Use initials as fallback if no avatar is available
	const getInitials = (name) => {
		return name
			.split(' ')
			.map((part) => part[0])
			.join('')
			.toUpperCase();
	};

	return (
		<Card className="mb-6">
			<CardContent className="p-6">
				<div className="flex flex-col md:flex-row items-center gap-6">
					<Avatar className="h-24 w-24">
						<AvatarImage
							src={user?.avatarUrl}
							alt={user?.fullName || user?.username}
						/>
						<AvatarFallback className="text-xl">
							{user?.fullName
								? getInitials(user.fullName)
								: user?.username?.substring(0, 2).toUpperCase()}
						</AvatarFallback>
					</Avatar>

					<div className="flex-1 text-center md:text-left">
						<h1 className="text-2xl font-bold">
							{user?.fullName || user?.username}
						</h1>
						<p className="text-muted-foreground">{user?.email}</p>
						<p className="mt-2">{user?.bio || 'No bio provided'}</p>
					</div>

					<Button variant="outline" size="sm" className="gap-2">
						<Edit className="h-4 w-4" />
						Edit Profile
					</Button>
				</div>
			</CardContent>
		</Card>
	);
}

export default ProfileHeader;
