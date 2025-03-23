import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import RoomCards from './RoomCards';
import { Card } from '@/components/ui/card';
import { Plus } from 'lucide-react';

const RoomGrid = ({ rooms, setIsDialogOpen, onDeleteClick }) => {
	return (
		<ScrollArea className="w-full whitespace-nowrap pb-2">
			<div className="flex w-max space-x-4">
				{rooms.map((room) => (
					<RoomCards
						key={room.name}
						room={room}
						onDeleteClick={onDeleteClick}
					/>
				))}
				<Card
					className="flex w-[200px] cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-muted-foreground/30 p-4 transition-all hover:border-primary hover:bg-muted/50"
					onClick={() => setIsDialogOpen(true)}
				>
					<Plus className="mb-2 h-8 w-8 text-muted-foreground" />
					<p className="text-sm font-medium text-muted-foreground">Add Room</p>
				</Card>
			</div>
			<ScrollBar orientation="horizontal" className="hidden" />
		</ScrollArea>
	);
};

export default RoomGrid;
