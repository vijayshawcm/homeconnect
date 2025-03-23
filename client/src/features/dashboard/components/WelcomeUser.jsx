import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bell, Settings } from 'lucide-react';

const WelcomeUser = ({ user }) => {
	const currentTime = new Date();
	const hours = currentTime.getHours();

	let greeting;
	if (hours < 12) {
		greeting = 'Good Morning';
	} else if (hours < 18) {
		greeting = 'Good Afternoon';
	} else {
		greeting = 'Good Evening';
	}

	return (
		<Card className="border shadow-sm">
			<CardContent className="p-6">
				<div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
					<div>
						<h1 className="text-3xl font-bold tracking-tight">
							{greeting}, {user}
						</h1>
						<p className="text-muted-foreground mt-1">
							Welcome to your smart home dashboard. You have 3 active devices.
						</p>
					</div>

					<div className="flex items-center gap-2">
						<Button variant="outline" size="sm" className="gap-1">
							<Bell className="h-4 w-4" />
							<span className="hidden sm:inline">Notifications</span>
						</Button>
						<Button variant="outline" size="sm" className="gap-1">
							<Settings className="h-4 w-4" />
							<span className="hidden sm:inline">Settings</span>
						</Button>
					</div>
				</div>
			</CardContent>
		</Card>
	);
};

export default WelcomeUser;
