import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Home, Lightbulb, Thermometer } from 'lucide-react';

function ProfileStats() {
	const stats = [
		{
			title: 'Homes',
			value: 5,
			icon: Home,
			description: 'Total homes joined/created',
		},
		{
			title: 'Rooms',
			value: 5,
			icon: Home,
			description: 'Total rooms connected',
		},
		{
			title: 'Devices',
			value: 12,
			icon: Lightbulb,
			description: 'Active smart devices',
		},
		{
			title: 'Automations',
			value: 3,
			icon: Thermometer,
			description: 'Running automations',
		},
	];

	return (
		<div className="grid gap-4 md:grid-cols-2">
			{stats.map((stat, index) => (
				<Card key={index}>
					<CardHeader className="flex flex-row items-center justify-between pb-2">
						<CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
						<stat.icon className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">{stat.value}</div>
						<p className="text-xs text-muted-foreground">{stat.description}</p>
					</CardContent>
				</Card>
			))}
		</div>
	);
}

export default ProfileStats;
