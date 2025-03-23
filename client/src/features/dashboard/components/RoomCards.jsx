import { Card, CardContent } from '@/components/ui/card';
import { BedDouble, Sofa, CookingPot, Bath, Home, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useRoomStore } from '@/store/room';

const RoomCards = ({ room, onDeleteClick }) => {
	const { setCurrentRoom } = useRoomStore();
	const formattedName = room.name.replace(/\s+/g, '');

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

	return (
		<div className="relative group">
			<Card className="w-[200px] cursor-pointer transition-all duration-200 hover:border-primary hover:bg-muted/50 shadow-none">
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
		</div>
	);
};

export default RoomCards;
