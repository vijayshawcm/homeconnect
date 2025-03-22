import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

const FloorPlan = () => {
	const [activeRoom, setActiveRoom] = useState('Living Room');

	const rooms = [
		'Living Room',
		'Bedroom',
		'Kitchen',
		'Garage',
		'aaaaa',
		'bbbbb',
	];

	return (
		<Card className="h-full bg-transparent border-none shadow-none p-0">
			{' '}
			<CardContent className="p-0 h-full">
				<ScrollArea className="w-full h-full">
					<div className="flex gap-4 h-full">
						{rooms.map((room) => (
							<Button
								key={room}
								variant={activeRoom === room ? 'default' : 'outline'}
								onClick={() => setActiveRoom(room)}
								className="flex-1 h-full w-60 cursor-pointer rounded-xl border-2 border-dashed border-muted-foreground/30 p-4 transition-all hover:border-primary hover:bg-muted/50 lg:h-72 lg:w-40"
							>
								{room}
							</Button>
						))}
					</div>
					<ScrollBar orientation="horizontal" className="hidden" />
				</ScrollArea>
			</CardContent>
		</Card>
	);
};

export default FloorPlan;
