import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import {
	Loader2,
	Bell,
	Mail,
	Smartphone,
	Megaphone,
	AlertTriangle,
	Clock,
	CreditCard,
} from 'lucide-react';
import { userAuthStore } from '@/store/userAuth';

function NotificationSettings() {
	const { user } = userAuthStore();
	
	var userNotifs = {}
	var originalNotifs = {
		email: false,
		push: false,
		appliance: false,
		security: false,
		updates: false,
		billing: false,
	}

	// Set original notifications based on user notifications
	user.settings.notification.channels.forEach(e => Object.assign(userNotifs, {[e]: true}));
	user.settings.notification.types.forEach(e => Object.assign(userNotifs, {[e]: true}));
	userNotifs = {...originalNotifs, ...userNotifs};

	const [originalNotifications, setOriginalNotifications] = useState({
		email: true,
		push: false,
		appliance: true,
		security: true,
		updates: false,
		billing: true,
	});

	const [notifications, setNotifications] = useState({
		...userNotifs
	});

	console.log(notifications)

	const [isSaving, setIsSaving] = useState(false);

	const handleToggle = (key) => {
		setNotifications((prev) => ({
			...prev,
			[key]: !prev[key],
		}));
	};

	const handleReset = () => {
		setNotifications({ ...originalNotifications });
		toast.info('Settings reset', {
			description:
				'Notification settings have been reset to their original values',
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsSaving(true);

		// Slice the object to seperate channels and types
		var channels = [];
		var types = [];

		var i = 0;
		for(const key in notifications) {
			if(i<2) {
				if(notifications[key]) {
					channels.push(key)
				}
				
			} else {
				if(notifications[key]) {
					types.push(key)
				}
			}

			i++;
		}

		try {
			// api call
			
			const resChannel = await fetch("/server/users/updateNotificationChannel", {
				method: "PATCH",
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ username: user.username, channels }),
			})

			const resType = await fetch("/server/users/updateNotificationType", {
				method: "PATCH",
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ username: user.username, types }),
			})

			if(resChannel.ok && resType.ok) {
				setOriginalNotifications({ ...notifications });
				toast.success('Notification preferences updated successfully');
			} else {
				throw new Error('Failed to update notification preferences');
			}
		} catch (error) {
			toast.error('Failed to update notification preferences');
		} finally {
			setIsSaving(false);
		}
	};

	const notificationChannels = [
		{
			id: 'email',
			title: 'Email Notifications',
			description: 'Receive updates via email',
			icon: Mail,
			checked: notifications.email,
			color: 'text-blue-600 dark:text-blue-400',
			bgColor: 'bg-blue-100 dark:bg-blue-900/30',
		},
		{
			id: 'push',
			title: 'Push Notifications',
			description: 'Receive notifications on your device',
			icon: Smartphone,
			checked: notifications.push,
			color: 'text-purple-600 dark:text-purple-400',
			bgColor: 'bg-purple-100 dark:bg-purple-900/30',
		},
	];

	const notificationTypes = [
		{
			id: 'security',
			title: 'Security Alerts',
			description: 'Important security notifications',
			checked: notifications.security,
			icon: AlertTriangle,
			color: 'text-red-600 dark:text-red-400',
			bgColor: 'bg-red-100 dark:bg-red-900/30',
		},
		{
			id: 'updates',
			title: 'Product Updates',
			description: 'New features and improvements',
			checked: notifications.updates,
			icon: Bell,
			color: 'text-blue-600 dark:text-blue-400',
			bgColor: 'bg-blue-100 dark:bg-blue-900/30',
		},
		{
			id: 'appliance',
			title: 'Appliance Alerts',
			description: 'Changes in appliance status',
			icon: Bell,
			checked: notifications.appliance,
			color: 'text-amber-600 dark:text-amber-400',
			bgColor: 'bg-amber-100 dark:bg-amber-900/30',
		},
		{
			id: 'billing',
			title: 'Billing Notifications',
			description: 'Payment and subscription updates',
			checked: notifications.billing,
			icon: CreditCard,
			color: 'text-green-600 dark:text-green-400',
			bgColor: 'bg-green-100 dark:bg-green-900/30',
		},
	];

	const hasChanges =
		JSON.stringify(notifications) !== JSON.stringify(originalNotifications);

	return (
    <form onSubmit={handleSubmit}>
      <Card className="border-border/40 shadow-md hover:shadow-lg transition-shadow duration-300">
        <CardHeader className="pb-5 mb-6 bg-gradient-to-r from-[#7aee6f] to-[#C2E03A] rounded-tl-lg rounded-tr-lg">
          <div className="flex items-center gap-3">
            <div>
              <CardTitle className="text-lg font-medium">
                Notification Preferences
              </CardTitle>
              <CardDescription className="text-sm mt-0.5">
                Manage how you receive notifications from HomeConnect
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-8 pb-8">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="h-10 aspect-square rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center shadow-sm">
                <Bell className="h-1/2 w-1/2 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="text-base font-medium leading-tight">
                  Notification Channels
                </h3>
                <p className="text-sm text-muted-foreground mt-0.5">
                  Choose how you want to be notified
                </p>
              </div>
            </div>

            <div className="space-y-4 pl-14">
              {notificationChannels.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted/70 transition-colors duration-200"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`h-10 w-10 aspect-square rounded-full ${item.bgColor} flex items-center justify-center shadow-sm`}
                      >
                        <Icon className={`h-1/2 w-1/2 ${item.color}`} />
                      </div>
                      <div>
                        <Label
                          htmlFor={item.id}
                          className="text-base font-medium"
                        >
                          {item.title}
                        </Label>
                        <p className="text-sm text-muted-foreground mt-1">
                          {item.description}
                        </p>
                      </div>
                    </div>
                    <Switch
                      id={item.id}
                      checked={item.checked}
                      onCheckedChange={() => handleToggle(item.id)}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 aspect-square rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center shadow-sm">
                <Bell className="h-1/2 w-1/2 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <h3 className="text-base font-medium leading-tight">
                  Notification Types
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Select which types of notifications you want to receive
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-14">
              {notificationTypes.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted/70 transition-colors duration-200"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`h-10 w-10 aspect-square rounded-full ${item.bgColor} flex items-center justify-center shadow-sm`}
                      >
                        <Icon className={`h-1/2 w-1/2 ${item.color}`} />
                      </div>
                      <div>
                        <Label
                          htmlFor={`type-${item.id}`}
                          className="text-base font-medium"
                        >
                          {item.title}
                        </Label>
                        <p className="text-xs text-muted-foreground mt-1">
                          {item.description}
                        </p>
                      </div>
                    </div>
                    <Switch
                      id={`type-${item.id}`}
                      checked={item.checked}
                      onCheckedChange={() => handleToggle(item.id)}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-3 border-t pt-6 px-6">
          <Button
            type="button"
            variant="outline"
            onClick={handleReset}
            disabled={!hasChanges || isSaving}
            className="h-9 text-sm font-medium"
          >
            Reset
          </Button>
          <Button
            type="submit"
            disabled={isSaving || !hasChanges}
            className="h-9 text-sm font-medium"
          >
            {isSaving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              "Save Changes"
            )}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}

export default NotificationSettings;
