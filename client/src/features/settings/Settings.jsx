import { useEffect } from 'react';
import { updatePageTitle } from '@/lib/utils';
import SettingsTabs from './components/SettingsTabs';
import { Cog } from 'lucide-react';
import { Toaster } from 'sonner';

function Settings() {
	useEffect(() => {
		updatePageTitle('Settings');
	}, []);

	return (
		<>
			<div className="container mx-auto py-10 px-4 sm:px-6 max-w-4xl animate-in fade-in duration-500">
				<div className="mb-10 flex items-center gap-5">
					<div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center shadow-sm">
						<Cog className="h-6 w-6 text-primary" />
					</div>
					<div>
						<h1 className="text-2xl font-semibold tracking-tight">Settings</h1>
						<p className="text-muted-foreground text-sm">
							Manage your account settings and preferences
						</p>
					</div>
				</div>

				<div className="flex justify-center w-full">
					<div className="w-full">
						<SettingsTabs />
					</div>
				</div>
			</div>
			<Toaster position="bottom-right" richColors closeButton />
		</>
	);
}

export default Settings;
