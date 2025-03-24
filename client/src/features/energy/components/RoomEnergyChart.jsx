import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
} from 'recharts';

const RoomEnergyChart = () => {
	const data = [
		{
			name: 'Garage',
			lights: 5,
			water: 3,
			airConditioner: 2,
		},
		{
			name: 'Kitchen',
			lights: 14,
			water: 12,
			airConditioner: 8,
		},
		{
			name: 'Bedroom',
			lights: 18,
			water: 14,
			airConditioner: 10,
		},
		{
			name: 'Living Room',
			lights: 20,
			water: 5,
			airConditioner: 10,
		},
	];

	return (
		<Card className = "flex-1 flex flex-col">
			<CardHeader className="pb-2">
				<CardTitle>Energy Usage - Room</CardTitle>
			</CardHeader>
			<CardContent className = "flex-1 flex flex-col">
				<div className="flex-1 w-full">
					<ResponsiveContainer width="100%" height="100%">
						<BarChart
							data={data}
							margin={{
								top: 5,
								right: 30,
								left: 0,
								bottom: 5,
							}}
						>
							<CartesianGrid strokeDasharray="3 3" />
							<XAxis dataKey="name" />
							<YAxis />
							<Tooltip />
							<Bar dataKey="lights" fill="#c1e82b" />
							<Bar dataKey="water" fill="#1e40af" />
							<Bar dataKey="airConditioner" fill="#333333" />
						</BarChart>
					</ResponsiveContainer>
				</div>
			</CardContent>
		</Card>
	);
};

export default RoomEnergyChart;
