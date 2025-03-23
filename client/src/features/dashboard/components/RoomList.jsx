import { ScrollArea } from '@/components/ui/scroll-area';
import { Link } from 'react-router-dom';
import { useRoomStore } from '@/store/room';
import { Plus, Trash2 } from 'lucide-react';

const RoomList = ({ rooms, setIsDialogOpen, onDeleteClick }) => {
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
								{/* mobile Details */}
								<div className="md:hidden flex justify-between text-muted-foreground text-sm">
									<span>{room.devices?.length || 0} devices</span>
									<span>{room.status || 'Active'}</span>
								</div>
								{/* Delete button - always visible on mobile */}
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
		</div>
	);
};

export default RoomList;
