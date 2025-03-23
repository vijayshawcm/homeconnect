import { Card, CardContent } from '@/components/ui/card';
import {
	BedDouble,
	Sofa,
	CookingPot,
	Bath,
	Home,
	Trash2,
	Edit,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useRoomStore } from '@/store/room';
import { useState } from 'react';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { showToast } from '@/lib/toast';

const RoomCards = ({ room, onDeleteClick }) => {
	const { setCurrentRoom, updateRoom } = useRoomStore();
	const formattedName = room.name.replace(/\s+/g, '');
	const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
	const [newRoomName, setNewRoomName] = useState(room.name);
	const [isUpdating, setIsUpdating] = useState(false);
	const [editError, setEditError] = useState('');
	const [isEditRoomFocused, setIsEditRoomFocused] = useState(false);

	const getRoomIcon = () => {
		switch (room.roomType) {
			case 'bedroom':
				return <BedDouble className="h-6 w-6 text-primary" />;
			case 'living_room':
				return <Sofa className="h-6 w-6 text-primary" />;
			case 'kitchen':
				return <CookingPot className="h-6 w-6 text-primary" />;
			case 'bathroom':
				return <Bath className="h-6 w-6 text-primary" />;
			default:
				return <Home className="h-6 w-6 text-primary" />;
		}
	};

	const handleEditRoom = async () => {
		if (!newRoomName.trim()) {
			setEditError('Room name cannot be empty');
			return;
		}

		if (newRoomName === room.name) {
			setIsEditDialogOpen(false);
			return;
		}

		setIsUpdating(true);
		try {
			// api call
			await new Promise((resolve) => setTimeout(resolve, 800));

			//update room styore
			updateRoom({ ...room, name: newRoomName });

			showToast.success('Room updated', `Room name changed to ${newRoomName}`);
			setIsEditDialogOpen(false);
		} catch (error) {
			console.error('Error updating room:', error);
			showToast.error('Update failed', 'Failed to update room name');
		} finally {
			setIsUpdating(false);
		}
	};

	return (
		<div className="relative group">
			<Card className="w-[200px] cursor-pointer transition-all duration-200 hover:border-primary hover:bg-muted/50 shadow-none">
				{/* Edit Button */}
				<button
					onClick={(e) => {
						e.preventDefault();
						setNewRoomName(room.name);
						setEditError('');
						setIsEditDialogOpen(true);
					}}
					className="absolute top-2 right-10 md:opacity-0 group-hover:md:opacity-100 
            transition-opacity p-2 bg-background hover:bg-blue-50 rounded-full 
            shadow-sm z-10"
				>
					<Edit className="h-4 w-4 text-blue-600" />
				</button>
				{/* Delete Button - always visible on mobile */}
				<button
					onClick={(e) => {
						e.preventDefault();
						onDeleteClick(room);
					}}
					className="absolute top-2 right-2 md:opacity-0 group-hover:md:opacity-100 
            transition-opacity p-2 bg-background hover:bg-red-50 rounded-full 
            shadow-sm z-10"
				>
					<Trash2 className="h-4 w-4 text-red-600" />
				</button>
				<Link to={`/${formattedName}`} onClick={() => setCurrentRoom(room)}>
					<CardContent className="p-4 flex flex-col items-center text-center">
						<div className="w-12 h-12 rounded-full flex items-center justify-center mb-3">
							{getRoomIcon()}
						</div>
						<h3 className="font-medium text-base">{room.name}</h3>
						<div className="text-sm text-muted-foreground mt-1">
							{room.devices?.length || 0} devices
						</div>
						<div className="mt-3 flex items-center justify-center gap-2">
							<span className="text-sm font-medium">{room.temperature}°C</span>
							<span
								className={`w-2 h-2 rounded-full ${
									room.status === 'active' ? 'bg-green-500' : 'bg-muted'
								}`}
							></span>
						</div>
					</CardContent>
				</Link>
			</Card>

			{/* Edit Room Dialog SLOP */}
			<Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
				<DialogContent className="sm:max-w-[425px]">
					<DialogHeader>
						<DialogTitle>Edit Room</DialogTitle>
					</DialogHeader>
					<div className="grid gap-4 py-4">
						<div className="grid grid-cols-4 items-center gap-4">
							<label htmlFor="roomName" className="text-right">
								Name
							</label>
							<Input
								id="roomName"
								value={newRoomName}
								onChange={(e) => {
									setNewRoomName(e.target.value);
									if (e.target.value) setEditError('');
								}}
								onFocus={() => setIsEditRoomFocused(true)}
								onBlur={() => setIsEditRoomFocused(false)}
								className={`col-span-3 ${
									editError && !isEditRoomFocused ? 'border-red-500' : ''
								}`}
								autoFocus
							/>
						</div>
						{editError && <p className="text-sm text-red-500">{editError}</p>}
					</div>
					<DialogFooter>
						<Button
							variant="outline"
							onClick={() => setIsEditDialogOpen(false)}
						>
							Cancel
						</Button>
						<Button onClick={handleEditRoom} disabled={isUpdating}>
							{isUpdating ? 'Saving...' : 'Save changes'}
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	);
};

export default RoomCards;
