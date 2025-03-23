import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useHomeStore } from '@/store/home';
import { userAuthStore } from '@/store/userAuth';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2, Plus, Trash2 } from 'lucide-react';

const CreateHomeDialog = ({ open, onOpenChange }) => {
	const [activeTab, setActiveTab] = useState('details');
	const [homeName, setHomeName] = useState('');
	const [rooms, setRooms] = useState([]);
	const [newRoom, setNewRoom] = useState({ name: '', type: '' });
	const [isLoading, setIsLoading] = useState(false);
	const [errors, setErrors] = useState({});

	const { createHome } = useHomeStore();
	const { user } = userAuthStore();
	const navigate = useNavigate();

	// focus state for error handling
	const [isHomeNameFocused, setIsHomeNameFocused] = useState(false);
	const [isNewRoomNameFocused, setIsNewRoomNameFocused] = useState(false);
	const [isNewRoomTypeFocused, setIsNewRoomTypeFocused] = useState(false);

	const addRoom = () => {
		if (!newRoom.name || !newRoom.type) {
			setErrors({ ...errors, newRoom: 'Please enter both room name and type' });
			return;
		}

		if (
			rooms.some(
				(room) => room.name.toLowerCase() === newRoom.name.toLowerCase()
			)
		) {
			setErrors({ ...errors, newRoom: 'A room with this name already exists' });
			return;
		}

		setRooms([...rooms, newRoom]);
		setNewRoom({ name: '', type: newRoom.type });
		setErrors({ ...errors, newRoom: '', rooms: '' });
		toast.success(`Added ${newRoom.name} to your home`);
	};

	const handleCreateHome = async () => {
		if (!homeName.trim()) {
			setErrors({ ...errors, homeName: 'Please enter a home name' });
			setActiveTab('details');
			return;
		}

		if (rooms.length === 0) {
			setErrors({ ...errors, rooms: 'Please add at least one room' });
			setActiveTab('rooms');
			return;
		}

		setIsLoading(true);
		try {
			// simulate API call
			await new Promise((resolve) => setTimeout(resolve, 1500));

			// call the createHome function here
			// await createHome({ homeName, rooms, username: user.username }) etc etc watever

			toast.success('Home created successfully!'); // toasts dont work here idfk why but ill fix it ltr low priority tings brah
			onOpenChange(false);
			navigate('/dashboard');
		} catch (error) {
			console.error('Error creating home:', error);
			toast.error(error.message || 'Failed to create home. Please try again.');
		} finally {
			setIsLoading(false);
		}
	};

	const handleNext = () => {
		if (!homeName.trim()) {
			setErrors({ ...errors, homeName: 'Please enter a home name' });
			return;
		}
		setActiveTab('rooms');
	};

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-[500px]">
				<DialogHeader>
					<DialogTitle>Create a New Home</DialogTitle>
					<DialogDescription>
						Set up your new smart home by providing a name and adding rooms.
					</DialogDescription>
				</DialogHeader>

				<Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
					<TabsList className="grid w-full grid-cols-2">
						<TabsTrigger value="details">Home Details</TabsTrigger>
						<TabsTrigger value="rooms">Add Rooms</TabsTrigger>
					</TabsList>

					<TabsContent value="details" className="space-y-4 py-4">
						<div className="grid gap-2">
							<label htmlFor="home-name" className="text-sm font-medium">
								Home Name
							</label>
							<Input
								id="home-name"
								placeholder="Enter home name"
								value={homeName}
								onChange={(e) => {
									setHomeName(e.target.value);
									if (errors.homeName) setErrors({ ...errors, homeName: '' });
								}}
								onFocus={() => setIsHomeNameFocused(true)}
								onBlur={() => setIsHomeNameFocused(false)}
								className={`
									${errors.homeName && !isHomeNameFocused ? 'border-red-500' : ''}
								`}
							/>
							{errors.homeName && (
								<p className="text-sm text-red-500">{errors.homeName}</p>
							)}
						</div>

						<div className="flex justify-end">
							<Button onClick={handleNext}>Next</Button>
						</div>
					</TabsContent>

					<TabsContent value="rooms" className="space-y-4 py-4">
						<div className="grid gap-4">
							<div className="grid grid-cols-3 gap-2">
								<div className="col-span-2">
									<Input
										placeholder="Room Name"
										value={newRoom.name}
										onChange={(e) => {
											setNewRoom({ ...newRoom, name: e.target.value });
											if (errors.newRoom) setErrors({ ...errors, newRoom: '' });
										}}
										onFocus={() => setIsNewRoomNameFocused(true)}
										onBlur={() => setIsNewRoomNameFocused(false)}
										className={`
											${errors.newRoom && !isNewRoomNameFocused ? 'border-red-500' : ''}
										`}
									/>
								</div>
								<Select
									value={newRoom.type}
									onValueChange={(value) =>
										setNewRoom({ ...newRoom, type: value })
									}
								>
									<SelectTrigger
										onFocus={() => setIsNewRoomTypeFocused(true)}
										onBlur={() => setIsNewRoomTypeFocused(false)}
										className={`
											${errors.newRoom && !isNewRoomTypeFocused ? 'border-red-500' : ''}
										`}
									>
										<SelectValue placeholder="Type" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="living_room">Living Room</SelectItem>
										<SelectItem value="bedroom">Bedroom</SelectItem>
										<SelectItem value="kitchen">Kitchen</SelectItem>
										<SelectItem value="bathroom">Bathroom</SelectItem>
										<SelectItem value="other">Other</SelectItem>
									</SelectContent>
								</Select>
							</div>
							{errors.newRoom && (
								<p className="text-sm text-red-500">{errors.newRoom}</p>
							)}

							<Button onClick={addRoom} variant="outline" className="w-full">
								<Plus className="mr-2 h-4 w-4" />
								Add Room
							</Button>
						</div>

						<div className="mt-4">
							<h3 className="text-sm font-medium mb-2">Rooms Added:</h3>
							{errors.rooms && (
								<p className="text-sm text-red-500">{errors.rooms}</p>
							)}
							{rooms.length > 0 ? (
								<div className="border rounded-md p-2 max-h-[150px] overflow-y-auto">
									<ul className="space-y-1">
										{rooms.map((room, index) => (
											<li
												key={index}
												className="text-sm flex justify-between items-center"
											>
												<span>
													{room.name} - {room.type.replace('_', ' ')}
												</span>
												<Button
													variant="ghost"
													size="sm"
													onClick={() => {
														setRooms(rooms.filter((_, i) => i !== index));
													}}
													className="h-6 px-2"
												>
													<Trash2 className="h-4 w-4" />
												</Button>
											</li>
										))}
									</ul>
								</div>
							) : (
								<p className="text-sm text-muted-foreground">
									No rooms added yet.
								</p>
							)}
						</div>

						<DialogFooter className="flex justify-between">
							<Button variant="outline" onClick={() => setActiveTab('details')}>
								Back
							</Button>
							<Button onClick={handleCreateHome} disabled={isLoading}>
								{isLoading ? (
									<>
										<Loader2 className="mr-2 h-4 w-4 animate-spin" />
										Creating...
									</>
								) : (
									'Create Home'
								)}
							</Button>
						</DialogFooter>
					</TabsContent>
				</Tabs>
			</DialogContent>
		</Dialog>
	);
};

export default CreateHomeDialog;
