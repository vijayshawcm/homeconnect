import {
	ChartContainer,
	ChartLegend,
	ChartLegendContent,
	ChartTooltip,
	ChartTooltipContent,
} from '@/components/ui/chart';
import { useHomeStore } from '@/store/home';
import {
	Bar,
	BarChart,
	CartesianGrid,
	XAxis,
	YAxis,
	ResponsiveContainer,
} from 'recharts';

const chartData = [
	{ month: "Admin's ", light: 20, fan: 80, airConditioner: 200 },
	{ month: "Admin's Bedroom", light: 50, fan: 129, airConditioner: 190 },
	{ month: 'March', light: 120, fan: 80, airConditioner: 90 },
	{ month: 'April', light: 290, fan: 80, airConditioner: 320 },
];

const chartConfig = {
	light: {
		label: 'Lights',
		color: 'hsl(var(--primary))',
	},
	fan: {
		label: 'Fan',
		color: 'hsl(var(--secondary))',
	},
	airConditioner: {
		label: 'Air Conditioner',
		color: 'hsl(var(--muted))',
	},
};

const SummaryChart = () => {
	const { currentHome } = useHomeStore();

	return (
		<div className="w-full">
			<ChartContainer config={chartConfig}>
				<ResponsiveContainer width="100%" height="100%">
					<BarChart data={chartData}>
						<CartesianGrid vertical={false} strokeDasharray="3 3" />
						<XAxis
							dataKey="month"
							tickLine={false}
							axisLine={false}
							fontSize={12}
						/>
						<YAxis tickLine={false} axisLine={false} fontSize={12} />
						<ChartTooltip content={<ChartTooltipContent />} />
						<ChartLegend content={<ChartLegendContent />} />
						<Bar dataKey="light" fill="var(--color-light)" radius={4} />
						<Bar dataKey="fan" fill="var(--color-fan)" radius={4} />
						<Bar
							dataKey="airConditioner"
							fill="var(--color-airConditioner)"
							radius={4}
						/>
					</BarChart>
				</ResponsiveContainer>
			</ChartContainer>
		</div>
	);
};

export default SummaryChart;
