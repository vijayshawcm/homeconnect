import { useState } from 'react';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import sampleAvatar from '../../../assets/sampleAvatar.png';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { useHomeStore } from '@/store/home';
import { userAuthStore } from '@/store/userAuth';
import addDweller from '../../../assets/addDweller.svg';
import { Link } from 'react-router-dom';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import AddMemberDialog from './AddMemberDialog';

const ProfileCard = () => {
	const { currentHome } = useHomeStore();
	const { user } = userAuthStore();
	const [isDialogOpen, setIsDialogOpen] = useState(false);

	return (
		<Card className="bg-white p-4 flex flex-col justify-end gap-4 lg:gap-8 rounded-3xl flex-1">
			<div className="flex flex-1 flex-col gap-4">
				<Link to={'/permissions'} className="font-semibold text-2xl">
					User Management
				</Link>
				<div className="flex-1 flex justify-center items-center gap-4">
					<div className="flex-1 flex justify-center items-center">
						<ScrollArea className="flex-1 whitespace-nowrap">
							<div className="flex flex-1 gap-10 selection:items-center w-full ">
								{currentHome.dwellers.map((dweller) => (
									<Avatar
										className="size-24 sm:size-24 xl:size-24 border-black"
										key={dweller.user}
									>
										<AvatarImage src={sampleAvatar} />
									</Avatar>
								))}
							</div>
							<ScrollBar orientation="horizontal" />
						</ScrollArea>
					</div>
					<div className="border-2 border-[#184C85] h-full rounded-3xl"></div>
					<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
						<DialogTrigger asChild>
							<Avatar className="size-24 sm:size-24 xl:size-28 cursor-pointer">
								<AvatarImage src={addDweller} />
							</Avatar>
						</DialogTrigger>
						<AddMemberDialog
							homeId={currentHome._id}
							invitationCode={currentHome.invitationCode}
							onClose={() => setIsDialogOpen(false)}
						/>
					</Dialog>
				</div>
			</div>
		</Card>
	);
};

export default ProfileCard;
