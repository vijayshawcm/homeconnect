import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Home, Lightbulb, DoorClosed, Zap } from 'lucide-react';

function ProfileStats() {
	const stats = [
		{
			title: 'Homes',
			value: 5,
			icon: Home,
			description: 'Total homes joined/created',
			color: 'text-blue-500',
			bgColor: 'bg-blue-500/10',
		},
		{
			title: 'Rooms',
			value: 5,
			icon: DoorClosed,
			description: 'Total rooms connected',
			color: 'text-teal-500',
			bgColor: 'bg-teal-500/10',
		},
		{
			title: 'Devices',
			value: 12,
			icon: Lightbulb,
			description: 'Active smart devices',
			color: 'text-amber-500',
			bgColor: 'bg-amber-500/10',
		},
		{
			title: 'Automations',
			value: 3,
			icon: Zap,
			description: 'Running automations',
			color: 'text-green-500',
			bgColor: 'bg-green-500/10',
		},
	];

	return (
		<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
			{stats.map((stat, index) => (
				<Card
					key={index}
					className="overflow-hidden border-border hover:shadow-md transition-shadow"
				>
					<CardHeader className="flex flex-row items-center justify-between pb-2 pt-4 px-4">
						<CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
						<div className={`p-1.5 rounded-full ${stat.bgColor}`}>
							<stat.icon className={`h-4 w-4 ${stat.color}`} />
						</div>
					</CardHeader>
					<CardContent className="px-4 pb-4 pt-0">
						<div className="text-2xl font-bold">{stat.value}</div>
						<p className="text-xs text-muted-foreground mt-2">
							{stat.description}
						</p>
					</CardContent>
				</Card>
			))}
		</div>
	);
}

export default ProfileStats;
