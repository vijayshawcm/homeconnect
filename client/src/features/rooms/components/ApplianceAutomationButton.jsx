import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Zap } from 'lucide-react';
import AutomationModal from './AutomationModal';

const ApplianceAutomationButton = ({ appliance }) => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	return (
		<>
			<Button
				variant="outline"
				size="sm"
				className="flex items-center gap-1 bg-yellow-400 hover:bg-yellow-300"
				onClick={() => setIsModalOpen(true)}
			>
				<Zap className="h-4 w-4" /> Automations
			</Button>

			<AutomationModal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				appliance={appliance}
			/>
		</>
	);
};

export default ApplianceAutomationButton;
