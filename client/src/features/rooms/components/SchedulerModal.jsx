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
import { ChevronDown, ChevronUp, Plus, Edit2, Trash2 } from 'lucide-react';

const DAYS_OF_WEEK = [
	{ id: 'mon', label: 'Mon' },
	{ id: 'tue', label: 'Tue' },
	{ id: 'wed', label: 'Wed' },
	{ id: 'thu', label: 'Thu' },
	{ id: 'fri', label: 'Fri' },
	{ id: 'sat', label: 'Sat' },
	{ id: 'sun', label: 'Sun' },
];

const SchedulerModal = ({ isOpen, onClose, appliance }) => {
	const [schedules, setSchedules] = useState([]);
	const [expandedId, setExpandedId] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [isAddingNew, setIsAddingNew] = useState(false);
	const [newSchedule, setNewSchedule] = useState({
		name: '',
		startTime: '',
		endTime: '',
		days: [],
	});

	useEffect(() => {
		if (isOpen && appliance) {
			fetchSchedules();
		}
	}, [isOpen, appliance]);

	const fetchSchedules = async () => {
		setIsLoading(true);
		try {
			// Mock data
			setTimeout(() => {
				setSchedules([
					{
						id: '1',
						name: 'Weekday Morning',
						startTime: '07:00',
						endTime: '09:00',
						days: ['mon', 'tue', 'wed', 'thu', 'fri'],
					},
					{
						id: '2',
						name: 'Weekend Schedule',
						startTime: '10:00',
						endTime: '18:00',
						days: ['sat', 'sun'],
					},
				]);
				setIsLoading(false);
			}, 500);
		} catch (error) {
			console.error('Failed to fetch schedules:', error);
			setIsLoading(false);
		}
	};

	const handleToggleExpand = (id) => {
		setExpandedId(expandedId === id ? null : id);
	};

	const handleAddSchedule = async () => {
		setIsLoading(true);
		try {
			// Mock response
			setTimeout(() => {
				const newId = Math.random().toString(36).substring(2, 9);
				setSchedules([...schedules, { ...newSchedule, id: newId }]);
				setNewSchedule({
					name: '',
					startTime: '',
					endTime: '',
					days: [],
				});
				setIsAddingNew(false);
				setIsLoading(false);
			}, 500);
		} catch (error) {
			console.error('Failed to add schedule:', error);
			setIsLoading(false);
		}
	};

	const handleDeleteSchedule = async (id) => {
		if (window.confirm('Are you sure you want to delete this schedule?')) {
			setIsLoading(true);
			try {
				setTimeout(() => {
					setSchedules(schedules.filter((schedule) => schedule.id !== id));
					setExpandedId(null);
					setIsLoading(false);
				}, 500);
			} catch (error) {
				console.error('Failed to delete schedule:', error);
				setIsLoading(false);
			}
		}
	};

	const handleEditSchedule = (id) => {
		const schedule = schedules.find((s) => s.id === id);
		setNewSchedule({ ...schedule });
		setIsAddingNew(true);
		setExpandedId(null);
	};

	const handleDaysChange = (dayId) => {
		setNewSchedule((prev) => ({
			...prev,
			days: prev.days.includes(dayId)
				? prev.days.filter((d) => d !== dayId)
				: [...prev.days, dayId],
		}));
	};

	const renderScheduleForm = () => (
		<div className="space-y-4 py-4">
			<div className="space-y-2">
				<Label htmlFor="name">Schedule Name</Label>
				<Input
					id="name"
					value={newSchedule.name}
					onChange={(e) =>
						setNewSchedule({ ...newSchedule, name: e.target.value })
					}
					placeholder="Enter schedule name"
				/>
			</div>

			<div className="grid grid-cols-2 gap-4">
				<div className="space-y-2">
					<Label>Start Time</Label>
					<Input
						type="time"
						value={newSchedule.startTime}
						onChange={(e) =>
							setNewSchedule({ ...newSchedule, startTime: e.target.value })
						}
					/>
				</div>
				<div className="space-y-2">
					<Label>End Time</Label>
					<Input
						type="time"
						value={newSchedule.endTime}
						onChange={(e) =>
							setNewSchedule({ ...newSchedule, endTime: e.target.value })
						}
					/>
				</div>
			</div>

			<div className="space-y-2">
				<Label>Days of Week</Label>
				<div className="grid grid-cols-7 gap-2">
					{DAYS_OF_WEEK.map((day) => (
						<Button
							key={day.id}
							variant={
								newSchedule.days.includes(day.id) ? 'default' : 'outline'
							}
							size="sm"
							onClick={() => handleDaysChange(day.id)}
							className="h-10"
						>
							{day.label}
						</Button>
					))}
				</div>
			</div>

			<div className="flex justify-end space-x-2 pt-4">
				<Button variant="outline" onClick={() => setIsAddingNew(false)}>
					Cancel
				</Button>
				<Button
					onClick={handleAddSchedule}
					disabled={
						isLoading ||
						!newSchedule.name ||
						!newSchedule.startTime ||
						!newSchedule.endTime ||
						newSchedule.days.length === 0
					}
				>
					{isLoading ? 'Saving...' : 'Save Schedule'}
				</Button>
			</div>
		</div>
	);

	const renderScheduleList = () => (
		<div className="py-4">
			<div className="flex justify-between items-center mb-4">
				<h3 className="text-lg font-medium">Schedules</h3>
				<Button
					size="sm"
					onClick={() => setIsAddingNew(true)}
					className="flex items-center gap-1"
				>
					<Plus className="h-4 w-4" /> Add
				</Button>
			</div>

			<div className="max-h-[350px] overflow-y-auto pr-2">
				{schedules.length === 0 ? (
					<div className="text-center py-8 text-muted-foreground">
						No schedules set up yet. Click "Add" to create your first schedule.
					</div>
				) : (
					<div className="space-y-3">
						{schedules.map((schedule) => (
							<div
								key={schedule.id}
								className="border rounded-lg overflow-hidden shadow-sm transition-all"
							>
								<div
									className="flex justify-between items-center p-4 cursor-pointer hover:bg-gray-100"
									onClick={() => handleToggleExpand(schedule.id)}
								>
									<div className="font-medium text-gray-800">
										{schedule.name}
									</div>
									{expandedId === schedule.id ? (
										<ChevronUp className="h-5 w-5 text-gray-600" />
									) : (
										<ChevronDown className="h-5 w-5 text-gray-600" />
									)}
								</div>

								{expandedId === schedule.id && (
									<div className="p-4 pt-0 border-t bg-gray-50">
										<div className="space-y-3 text-sm">
											<div className="flex justify-between">
												<span className="text-gray-500">Time:</span>
												<span className="font-medium text-gray-800">
													{schedule.startTime} - {schedule.endTime}
												</span>
											</div>
											{/* Updated Days row */}
											<div className="flex flex-col">
												<span className="text-gray-500">Days:</span>
												<div className="grid grid-cols-7 gap-1 mt-1">
													{DAYS_OF_WEEK.map((day) => (
														<span
															key={day.id}
															className={`h-8 flex items-center justify-center rounded-full text-sm ${
																schedule.days.includes(day.id)
																	? 'bg-primary text-primary-foreground'
																	: 'bg-gray-200 text-gray-600'
															}`}
														>
															{day.label}
														</span>
													))}
												</div>
											</div>
											<div className="flex justify-end gap-2 mt-2">
												<Button
													variant="outline"
													size="sm"
													className="flex items-center gap-1"
													onClick={(e) => {
														e.stopPropagation();
														handleEditSchedule(schedule.id);
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
														handleDeleteSchedule(schedule.id);
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
						{appliance ? `${appliance.name} Schedules` : 'Appliance Schedules'}
					</DialogTitle>
				</DialogHeader>

				{isLoading && schedules.length === 0 ? (
					<div className="py-8 flex justify-center">
						<div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-primary"></div>
					</div>
				) : isAddingNew ? (
					renderScheduleForm()
				) : (
					renderScheduleList()
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

export default SchedulerModal;
