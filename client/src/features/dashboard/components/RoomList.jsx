import { ScrollArea } from '@/components/ui/scroll-area';
import { Link } from 'react-router-dom';
import { useRoomStore } from '@/store/room';
import { Plus, Trash2, Edit, Loader2 } from 'lucide-react';
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

const RoomList = ({ rooms, setIsDialogOpen, onDeleteClick }) => {
	const [editingRoom, setEditingRoom] = useState(null);
	const [newRoomName, setNewRoomName] = useState('');
	const [isUpdating, setIsUpdating] = useState(false);
	const { updateRoom } = useRoomStore();
	const [editError, setEditError] = useState('');
	const [isEditRoomFocused, setIsEditRoomFocused] = useState(false);

	const handleEditClick = (e, room) => {
		e.stopPropagation();
		e.preventDefault();
		setEditingRoom(room);
		setNewRoomName(room.name);
	};

	const handleEditRoom = async () => {
		if (!newRoomName.trim()) {
			setEditError('Room name cannot be empty');
			return;
		}

		if (newRoomName === room.name) {
			setEditingRoom(null);
			return;
		}

		setIsUpdating(true);
		try {
			//===api call
			await new Promise((resolve) => setTimeout(resolve, 800));

			// update room store
			updateRoom({ ...room, name: newRoomName });

			showToast.success('Room updated', `Room name changed to ${newRoomName}`);
			setEditingRoom(null);
		} catch (error) {
			console.error('Error updating room:', error);
			showToast.error('Update failed', 'Failed to update room name');
		} finally {
			setIsUpdating(false);
		}
	};

	return (
		<div className="space-y-2">
			{/* Header - hidden on mobile */}
			<div className="hidden md:grid grid-cols-5 py-2 px-4 bg-muted/30 rounded-md text-sm font-medium">
				<div>Room</div>
				<div>Devices</div>
				<div>Temperature</div>
				<div>Status</div>
			</div>
			<div className="relative h-[300px]">
				<ScrollArea className="h-[calc(100%-48px)] [&>div]:-mr-4">
					<div className="space-y-1">
						{rooms.map((room) => (
							<Link
								to={`/${room.name.replace(/\s+/g, '')}`}
								key={room.name}
								onClick={() => useRoomStore.getState().setCurrentRoom(room)}
								className="group flex flex-col md:grid md:grid-cols-5 py-3 px-0 md:px-4 hover:bg-muted/30 rounded-md text-sm transition-colors relative gap-2"
							>
								{/* mobile layout */}
								<div className="md:hidden flex justify-between items-center">
									<div className="font-medium">{room.name}</div>
									<div className="flex items-center gap-2">
										<span className="text-xs text-muted-foreground">
											{room.temperature}°C
										</span>
										<span
											className={`w-2 h-2 rounded-full ${
												room.status === 'active' ? 'bg-green-500' : 'bg-muted'
											}`}
										></span>
									</div>
								</div>
								{/* desktop Layout */}
								<div className="hidden md:block font-medium">{room.name}</div>
								<div className="hidden md:block">
									{room.devices?.length || 0} devices
								</div>
								<div className="hidden md:block">{room.temperature}°C</div>
								<div className="hidden md:block">
									<span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
										{room.status || 'Active'}
									</span>
								</div>
								{/* mobile details */}
								<div className="md:hidden flex justify-between text-muted-foreground text-sm">
									<span>{room.devices?.length || 0} devices</span>
									<span>{room.status || 'Active'}</span>
								</div>
								{/* Action buttons */}
								<div className="flex justify-end gap-2">
									{/* Edit button */}
									<button
										onClick={(e) => handleEditClick(e, room)}
										className="md:absolute md:right-12 md:top-1/2 md:transform md:-translate-y-1/2 
											md:opacity-0 md:group-hover:opacity-100 transition-opacity p-2 hover:bg-blue-50 
											rounded-full self-end md:self-auto"
									>
										<Edit className="h-4 w-4 text-blue-600" />
									</button>
									{/* Delete button */}
									<button
										onClick={(e) => {
											e.stopPropagation();
											e.preventDefault();
											onDeleteClick(room);
										}}
										className="md:absolute md:right-4 md:top-1/2 md:transform md:-translate-y-1/2 
											md:opacity-0 md:group-hover:opacity-100 transition-opacity p-2 hover:bg-red-50 
											rounded-full self-end md:self-auto"
									>
										<Trash2 className="h-4 w-4 text-red-600" />
									</button>
								</div>
							</Link>
						))}
					</div>
				</ScrollArea>
				{/* Add Room Button */}
				<div className="absolute bottom-0 w-full pt-2 bg-background">
					<div
						className="py-2 px-4 hover:bg-muted/30 rounded-md text-sm transition-colors cursor-pointer"
						onClick={() => setIsDialogOpen(true)}
					>
						<div className="font-medium text-primary flex items-center gap-2">
							<Plus className="h-4 w-4" />
							<span className="whitespace-nowrap">Add New Room</span>
						</div>
					</div>
				</div>
			</div>

			{/* SLOP SLOP SLPO*/}
			{/* Edit Room Dialog */}
			<Dialog
				open={!!editingRoom}
				onOpenChange={(open) => !open && setEditingRoom(null)}
			>
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
						<Button variant="outline" onClick={() => setEditingRoom(null)}>
							Cancel
						</Button>
						<Button onClick={handleEditRoom} disabled={isUpdating}>
							{isUpdating ? (
								<>
									<Loader2 className="mr-2 h-4 w-4 animate-spin" />
									Saving...
								</>
							) : (
								'Save changes'
							)}
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	);
};

export default RoomList;
