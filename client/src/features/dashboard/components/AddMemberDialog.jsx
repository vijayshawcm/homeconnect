import React, { useState } from 'react';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Plus } from 'lucide-react';

const AddMemberDialog = ({ homeId, invitationCode }) => {
	const [email, setEmail] = useState('');
	const [isOpen, setIsOpen] = useState(false);
	const [isEmailFocused, setIsEmailFocused] = useState(false);
	const [errors, setErrors] = useState({});

	const validateInviteForm = () => {
		const newErrors = {};
		// validate Email
		if (!email) {
			newErrors.email = 'Email is required';
			setErrors(newErrors);
			return false;
		} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
			newErrors.email = 'Please enter a valid email';
			setErrors(newErrors);
			return false;
		}
		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleInvite = async (e) => {
		e.preventDefault();
		if (!validateInviteForm()) return;
		try {
			const response = await fetch(`/server/homes/invite/${homeId}`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email }),
			});

			if (response.ok) {
				setIsOpen(false);
				setEmail('');
			}
		} catch (error) {
			console.error('Failed to send invitation:', error);
		}
	};

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>
				<div className="flex flex-col items-center space-y-2 cursor-pointer">
					<div className="flex h-20 w-20 items-center justify-center rounded-full border-4 border-dashed border-muted-foreground/50 hover:border-primary hover:bg-muted/50 transition-all">
						<Plus className="h-8 w-8 text-muted-foreground" />
					</div>
					<span className="text-sm font-medium text-muted-foreground">
						Add Member
					</span>
				</div>
			</DialogTrigger>
			<DialogContent className="w-[90%] rounded-lg">
				<DialogHeader>
					<DialogTitle>Invite to Home</DialogTitle>
				</DialogHeader>
				<form onSubmit={handleInvite} className="space-y-4" noValidate>
					{/* Email Field */}
					<div className="space-y-2">
						<div className="flex items-center space-x-1">
							<Label htmlFor="email" className="text-sm">
								Email Address
							</Label>
							<span className="text-red-500">*</span>
							{errors.email && (
								<span className="text-red-500 text-xs ml-auto">
									- {errors.email}
								</span>
							)}
						</div>
						<Input
							id="email"
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							onFocus={() => setIsEmailFocused(true)}
							onBlur={() => setIsEmailFocused(false)}
							required
							className={`w-full border border-gray-300 focus:border-black focus-visible:ring-0 focus:outline-none transition-colors duration-150 ${
								errors.email && !isEmailFocused ? 'border-red-500' : ''
							}`}
						/>
					</div>
					{/* Invitation Code Section */}
					<div className="space-y-2">
						<Label>Invitation Code</Label>
						<div className="p-2 rounded-md bg-muted/100">
							<code className="text-sm font-mono">{invitationCode} hehe</code>
						</div>
						<p className="text-xs text-muted-foreground">
							New users can sign up using this code to join directly
						</p>
					</div>
					<Button type="submit" className="w-full">
						Send Invitation
					</Button>
				</form>
			</DialogContent>
		</Dialog>
	);
};

export default AddMemberDialog;
