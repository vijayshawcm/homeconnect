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
			<div className="container mx-auto py-10 px-4 sm:px-6 max-w-[85%] animate-in fade-in duration-500">
				<div className="flex justify-center w-full">
					<div className="w-full">
						<SettingsTabs />
					</div>
				</div>
			</div>
			<Toaster position="bottom-right" richColors />
		</>
	);
}

export default Settings;
