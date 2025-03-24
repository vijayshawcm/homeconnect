import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { MapPin, Home, Trash2, PenLine, LogOut } from 'lucide-react';
import { useHomeStore } from '@/store/home';
import { userAuthStore } from '@/store/userAuth';
import { toast } from 'sonner';

const ManageHomeDialog = ({ open, onOpenChange }) => {
	const [homeName, setHomeName] = useState('');
	const [location, setLocation] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();

	const { currentHome, homes } = useHomeStore();
	const { user } = userAuthStore();

	// Debug permissions - toggle these values to test different scenarios
	const DEBUG_PERMISSIONS = {
		isOwner: true, // Set false to test dweller permissions
		canRename: true, // Set false to test rename restriction
		canDelete: true, // Set false to test delete restriction
		canSetLocation: true, // Set false to test location edit restriction
		canLeave: false, // Set true to test leave home as dweller
	};

	// Production role/permission checks (commented for debug purposes)
	// const isOwner = currentHome?.owner === user?._id;
	// const userDwellerPermissions = currentHome?.dwellers?.find(d => d.user === user?._id)?.permissions || [];
	// const hasRenamePermission = isOwner || userDwellerPermissions.includes('rename');
	// const canDelete = isOwner;
	// const canSetLocation = isOwner;
	// const canLeave = !isOwner;

	// Debug implementations
	const isOwner = DEBUG_PERMISSIONS.isOwner;
	const hasRenamePermission = isOwner ? true : DEBUG_PERMISSIONS.canRename;
	const canDelete = DEBUG_PERMISSIONS.canDelete;
	const canSetLocation = DEBUG_PERMISSIONS.canSetLocation;
	const canLeave = DEBUG_PERMISSIONS.canLeave;

	useEffect(() => {
		if (currentHome) {
			setHomeName(currentHome.name || '');
			setLocation(currentHome.location || '');
		}
	}, [currentHome, open]);

	const handleRenameHome = async () => {
		if (!homeName.trim()) {
			toast.error('Home name cannot be empty');
			return;
		}

		setIsLoading(true);
		try {
			const response = await fetch(`/server/homes/${currentHome._id}`, {
				method: 'PATCH',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ name: homeName }),
			});

			const data = await response.json();

			if (data.success) {
				toast.success('Home renamed successfully');
				//update home store
				useHomeStore.getState().updateHome();
				setOpen(false);
			} else {
				toast.error(data.message || 'Failed to rename home');
			}
		} catch (error) {
			console.error('Error renaming home:', error);
			toast.error('An error occurred while renaming the home');
		} finally {
			setIsLoading(false);
		}
	};

	const handleUpdateLocation = async () => {
		if (!location.trim()) {
			toast.error('Location cannot be empty');
			return;
		}

		setIsLoading(true);
		try {
			const response = await fetch(`/server/homes/${currentHome._id}`, {
				method: 'PATCH',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ location }),
			});

			const data = await response.json();

			if (data.success) {
				toast.success('Home location updated successfully');
				// update home store
				useHomeStore.getState().updateHome();
				setOpen(false);
			} else {
				toast.error(data.message || 'Failed to update location');
			}
		} catch (error) {
			console.error('Error updating location:', error);
			toast.error('An error occurred while updating the location');
		} finally {
			setIsLoading(false);
		}
	};

	const handleDeleteHome = async () => {
		setIsLoading(true);
		try {
			const response = await fetch(`/server/homes/${currentHome._id}`, {
				method: 'DELETE',
			});

			const data = await response.json();

			if (data.success) {
				toast.success('Home deleted successfully');
				navigate('/dashboard');
				// update homes list
				useHomeStore.getState().fetchHomeByUserId(user._id);
				setOpen(false);
			} else {
				toast.error(data.message || 'Failed to delete home');
			}
		} catch (error) {
			console.error('Error deleting home:', error);
			toast.error('An error occurred while deleting the home');
		} finally {
			setIsLoading(false);
		}
	};

	const handleLeaveHome = async () => {
		setIsLoading(true);
		try {
			const response = await fetch(`/server/homes/${currentHome._id}/leave`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ userId: user._id }),
			});

			const data = await response.json();

			if (data.success) {
				toast.success('You have left the home');
				navigate('/dashboard');
				// update homes list
				useHomeStore.getState().fetchHomeByUserId(user._id);
				setOpen(false);
			} else {
				toast.error(data.message || 'Failed to leave home');
			}
		} catch (error) {
			console.error('Error leaving home:', error);
			toast.error('An error occurred while leaving the home');
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle className="flex items-center gap-2">
						<Home className="h-5 w-5" />
						Manage Home: {currentHome?.name}
					</DialogTitle>
				</DialogHeader>

				<Tabs defaultValue="general" className="w-full">
					<TabsList className="grid w-full grid-cols-2">
						<TabsTrigger value="general">General</TabsTrigger>
						<TabsTrigger value="advanced">Advanced</TabsTrigger>
					</TabsList>

					<TabsContent value="general" className="space-y-4 pt-4">
						{/* Rename Home Section */}
						{hasRenamePermission && (
							<div className="space-y-2">
								<Label htmlFor="home-name" className="text-sm font-medium">
									Home Name
								</Label>
								<div className="flex gap-2">
									<Input
										id="home-name"
										value={homeName}
										onChange={(e) => setHomeName(e.target.value)}
										placeholder="Enter home name"
										disabled={isLoading}
									/>
									<Button
										onClick={handleRenameHome}
										disabled={isLoading || homeName === currentHome?.name}
										size="icon"
									>
										<PenLine className="h-4 w-4" />
									</Button>
								</div>
							</div>
						)}

						{/* Location Section */}
						{canSetLocation && (
							<div className="space-y-2">
								<Label htmlFor="home-location" className="text-sm font-medium">
									Home Location
								</Label>
								<div className="flex gap-2">
									<Input
										id="home-location"
										value={location}
										onChange={(e) => setLocation(e.target.value)}
										placeholder="Enter home location"
										disabled={isLoading}
									/>
									<Button
										onClick={handleUpdateLocation}
										disabled={isLoading || location === currentHome?.location}
										size="icon"
									>
										<MapPin className="h-4 w-4" />
									</Button>
								</div>
							</div>
						)}
					</TabsContent>

					<TabsContent value="advanced" className="space-y-4 pt-4">
						{/* Leave Home Section */}
						{canLeave && (
							<AlertDialog>
								<AlertDialogTrigger asChild>
									<Button variant="destructive" className="w-full">
										<LogOut className="h-4 w-4 mr-2" />
										Leave Home
									</Button>
								</AlertDialogTrigger>
								<AlertDialogContent>
									<AlertDialogHeader>
										<AlertDialogTitle>Are you sure?</AlertDialogTitle>
										<AlertDialogDescription>
											This will remove you from this home. You will need an
											invitation to rejoin.
										</AlertDialogDescription>
									</AlertDialogHeader>
									<AlertDialogFooter>
										<AlertDialogCancel>Cancel</AlertDialogCancel>
										<AlertDialogAction
											onClick={handleLeaveHome}
											disabled={isLoading}
										>
											{isLoading ? 'Leaving...' : 'Leave Home'}
										</AlertDialogAction>
									</AlertDialogFooter>
								</AlertDialogContent>
							</AlertDialog>
						)}

						{/* Delete Home Section */}
						{canDelete && (
							<AlertDialog>
								<AlertDialogTrigger asChild>
									<Button variant="destructive" className="w-full">
										<Trash2 className="h-4 w-4 mr-2" />
										Delete Home
									</Button>
								</AlertDialogTrigger>
								<AlertDialogContent>
									<AlertDialogHeader>
										<AlertDialogTitle>
											Are you absolutely sure?
										</AlertDialogTitle>
										<AlertDialogDescription>
											This action cannot be undone. This will permanently delete
											your home and remove all associated data including rooms
											and appliances.
										</AlertDialogDescription>
									</AlertDialogHeader>
									<AlertDialogFooter>
										<AlertDialogCancel>Cancel</AlertDialogCancel>
										<AlertDialogAction
											onClick={handleDeleteHome}
											disabled={isLoading}
										>
											{isLoading ? 'Deleting...' : 'Delete Home'}
										</AlertDialogAction>
									</AlertDialogFooter>
								</AlertDialogContent>
							</AlertDialog>
						)}
					</TabsContent>
				</Tabs>

				<DialogFooter>
					<Button variant="outline" onClick={() => setOpen(false)}>
						Close
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default ManageHomeDialog;
