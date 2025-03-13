import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
	Lightbulb,
	Speaker,
	Tv,
	Thermometer,
	Lock,
	Camera,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

function ConnectedDevices() {
	const devices = [
		{
			name: 'Living Room Lights',
			type: 'Philips Hue',
			status: 'Online',
			icon: Lightbulb,
			lastActive: '2 minutes ago',
			color: 'text-amber-500',
		},
		{
			name: 'Smart Speaker',
			type: 'Amazon Echo',
			status: 'Online',
			icon: Speaker,
			lastActive: 'Active now',
			color: 'text-blue-500',
		},
		{
			name: 'Living Room TV',
			type: 'Samsung Smart TV',
			status: 'Offline',
			icon: Tv,
			lastActive: '3 hours ago',
			color: 'text-gray-500',
		},
		{
			name: 'Thermostat',
			type: 'Nest',
			status: 'Online',
			icon: Thermometer,
			lastActive: 'Active now',
			color: 'text-green-500',
		},
		{
			name: 'Front Door Lock',
			type: 'August',
			status: 'Online',
			icon: Lock,
			lastActive: '15 minutes ago',
			color: 'text-purple-500',
		},
		{
			name: 'Security Camera',
			type: 'Ring',
			status: 'Online',
			icon: Camera,
			lastActive: 'Active now',
			color: 'text-red-500',
		},
	];

	return (
		<Card className="border-border">
			<CardHeader>
				<CardTitle>Connected Devices</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
					{devices.map((device, index) => (
						<div
							key={index}
							className="flex items-start gap-3 p-3 rounded-lg border border-border hover:bg-accent/50 transition-colors cursor-pointer"
						>
							<div className="mt-1">
								<device.icon className={`h-5 w-5 ${device.color}`} />
							</div>
							<div className="flex-1 min-w-0">
								<div className="flex items-center justify-between gap-2">
									<h3 className="font-medium truncate">{device.name}</h3>
									<Badge
										variant={
											device.status === 'Online' ? 'outline' : 'secondary'
										}
										className="text-xs"
									>
										{device.status}
									</Badge>
								</div>
								<p className="text-xs text-muted-foreground mt-1">
									{device.type}
								</p>
								<p className="text-xs mt-2">{device.lastActive}</p>
							</div>
						</div>
					))}
				</div>
			</CardContent>
		</Card>
	);
}

export default ConnectedDevices;
