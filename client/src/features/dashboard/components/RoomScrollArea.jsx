import React from 'react';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useHomeStore } from '@/store/home';
import { Grid, List } from 'lucide-react';
import { useSidebar } from '@/components/ui/sidebar';
import clsx from 'clsx';
import RoomGrid from './RoomGrid';
import RoomList from './RoomList';
import AddRoomDialog from './AddRoomDialog';
import ConfirmationDialog from './ConfirmationDialog';

const RoomScrollArea = ({ showAll = false }) => {
	const [viewType, setViewType] = React.useState('grid');
	const { open, isMobile } = useSidebar();
	const { currentHome, addRoom } = useHomeStore();
	const [roomType, setRoomType] = useState('');
	const [roomName, setRoomName] = useState('');
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [roomToDelete, setRoomToDelete] = useState(null);
	const [errors, setErrors] = useState({});
	const { removeRoom } = useHomeStore();

	const handleDeleteConfirm = () => {
		if (roomToDelete) {
			removeRoom(roomToDelete.name);
			setRoomToDelete(null);
		}
	};

	// function to add room
	const handleAddRoom = () => {
		const newErrors = {};

		if (!roomType) {
			newErrors.roomType = 'Room type is required';
			setErrors(newErrors); // Update errors state
			return false; // Stop further validation
		}
		if (!roomName) {
			newErrors.roomName = 'Room name is required';
			setErrors(newErrors); // Update errors state
			return false; // Stop further validation
		}

		if (Object.keys(newErrors).length > 0) {
			setErrors(newErrors);
			return;
		}

		// add new room
		addRoom({
			roomType: roomType,
			name: roomName,
		});

		// reset errors and form fields, then close dialog
		setErrors({});
		setRoomType('');
		setRoomName('');
		setIsDialogOpen(false);
	};

	return (
		<Card className="border shadow-sm">
			<ConfirmationDialog
				open={!!roomToDelete}
				onConfirm={handleDeleteConfirm}
				onCancel={() => setRoomToDelete(null)}
				title="Delete Room"
				message={`Are you sure you want to delete "${roomToDelete?.name}"?`}
			/>
			<CardHeader className="px-6 pt-6 pb-4">
				<div className="flex items-center justify-between">
					<CardTitle className="text-xl font-semibold">Your Rooms</CardTitle>
					<div className="flex items-center gap-2">
						<div className="flex items-center border rounded-md overflow-hidden">
							<Button
								variant={viewType === 'grid' ? 'default' : 'ghost'}
								size="sm"
								className="h-8 px-2 rounded-none"
								onClick={() => setViewType('grid')}
							>
								<Grid className="h-4 w-4" />
							</Button>
							<Button
								variant={viewType === 'list' ? 'default' : 'ghost'}
								size="sm"
								className="h-8 px-2 rounded-none"
								onClick={() => setViewType('list')}
							>
								<List className="h-4 w-4" />
							</Button>
						</div>
						<AddRoomDialog
							isDialogOpen={isDialogOpen}
							setIsDialogOpen={setIsDialogOpen}
							roomType={roomType}
							setRoomType={setRoomType}
							roomName={roomName}
							setRoomName={setRoomName}
							handleAddRoom={handleAddRoom}
							errors={errors} // pass errors here
						/>
					</div>
				</div>
			</CardHeader>
			<CardContent className="px-6 pb-4">
				{viewType === 'grid' ? (
					<RoomGrid
						rooms={currentHome.rooms}
						setIsDialogOpen={setIsDialogOpen}
						onDeleteClick={setRoomToDelete}
					/>
				) : (
					<RoomList
						rooms={currentHome.rooms}
						setIsDialogOpen={setIsDialogOpen}
						onDeleteClick={setRoomToDelete}
					/>
				)}
			</CardContent>
		</Card>
	);
};

export default RoomScrollArea;
