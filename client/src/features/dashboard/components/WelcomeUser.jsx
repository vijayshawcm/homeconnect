import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';
import { useState } from 'react';
import ManageHomeDialog from './ManageHomeDialog';

const WelcomeUser = ({ user }) => {
	const currentTime = new Date();
	const hours = currentTime.getHours();
	const [isManageHomeOpen, setIsManageHomeOpen] = useState(false);

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
						<Button
							variant="outline"
							size="sm"
							className="gap-1"
							onClick={() => {
								setIsManageHomeOpen(true);
								document.getElementById('manage-home-trigger').click();
							}}
						>
							<Home className="h-4 w-4" />
							<span className="hidden sm:inline">Manage Home</span>
						</Button>
					</div>
				</div>
			</CardContent>

			{/* Manage Home Dialog */}
			<ManageHomeDialog
				open={isManageHomeOpen}
				onOpenChange={setIsManageHomeOpen}
			/>
		</Card>
	);
};

export default WelcomeUser;
