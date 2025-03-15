import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
	Lightbulb,
	Lock,
	Thermometer,
	Bell,
	DoorOpen,
	Power,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

function RecentActivity() {
	const activities = [
		{
			icon: Lightbulb,
			description: 'Living Room Lights turned on',
			timestamp: 'Today, 10:30 AM',
			color: 'text-amber-500',
			bgColor: 'bg-amber-500/10',
		},
		{
			icon: Lock,
			description: 'Front Door locked',
			timestamp: 'Today, 9:15 AM',
			color: 'text-red-500',
			bgColor: 'bg-red-500/10',
		},
		{
			icon: Thermometer,
			description: 'Thermostat set to 72°F',
			timestamp: 'Yesterday, 8:00 PM',
			color: 'text-purple-500',
			bgColor: 'bg-purple-500/10',
		},
		{
			icon: DoorOpen,
			description: 'Garage door opened',
			timestamp: 'Yesterday, 5:47 PM',
			color: 'text-green-500',
			bgColor: 'bg-green-500/10',
		},
		{
			icon: Power,
			description: 'TV turned off automatically',
			timestamp: 'Yesterday, 11:30 PM',
			color: 'text-gray-500',
			bgColor: 'bg-gray-500/10',
		},
	];

	return (
		<Card className="border-border mt-6">
			<CardHeader>
				<div className="flex items-center justify-between">
					<CardTitle>Recent Activity</CardTitle>
					<Button
						variant="ghost"
						size="sm"
						className="text-xs text-muted-foreground"
					>
						View All
					</Button>
				</div>
			</CardHeader>
			<CardContent>
				<div className="space-y-5">
					{activities.slice(0, 4).map((activity, index) => (
						<div key={index} className="flex items-start gap-4 group">
							<div
								className={`rounded-full p-2 ${activity.bgColor} group-hover:scale-110 transition-transform`}
							>
								<activity.icon className={`h-4 w-4 ${activity.color}`} />
							</div>
							<div className="flex-1 space-y-1">
								<p className="font-medium leading-none">
									{activity.description}
								</p>
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
