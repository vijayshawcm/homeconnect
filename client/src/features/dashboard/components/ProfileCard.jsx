import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { useHomeStore } from '@/store/home';
import { userAuthStore } from '@/store/userAuth';
import sampleAvatar from '../../../assets/sampleAvatar.png';
import AddMemberDialog from './AddMemberDialog';

const ProfileCard = () => {
	const { currentHome } = useHomeStore();
	const { user } = userAuthStore();

	// temp mock members
	const mockDwellers = [
		// current user (you)
		{
			_id: user?.id || '1',
			name: user?.name || 'You',
			avatar: user?.avatar || '',
			email: user?.email || '',
		},
		{
			_id: '2',
			name: 'Alex Chen',
			avatar: 'https://example.com/avatars/alex.jpg',
			email: 'alex@example.com',
		},
		{
			_id: '3',
			name: 'Samira Khan',
			avatar: 'https://example.com/avatars/samira.jpg',
			email: 'samira@example.com',
		},
		{
			_id: '4',
			name: 'James Smith',
			avatar: '',
			email: 'james@example.com',
		},
	];

	return (
		<Card className="h-full overflow-hidden">
			<CardHeader className="pb-3">
				<CardTitle>Home Members</CardTitle>
			</CardHeader>
			<CardContent className="p-6">
				<ScrollArea className="w-full">
					<div className="flex space-x-4 pb-1">
						{/* mockDwellers instead of currentHome.dwellers for testing */}
						{mockDwellers.map((dweller) => (
							<div
								key={dweller._id}
								className="flex flex-col items-center space-y-2"
							>
								<Avatar className="h-20 w-20 border-4 border-primary">
									<AvatarImage
										src={dweller.avatar || sampleAvatar}
										alt="User avatar"
										className="object-cover"
									/>
								</Avatar>
								<span className="text-sm font-medium text-center">
									{dweller.name}
									{dweller._id === user?.id && ' (You)'}
								</span>
							</div>
						))}
						<AddMemberDialog
							homeId={currentHome._id}
							invitationCode={currentHome.invitationCode}
						/>
					</div>
					<ScrollBar orientation="horizontal" className="hidden" />
				</ScrollArea>
			</CardContent>
		</Card>
	);
};

export default ProfileCard;
