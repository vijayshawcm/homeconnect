import { useState, useEffect } from 'react';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { ChevronDown, ChevronUp, Plus, Edit2, Trash2 } from 'lucide-react';

const SENSOR_TYPES = [
	{ value: 'temperature', label: 'Temperature' },
	{ value: 'humidity', label: 'Humidity' },
	{ value: 'motion', label: 'Motion' },
	{ value: 'light', label: 'Light' },
	{ value: 'door', label: 'Door/Window' },
];

const CONDITION_TYPES = [
	{ value: 'greater', label: 'Greater than' },
	{ value: 'less', label: 'Less than' },
	{ value: 'equal', label: 'Equal to' },
	{ value: 'not_equal', label: 'Not equal to' },
	{ value: 'between', label: 'Between' },
];

const ACTION_TYPES = [
	{ value: 'turn_on', label: 'Turn On' },
	{ value: 'turn_off', label: 'Turn Off' },
	{ value: 'set_temperature', label: 'Set Temperature' },
	{ value: 'set_mode', label: 'Set Mode' },
];

const AutomationModal = ({ isOpen, onClose, appliance }) => {
	const [automations, setAutomations] = useState([]);
	const [expandedId, setExpandedId] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [isAddingNew, setIsAddingNew] = useState(false);
	const [newAutomation, setNewAutomation] = useState({
		name: '',
		sensor: '',
		condition: '',
		threshold: '',
		action: '',
		actionValue: '',
	});

	useEffect(() => {
		if (isOpen && appliance) {
			fetchAutomations();
		}
	}, [isOpen, appliance]);

	const fetchAutomations = async () => {
		setIsLoading(true);
		try {
			// const response = await fetch(`/server/appliances/${appliancesididididididid}/automations`);
			// const data = await response.json();
			// setAutomations(data);

			// Mock data
			setTimeout(() => {
				setAutomations([
					{
						id: '1',
						name: 'Auto-off when hot',
						sensor: 'temperature',
						condition: 'greater',
						threshold: '30°C',
						action: 'turn_off',
						actionValue: '',
					},
					{
						id: '2',
						name: 'Night mode',
						sensor: 'light',
						condition: 'less',
						threshold: '10 lux',
						action: 'set_mode',
						actionValue: 'sleep',
					},
					{
						id: '3',
						name: 'Morning warm-up',
						sensor: 'temperature',
						condition: 'less',
						threshold: '20°C',
						action: 'turn_on',
						actionValue: '',
					},
				]);
				setIsLoading(false);
			}, 500);
		} catch (error) {
			console.error('Failed to fetch automations:', error);
			setIsLoading(false);
		}
	};

	const handleToggleExpand = (id) => {
		setExpandedId(expandedId === id ? null : id);
	};

	const handleAddAutomation = async () => {
		setIsLoading(true);
		try {
			// const response = await fetch(`/server/appliances/${applianceiddddddd}/automations`, {
			//   method: 'POST',
			//   headers: { 'Content-Type': 'application/json' },
			//   body: JSON.stringify(newAutomation),
			// });
			// const data = await response.json();

			// Mock response
			setTimeout(() => {
				const newId = Math.random().toString(36).substring(2, 9);
				setAutomations([...automations, { ...newAutomation, id: newId }]);
				setNewAutomation({
					name: '',
					sensor: '',
					condition: '',
					threshold: '',
					action: '',
					actionValue: '',
				});
				setIsAddingNew(false);
				setIsLoading(false);
			}, 500);
		} catch (error) {
			console.error('Failed to add automation:', error);
			setIsLoading(false);
		}
	};

	const handleDeleteAutomation = async (id) => {
		if (window.confirm('Are you sure you want to delete this automation?')) {
			setIsLoading(true);
			try {
				// await fetch(`/server/automations/${id}`, {
				//   method: 'DELETE',
				// });

				// Mock response
				setTimeout(() => {
					setAutomations(
						automations.filter((automation) => automation.id !== id)
					);
					setExpandedId(null);
					setIsLoading(false);
				}, 500);
			} catch (error) {
				console.error('Failed to delete automation:', error);
				setIsLoading(false);
			}
		}
	};

	const handleEditAutomation = (id) => {
		const automation = automations.find((a) => a.id === id);
		setNewAutomation({ ...automation });
		setIsAddingNew(true);
		setExpandedId(null);
	};

	const renderAutomationForm = () => (
		<div className="space-y-4 py-4">
			<div className="space-y-2">
				<Label htmlFor="name">Automation Name</Label>
				<Input
					id="name"
					value={newAutomation.name}
					onChange={(e) =>
						setNewAutomation({ ...newAutomation, name: e.target.value })
					}
					placeholder="Enter automation name"
				/>
			</div>

			<div className="space-y-2">
				<Label htmlFor="sensor">Sensor Type</Label>
				<Select
					value={newAutomation.sensor}
					onValueChange={(value) =>
						setNewAutomation({ ...newAutomation, sensor: value })
					}
				>
					<SelectTrigger id="sensor">
						<SelectValue placeholder="Select sensor type" />
					</SelectTrigger>
					<SelectContent>
						{SENSOR_TYPES.map((type) => (
							<SelectItem key={type.value} value={type.value}>
								{type.label}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>

			<div className="space-y-2">
				<Label htmlFor="condition">Condition</Label>
				<Select
					value={newAutomation.condition}
					onValueChange={(value) =>
						setNewAutomation({ ...newAutomation, condition: value })
					}
				>
					<SelectTrigger id="condition">
						<SelectValue placeholder="Select condition" />
					</SelectTrigger>
					<SelectContent>
						{CONDITION_TYPES.map((type) => (
							<SelectItem key={type.value} value={type.value}>
								{type.label}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>

			<div className="space-y-2">
				<Label htmlFor="threshold">Threshold</Label>
				<Input
					id="threshold"
					value={newAutomation.threshold}
					onChange={(e) =>
						setNewAutomation({ ...newAutomation, threshold: e.target.value })
					}
					placeholder="Enter threshold value (e.g., 25°C)"
				/>
			</div>

			<div className="space-y-2">
				<Label htmlFor="action">Action</Label>
				<Select
					value={newAutomation.action}
					onValueChange={(value) =>
						setNewAutomation({ ...newAutomation, action: value })
					}
				>
					<SelectTrigger id="action">
						<SelectValue placeholder="Select action" />
					</SelectTrigger>
					<SelectContent>
						{ACTION_TYPES.map((type) => (
							<SelectItem key={type.value} value={type.value}>
								{type.label}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>

			{(newAutomation.action === 'set_temperature' ||
				newAutomation.action === 'set_mode') && (
				<div className="space-y-2">
					<Label htmlFor="actionValue">Action Value</Label>
					<Input
						id="actionValue"
						value={newAutomation.actionValue}
						onChange={(e) =>
							setNewAutomation({
								...newAutomation,
								actionValue: e.target.value,
							})
						}
						placeholder={
							newAutomation.action === 'set_temperature'
								? 'Enter temperature (e.g., 22°C)'
								: 'Enter mode (e.g., eco)'
						}
					/>
				</div>
			)}

			<div className="flex justify-end space-x-2 pt-4">
				<Button variant="outline" onClick={() => setIsAddingNew(false)}>
					Cancel
				</Button>
				<Button
					onClick={handleAddAutomation}
					disabled={
						isLoading ||
						!newAutomation.name ||
						!newAutomation.sensor ||
						!newAutomation.condition ||
						!newAutomation.threshold ||
						!newAutomation.action
					}
				>
					{isLoading ? 'Saving...' : 'Save Automation'}
				</Button>
			</div>
		</div>
	);

	const renderAutomationList = () => (
		<div className="py-4">
			<div className="flex justify-between items-center mb-4">
				<h3 className="text-lg font-medium">Automations</h3>
				<Button
					size="sm"
					onClick={() => setIsAddingNew(true)}
					className="flex items-center gap-1"
				>
					<Plus className="h-4 w-4" /> Add
				</Button>
			</div>

			<div className="max-h-[350px] overflow-y-auto pr-2">
				{automations.length === 0 ? (
					<div className="text-center py-8 text-muted-foreground">
						No automations set up yet. Click "Add" to create your first
						automation.
					</div>
				) : (
					<div className="space-y-3">
						{automations.map((automation) => (
							<div
								key={automation.id}
								className="border rounded-lg overflow-hidden"
							>
								<div
									className="flex justify-between items-center p-3 cursor-pointer hover:bg-muted/50"
									onClick={() => handleToggleExpand(automation.id)}
								>
									<div className="font-medium">{automation.name}</div>
									{expandedId === automation.id ? (
										<ChevronUp className="h-5 w-5 text-muted-foreground" />
									) : (
										<ChevronDown className="h-5 w-5 text-muted-foreground" />
									)}
								</div>

								{expandedId === automation.id && (
									<div className="p-3 pt-0 border-t bg-muted/20">
										<div className="grid gap-2 text-sm">
											<div className="flex justify-between">
												<span className="text-muted-foreground">Sensor:</span>
												<span className="font-medium">
													{SENSOR_TYPES.find(
														(t) => t.value === automation.sensor
													)?.label || automation.sensor}
												</span>
											</div>
											<div className="flex justify-between">
												<span className="text-muted-foreground">
													Condition:
												</span>
												<span className="font-medium">
													{CONDITION_TYPES.find(
														(t) => t.value === automation.condition
													)?.label || automation.condition}
												</span>
											</div>
											<div className="flex justify-between">
												<span className="text-muted-foreground">
													Threshold:
												</span>
												<span className="font-medium">
													{automation.threshold}
												</span>
											</div>
											<div className="flex justify-between">
												<span className="text-muted-foreground">Action:</span>
												<span className="font-medium">
													{ACTION_TYPES.find(
														(t) => t.value === automation.action
													)?.label || automation.action}
													{automation.actionValue &&
														` (${automation.actionValue})`}
												</span>
											</div>
											<div className="flex justify-end gap-2 mt-2">
												<Button
													variant="outline"
													size="sm"
													className="flex items-center gap-1"
													onClick={(e) => {
														e.stopPropagation();
														handleEditAutomation(automation.id);
													}}
												>
													<Edit2 className="h-3.5 w-3.5" /> Edit
												</Button>
												<Button
													variant="destructive"
													size="sm"
													className="flex items-center gap-1"
													onClick={(e) => {
														e.stopPropagation();
														handleDeleteAutomation(automation.id);
													}}
												>
													<Trash2 className="h-3.5 w-3.5" /> Delete
												</Button>
											</div>
										</div>
									</div>
								)}
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className="sm:max-w-[500px]">
				<DialogHeader>
					<DialogTitle>
						{appliance
							? `${appliance.name} Automations`
							: 'Appliance Automations'}
					</DialogTitle>
				</DialogHeader>

				{isLoading && automations.length === 0 ? (
					<div className="py-8 flex justify-center">
						<div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-primary"></div>
					</div>
				) : isAddingNew ? (
					renderAutomationForm()
				) : (
					renderAutomationList()
				)}

				{!isAddingNew && (
					<DialogFooter>
						<Button variant="outline" onClick={onClose}>
							Close
						</Button>
					</DialogFooter>
				)}
			</DialogContent>
		</Dialog>
	);
};

export default AutomationModal;
