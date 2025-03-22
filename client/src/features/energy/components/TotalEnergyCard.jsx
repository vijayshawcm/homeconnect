import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const TotalEnergyCard = () => {
	return (
		<Card>
			<CardHeader className="pb-2">
				<CardTitle>Total Energy Usage</CardTitle>
			</CardHeader>
			<CardContent className="flex justify-center items-center">
				<div className="relative w-48 h-48">
					<svg viewBox="0 0 100 100" className="w-full h-full">
						<circle
							cx="50"
							cy="50"
							r="40"
							fill="none"
							stroke="#e2e8f0"
							strokeWidth="15"
						/>
						<circle
							cx="50"
							cy="50"
							r="40"
							fill="none"
							stroke="#c1e82b"
							strokeWidth="15"
							strokeDasharray="251.2 167.5"
							strokeDashoffset="0"
							transform="rotate(-90 50 50)"
						/>
						<circle cx="50" cy="50" r="30" fill="white" />
					</svg>
					<div className="absolute inset-0 flex flex-col items-center justify-center">
						<span className="text-2xl font-bold">20 Kwh</span>
					</div>
				</div>
			</CardContent>
		</Card>
	);
};

export default TotalEnergyCard;
