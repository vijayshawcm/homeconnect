import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Edit, Camera, Calendar, MapPin } from 'lucide-react';
import EditProfileModal from './EditProfileModal';

function ProfileHeader({ user, onProfileUpdate }) {
	const [isHovering, setIsHovering] = useState(false);
	const [isEditModalOpen, setIsEditModalOpen] = useState(false);
	const [userData, setUserData] = useState(user);
	// Use initials as fallback if no avatar is available
	const getInitials = (name) => {
		return name
			.split(' ')
			.map((part) => part[0])
			.join('')
			.toUpperCase();
	};

	// Handle profile update
	const handleProfileUpdate = (updatedData) => {
		setUserData(updatedData);
		if (onProfileUpdate) {
			onProfileUpdate(updatedData);
		}
	};

	return (
		<>
			<Card className="overflow-hidden border-border mb-6">
				{/* Cover Photo */}
				<div className="h-32 sm:h-48 bg-gradient-to-r from-primary/20 to-primary/5 relative">
					<Button
						variant="ghost"
						size="sm"
						className="absolute bottom-2 right-2 bg-background/80 backdrop-blur-sm"
					>
						<Camera className="h-4 w-4 mr-2" />
						Change Cover
					</Button>
				</div>

				<CardContent className="p-6 pt-0 relative">
					{/* Avatar */}
					<div
						className="relative -mt-12 inline-block rounded-full ring-4 ring-background"
						onMouseEnter={() => setIsHovering(true)}
						onMouseLeave={() => setIsHovering(false)}
					>
						<Avatar className="h-24 w-24 border-4 border-background">
							<AvatarImage
								src={userData?.avatarUrl}
								alt={userData?.fullName || userData?.username}
							/>
							<AvatarFallback className="text-xl bg-primary/10 text-primary">
								{userData?.fullName
									? getInitials(userData.fullName)
									: userData?.username?.substring(0, 2).toUpperCase()}
							</AvatarFallback>
						</Avatar>

						{isHovering && (
							<div
								className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center cursor-pointer"
								onClick={() => setIsEditModalOpen(true)}
							>
								<Camera className="h-6 w-6 text-white" />
							</div>
						)}
					</div>

					<div className="mt-4 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
						<div>
							<h1 className="text-2xl font-bold">
								{userData?.fullName || userData?.username}
							</h1>
							<p className="text-muted-foreground">@{userData?.username}</p>

							<div className="mt-3 flex flex-wrap gap-3">
								<div className="flex items-center text-sm text-muted-foreground">
									<Calendar className="h-4 w-4 mr-1" />
									Joined {userData?.joinDate || 'March 2025'}
								</div>
								<div className="flex items-center text-sm text-muted-foreground">
									<MapPin className="h-4 w-4 mr-1" />
									Smart Home Owner
								</div>
							</div>
							<p className="mt-4 text-sm relative">
								{user?.bio || 'No bio provided'}
							</p>
						</div>

						<Button
							variant="outline"
							size="sm"
							className="gap-2 self-start sm:self-end"
							onClick={() => setIsEditModalOpen(true)}
						>
							<Edit className="h-4 w-4" />
							Edit Profile
						</Button>
					</div>
				</CardContent>
			</Card>

			<EditProfileModal
				isOpen={isEditModalOpen}
				onClose={() => setIsEditModalOpen(false)}
				user={userData}
				onSave={handleProfileUpdate}
			/>
		</>
	);
}

export default ProfileHeader;
