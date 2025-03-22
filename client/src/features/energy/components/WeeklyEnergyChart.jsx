import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
} from 'recharts';

const WeeklyEnergyChart = () => {
	const data = [
		{ name: 'Sun', electricity: 15, water: 10 },
		{ name: 'Mon', electricity: 12, water: 8 },
		{ name: 'Tue', electricity: 10, water: 6 },
		{ name: 'Wed', electricity: 8, water: 5 },
		{ name: 'Thu', electricity: 9, water: 5 },
		{ name: 'Fri', electricity: 11, water: 7 },
		{ name: 'Sat', electricity: 13, water: 11 },
	];

	return (
		<Card>
			<CardHeader className="pb-2">
				<CardTitle>Energy Usage - Week</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="flex items-center justify-center mb-2">
					<div className="flex items-center mr-4">
						<div className="w-3 h-3 bg-[#c1e82b] mr-1"></div>
						<span className="text-sm">Electricity</span>
					</div>
					<div className="flex items-center">
						<div className="w-3 h-3 bg-[#1e40af] mr-1"></div>
						<span className="text-sm">Water</span>
					</div>
				</div>
				<div className="h-[200px] w-full">
					<ResponsiveContainer width="100%" height="100%">
						<LineChart
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
							<Line
								type="monotone"
								dataKey="electricity"
								stroke="#c1e82b"
								activeDot={{ r: 8 }}
							/>
							<Line type="monotone" dataKey="water" stroke="#1e40af" />
						</LineChart>
					</ResponsiveContainer>
				</div>
			</CardContent>
		</Card>
	);
};

export default WeeklyEnergyChart;
