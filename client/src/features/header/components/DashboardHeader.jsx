import { useState } from 'react';
import HeaderAvatar from './HeaderAvatar';
import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ScrollArea } from '@/components/ui/scroll-area';

const DashboardHeader = () => {
	const [notifications] = useState([
		{
			id: 1,
			title: 'Your call has been confirmed',
			description: '5 min ago',
			read: false,
		},
		{
			id: 2,
			title: 'You have a new message',
			description: '1 min ago',
			read: false,
		},
		{
			id: 3,
			title: 'Your subscription is expiring soon',
			description: '2 hours ago',
			read: false,
		},
		{
			id: 4,
			title: 'New device connected',
			description: 'Yesterday',
			read: true,
		},
		{
			id: 5,
			title: 'Energy usage report available',
			description: '2 days ago',
			read: true,
		},
	]);

	const unreadCount = notifications.filter((n) => !n.read).length;

	return (
		<div className="flex flex-1 items-center justify-between">
			<h1 className="text-xl lg:text-2xl xl:text-3xl font-bold">Dashboard</h1>
			<div className="flex items-center gap-2">
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="outline" size="icon" className="relative">
							<Bell className="h-4 w-4" />
							{unreadCount > 0 && (
								<span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-[10px] font-medium text-white flex items-center justify-center">
									{unreadCount}
								</span>
							)}
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent className="w-80" align="end">
						<DropdownMenuLabel className="font-normal">
							<div className="flex flex-col space-y-1">
								<p className="text-sm font-medium leading-none">
									Notifications
								</p>
								<p className="text-xs text-muted-foreground">
									You have {unreadCount} unread notifications
								</p>
							</div>
						</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<ScrollArea className="h-[300px]">
							<DropdownMenuGroup>
								{notifications.map((notification) => (
									<DropdownMenuItem
										key={notification.id}
										className="cursor-pointer"
									>
										<div className="flex items-start gap-2 py-2">
											<div
												className="mt-1 flex h-2 w-2 shrink-0 rounded-full bg-blue-500"
												style={{ opacity: notification.read ? 0.3 : 1 }}
											/>
											<div>
												<p
													className={`text-sm ${
														notification.read
															? 'text-muted-foreground'
															: 'font-medium'
													}`}
												>
													{notification.title}
												</p>
												<p className="text-xs text-muted-foreground">
													{notification.description}
												</p>
											</div>
										</div>
									</DropdownMenuItem>
								))}
							</DropdownMenuGroup>
						</ScrollArea>
						<DropdownMenuSeparator />
						<DropdownMenuItem className="cursor-pointer justify-center text-center">
							<span className="text-xs font-medium">Mark all as read</span>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
				<HeaderAvatar />
			</div>
		</div>
	);
};

export default DashboardHeader;
