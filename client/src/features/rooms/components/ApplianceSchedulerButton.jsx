import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Clock } from 'lucide-react';
import SchedulerModal from './SchedulerModal';

const ApplianceSchedulerButton = ({ appliance }) => {
	const [isModalOpen, setIsModalOpen] = useState(false);

	return (
		<>
			<Button
				variant="outline"
				size="sm"
				className="flex items-center gap-1 bg-blue-400 hover:bg-blue-300 dark:bg-blue-600 dark:hover:bg-blue-500"
				onClick={() => setIsModalOpen(true)}
			>
				<Clock className="h-4 w-4" /> Schedule
			</Button>

			<SchedulerModal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				appliance={appliance}
			/>
		</>
	);
};

export default ApplianceSchedulerButton;
