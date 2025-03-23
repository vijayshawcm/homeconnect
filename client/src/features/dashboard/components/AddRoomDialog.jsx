import React, { useState } from 'react';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

const AddRoomDialog = ({
	isDialogOpen,
	setIsDialogOpen,
	roomType,
	setRoomType,
	roomName,
	setRoomName,
	handleAddRoom,
	errors,
	setErrors,
}) => {
	const [selectOpen, setSelectOpen] = useState(false);
	const [isRoomNameFocused, setIsRoomNameFocused] = useState(false);
	const [isSelectFocused, setIsSelectFocused] = useState(false);

	return (
		<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
			<DialogTrigger asChild>
				<Button size="sm" className="gap-1">
					<Plus className="h-4 w-4" />
					<span>Add Room</span>
				</Button>
			</DialogTrigger>
			<DialogContent className="w-[90%] rounded-lg">
				<DialogHeader>
					<DialogTitle>Add New Room</DialogTitle>
				</DialogHeader>
				<div className="space-y-4 py-4">
					{/* Room Type Field */}
					<div className="space-y-2">
						<div className="flex items-center space-x-1">
							<Label htmlFor="roomType">Room Type</Label>
							<span className="text-red-500">*</span>
							{errors?.roomType && (
								<span className="text-red-500 text-xs ml-auto">
									- {errors.roomType}
								</span>
							)}
						</div>
						<Select
							open={selectOpen}
							onOpenChange={setSelectOpen}
							value={roomType}
							onValueChange={(value) => {
								setRoomType(value);
								setSelectOpen(false); // close dropdown after selection
								if (value)
									setErrors((prev) => ({ ...prev, roomType: undefined }));
							}}
						>
							<SelectTrigger
								onFocus={() => setIsSelectFocused(true)}
								onBlur={() => setIsSelectFocused(false)}
								className={`
									border 
									focus:border-black focus-visible:ring-0 focus:outline-none 
									transition-colors duration-150
									${isSelectFocused ? 'border-black' : 'border-gray-300'}
									${errors?.roomType && !isSelectFocused ? 'border-red-500' : ''}
								`}
							>
								<SelectValue placeholder="Select type" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="bedroom">Bedroom</SelectItem>
								<SelectItem value="living_room">Living Room</SelectItem>
								<SelectItem value="kitchen">Kitchen</SelectItem>
								<SelectItem value="bathroom">Bathroom</SelectItem>
								<SelectItem value="other">Other</SelectItem>
							</SelectContent>
						</Select>
					</div>
					{/* Room Name Field */}
					<div className="space-y-2">
						<div className="flex items-center space-x-1">
							<Label htmlFor="roomName">Room Name</Label>
							<span className="text-red-500">*</span>
							{errors?.roomName && (
								<span className="text-red-500 text-xs ml-auto">
									- {errors.roomName}
								</span>
							)}
						</div>
						<Input
							id="roomName"
							value={roomName}
							onChange={(e) => {
								setRoomName(e.target.value);
								if (e.target.value)
									setErrors((prev) => ({ ...prev, roomName: undefined }));
							}}
							placeholder="Enter room name"
							onFocus={() => setIsRoomNameFocused(true)}
							onBlur={() => setIsRoomNameFocused(false)}
							className={`
								w-full border border-gray-300 
								focus:border-black focus-visible:ring-0 focus:outline-none 
								transition-colors duration-150
								${errors?.roomName && !isRoomNameFocused ? 'border-red-500' : ''}
							`}
						/>
					</div>
					<Button onClick={handleAddRoom} className="w-full">
						Add Room
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default AddRoomDialog;
