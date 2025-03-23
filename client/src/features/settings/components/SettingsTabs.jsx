import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AccountSettings from './AccountSettings';
import NotificationSettings from './NotificationSettings';
import AppearanceSettings from './AppearanceSettings';
import SecuritySettings from './SecuritySettings';
import { User, Bell, Palette, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

function SettingsTabs() {
	const [activeTab, setActiveTab] = useState('account');

	const tabItems = [
		{ id: 'account', label: 'Account', icon: User },
		{ id: 'notifications', label: 'Notifications', icon: Bell },
		// { id: 'appearance', label: 'Appearance', icon: Palette },
		{ id: 'security', label: 'Security', icon: Shield },
	];

	return (
		<Tabs
			defaultValue="account"
			value={activeTab}
			onValueChange={setActiveTab}
			className="w-full space-y-8"
		>
			<div className="flex justify-center">
				<TabsList className="grid grid-cols-3 h-auto p-1 bg-muted/80 rounded-xl w-full mx-auto">
					{tabItems.map((tab) => {
						const Icon = tab.icon;
						return (
              <TabsTrigger
                key={tab.id}
                value={tab.id}
                className="relative py-3 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm rounded-lg transition-all duration-200 overflow-hidden"
              >
                <div className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2">
                  <Icon className="h-4 w-4" />
                  <span className="text-sm">{tab.label}</span>
                </div>
                {activeTab === tab.id && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C2E03A]"
                    layoutId="activeTab"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                )}
              </TabsTrigger>
            );
					})}
				</TabsList>
			</div>

			<div className="mt-6 relative">
				<TabsContent value="account" className="mt-0 space-y-6 mx-auto">
					<AccountSettings />
				</TabsContent>

				<TabsContent value="notifications" className="mt-0 space-y-6 mx-auto">
					<NotificationSettings />
				</TabsContent>

				<TabsContent value="appearance" className="mt-0 space-y-6 mx-auto">
					<AppearanceSettings />
				</TabsContent>

				<TabsContent value="security" className="mt-0 space-y-6 mx-auto">
					<SecuritySettings />
				</TabsContent>
			</div>
		</Tabs>
	);
}

export default SettingsTabs;
