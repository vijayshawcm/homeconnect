import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Lightbulb, Lock, Thermometer } from 'lucide-react';

function RecentActivity() {
	const activities = [
		{
			icon: Lightbulb,
			description: 'Living Room Lights turned on',
			timestamp: 'Today, 10:30 AM',
		},
		{
			icon: Lock,
			description: 'Front Door locked',
			timestamp: 'Today, 9:15 AM',
		},
		{
			icon: Thermometer,
			description: 'Thermostat set to 72°F',
			timestamp: 'Yesterday, 8:00 PM',
		},
	];

	return (
		<Card className="mt-6">
			<CardHeader>
				<CardTitle>Recent Activity</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="space-y-4">
					{activities.map((activity, index) => (
						<div key={index} className="flex items-start gap-4">
							<div className="rounded-full bg-primary/10 p-2">
								<activity.icon className="h-4 w-4 text-primary" />
							</div>
							<div className="flex-1">
								<p>{activity.description}</p>
								<p className="text-sm text-muted-foreground">
									{activity.timestamp}
								</p>
							</div>
						</div>
					))}
				</div>
			</CardContent>
		</Card>
	);
}

export default RecentActivity;
