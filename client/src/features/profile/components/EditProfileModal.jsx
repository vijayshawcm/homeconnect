import { useState } from 'react';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
	DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Camera, Loader2 } from 'lucide-react';
import { showToast } from '@/lib/toast';

const MAX_BIO_LENGTH = 150;

function EditProfileModal({ isOpen, onClose, user, onSave }) {
	const [isLoading, setIsLoading] = useState(false);
	const [fullName, setFullName] = useState(user?.fullName || '');
	const [username, setUsername] = useState(user?.username || '');
	const [email] = useState(user?.email || '');
	const [bio, setBio] = useState(user?.bio || '');
	const [avatarUrl, setAvatarUrl] = useState(user?.avatarUrl || '');
	const [errors, setErrors] = useState({});
	const [updateError, setUpdateError] = useState('');

	// Track focus state for input fields
	const [isFullNameFocused, setIsFullNameFocused] = useState(false);
	const [isUsernameFocused, setIsUsernameFocused] = useState(false);

	// Handle bio change with char limit
	const handleBioChange = (e) => {
		const value = e.target.value;
		if (value.length <= MAX_BIO_LENGTH) {
			setBio(value);
		}
	};

	// Get initials for avatar fallback
	const getInitials = (name) => {
		return name
			.split(' ')
			.map((part) => part[0])
			.join('')
			.toUpperCase();
	};

	// Validate form
	const validateForm = () => {
		const newErrors = {};

		if (!fullName.trim()) {
			newErrors.fullName = 'Full Name is required';
			setErrors(newErrors); // Update errors state
			return false; // Stop further validation
		}

		if (!username.trim()) {
			newErrors.username = 'Username is required';
			setErrors(newErrors); // Update errors state
			return false; // Stop further validation
		} else if (!/^[a-zA-Z0-9_]+$/.test(username)) {
			newErrors.username =
				'Username can only contain letters, numbers, and underscores';
			setErrors(newErrors); // Update errors state
			return false; // Stop further validation
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0; // Return true if no errors
	};

	// Handle avatar upload
	const handleAvatarUpload = () => {
		setAvatarUrl(`https://i.pravatar.cc/150?u=${Date.now()}`);
	};

	// Handle form submission
	const handleSubmit = async (e) => {
		e.preventDefault();

		// Clear previous errors
		setErrors({});
		setUpdateError('');

		// Validate Form
		if (!validateForm()) return;

		setIsLoading(true);

		try {
			// API call here
			await new Promise((resolve) => setTimeout(resolve, 1000));

			// Call onSave cb with updated data
			onSave({
				fullName,
				username,
				bio,
				avatarUrl,
			});

			// Show success toast
			showToast.success(
				'Profile updated',
				'Your profile has been updated successfully.'
			);

			// Close modal
			onClose();
		} catch (error) {
			setUpdateError(
				error.message || 'Failed to update profile. Please try again.'
			);
			showToast.error('Error', 'Failed to update profile. Please try again.');
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className="sm:max-w-[500px]">
				<form onSubmit={handleSubmit} noValidate>
					<DialogHeader>
						<DialogTitle>Edit Profile</DialogTitle>
						<DialogDescription>
							Make changes to your profile information.
						</DialogDescription>
					</DialogHeader>

					<div className="flex justify-center my-6">
						<div className="relative">
							<Avatar
								className="h-24 w-24 cursor-pointer"
								onClick={handleAvatarUpload}
							>
								<AvatarImage src={avatarUrl} />
								<AvatarFallback className="text-xl bg-primary/10 text-primary">
									{fullName ? getInitials(fullName) : '?'}
								</AvatarFallback>
							</Avatar>

							<div
								className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer"
								onClick={handleAvatarUpload}
							>
								<Camera className="h-6 w-6 text-white" />
							</div>
						</div>
					</div>

					<div className="grid gap-4 py-4">
						{/* Full Name Field */}
						<div className="space-y-1">
							<div className="flex items-center space-x-1">
								<Label htmlFor="fullName" className="text-sm">
									Full Name
								</Label>
								<span className="text-red-500">*</span>
								{errors.fullName && (
									<span className="text-red-500 text-xs ml-auto">
										- {errors.fullName}
									</span>
								)}
							</div>
							<Input
								id="fullName"
								type="text"
								value={fullName}
								onChange={(e) => setFullName(e.target.value)}
								onFocus={() => setIsFullNameFocused(true)}
								onBlur={() => setIsFullNameFocused(false)}
								className={`w-full border border-gray-300 focus:border-black focus-visible:ring-0 focus:outline-none transition-colors duration-150 ${
									errors.fullName && !isFullNameFocused ? 'border-red-500' : ''
								}`}
							/>
						</div>

						{/* Username Field */}
						<div className="space-y-1">
							<div className="flex items-center space-x-1">
								<Label htmlFor="username" className="text-sm">
									Username
								</Label>
								<span className="text-red-500">*</span>
								{errors.username && (
									<span className="text-red-500 text-xs ml-auto">
										- {errors.username}
									</span>
								)}
							</div>
							<Input
								id="username"
								type="text"
								value={username}
								onChange={(e) => setUsername(e.target.value)}
								onFocus={() => setIsUsernameFocused(true)}
								onBlur={() => setIsUsernameFocused(false)}
								className={`w-full border border-gray-300 focus:border-black focus-visible:ring-0 focus:outline-none transition-colors duration-150 ${
									errors.username && !isUsernameFocused ? 'border-red-500' : ''
								}`}
							/>
						</div>

						{/* Email Field - read only*/}
						<div className="space-y-1">
							<div className="flex items-center space-x-1">
								<Label htmlFor="email" className="text-sm">
									Email
								</Label>
							</div>
							<Input
								id="email"
								type="email"
								value={email}
								readOnly
								disabled
								className="w-full bg-gray-100 text-gray-600 cursor-not-allowed"
							/>
							<p className="px-1.5 py-1 text-xs text-muted-foreground">
								Update your email via{' '}
								<a
									href="/settings"
									className="text-blue-500 hover:underline cursor-pointer"
								>
									settings
								</a>
							</p>
						</div>

						{/* Bio Field */}
						<div className="space-y-1">
							<div className="flex justify-between">
								<Label htmlFor="bio" className="text-sm">
									Bio
								</Label>
								<span className="text-xs text-muted-foreground">
									{bio.length}/{MAX_BIO_LENGTH}
								</span>
							</div>
							<Textarea
								id="bio"
								value={bio}
								onChange={handleBioChange}
								rows={3}
								placeholder="Tell us about yourself"
								className="w-full border border-gray-300 focus:border-black focus-visible:ring-0 focus:outline-none transition-colors duration-150 resize-none"
							/>
						</div>
					</div>

					{updateError && (
						<div className="mb-4 p-2 bg-red-50 border border-red-200 rounded text-red-600 text-sm">
							{updateError}
						</div>
					)}

					<DialogFooter>
						<Button
							type="button"
							variant="outline"
							onClick={onClose}
							disabled={isLoading}
							className="h-9 text-sm"
						>
							Cancel
						</Button>
						<Button type="submit" disabled={isLoading} className="h-9 text-sm">
							{isLoading ? (
								<>
									<Loader2 className="mr-2 h-4 w-4 animate-spin" />
									Saving...
								</>
							) : (
								'Save changes'
							)}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}

export default EditProfileModal;
