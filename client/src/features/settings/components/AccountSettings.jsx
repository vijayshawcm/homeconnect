import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import {
	AlertCircle,
	Calendar,
	Info,
	Loader2,
	Mail,
	Shield,
	UserX,
} from 'lucide-react';
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
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';

function AccountSettings() {
	// email change state
	const [email, setEmail] = useState('john.doe@example.com');
	const [newEmail, setNewEmail] = useState('');
	const [isEmailFocused, setIsEmailFocused] = useState(false);
	const [emailErrors, setEmailErrors] = useState({});
	const [isChangingEmail, setIsChangingEmail] = useState(false);
	const [showEmailVerification, setShowEmailVerification] = useState(false);
	const [verificationCode, setVerificationCode] = useState('');
	const [isVerifying, setIsVerifying] = useState(false);
	const [resendDisabled, setResendDisabled] = useState(false);
	const [resendCountdown, setResendCountdown] = useState(60);

	// DOB state
	const [dobDay, setDobDay] = useState('');
	const [dobMonth, setDobMonth] = useState('');
	const [dobYear, setDobYear] = useState('');
	const [dobErrors, setDobErrors] = useState({});
	const [isUpdatingDob, setIsUpdatingDob] = useState(false);
	const [showDobPicker, setShowDobPicker] = useState(false);
	const [formattedDob, setFormattedDob] = useState('');

	// account management state
	const [showDeactivateDialog, setShowDeactivateDialog] = useState(false);
	const [showDeleteDialog, setShowDeleteDialog] = useState(false);
	const [deactivateReason, setDeactivateReason] = useState('');
	const [deleteConfirmation, setDeleteConfirmation] = useState('');
	const [isDeactivating, setIsDeactivating] = useState(false);
	const [isDeleting, setIsDeleting] = useState(false);

	// resend otp countdown
	useEffect(() => {
		let timer;
		if (resendDisabled && resendCountdown > 0) {
			timer = setInterval(() => {
				setResendCountdown((prev) => prev - 1);
			}, 1000);
		} else if (resendCountdown === 0) {
			setResendDisabled(false);
			setResendCountdown(60);
		}

		return () => clearInterval(timer);
	}, [resendDisabled, resendCountdown]);

	// format DOB when values change
	useEffect(() => {
		if (dobDay && dobMonth && dobYear) {
			const monthNames = [
				'January',
				'February',
				'March',
				'April',
				'May',
				'June',
				'July',
				'August',
				'September',
				'October',
				'November',
				'December',
			];
			const monthName = monthNames[Number.parseInt(dobMonth, 10) - 1];
			setFormattedDob(`${monthName} ${dobDay}, ${dobYear}`);
		} else {
			setFormattedDob('');
		}
	}, [dobDay, dobMonth, dobYear]);

	// email change handler(s)
	const validateEmail = (email) => {
		return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
	};

	const handleEmailChange = (e) => {
		setNewEmail(e.target.value);
		if (emailErrors.newEmail) {
			setEmailErrors({});
		}
	};

	const handleRequestEmailChange = (e) => {
		e.preventDefault();

		// validate email
		if (!newEmail) {
			setEmailErrors({ newEmail: 'New email is required' });
			return;
		}

		if (!validateEmail(newEmail)) {
			setEmailErrors({ newEmail: 'Please enter a valid email address' });
			return;
		}

		if (newEmail === email) {
			setEmailErrors({
				newEmail: 'New email must be different from current email',
			});
			return;
		}

		setIsChangingEmail(true);

		// simulate api call
		setTimeout(() => {
			setIsChangingEmail(false);
			setShowEmailVerification(true);
			toast.success('Verification code sent', {
				description: `We've sent a verification code to ${newEmail}`,
			});
		}, 1500);
	};

	const handleVerifyEmail = (e) => {
		e.preventDefault();

		if (!verificationCode) {
			toast.error('Verification failed', {
				description: 'Please enter the verification code',
			});
			return;
		}

		setIsVerifying(true);

		// simulate api call
		setTimeout(() => {
			setIsVerifying(false);
			setShowEmailVerification(false);
			setEmail(newEmail);
			setNewEmail('');
			toast.success('Email updated', {
				description: 'Your email address has been updated successfully',
			});
		}, 1500);
	};

	const handleResendCode = () => {
		if (resendDisabled) return;

		setResendDisabled(true);

		// simulate api call
		setTimeout(() => {
			toast.success('Code resent', {
				description: `A new verification code has been sent to ${newEmail}`,
			});
		}, 800);
	};

	// DOB handlers
	const validateDob = () => {
		if (!dobDay || !dobMonth || !dobYear) return false;

		const day = Number.parseInt(dobDay, 10);
		const month = Number.parseInt(dobMonth, 10) - 1;
		const year = Number.parseInt(dobYear, 10);

		const dobDate = new Date(year, month, day);
		const today = new Date();

		// validate date
		if (
			dobDate.getDate() !== day ||
			dobDate.getMonth() !== month ||
			dobDate.getFullYear() !== year
		) {
			return false;
		}

		// check age restrictions
		const minDate = new Date();
		minDate.setFullYear(today.getFullYear() - 100); // max 100yo

		const maxDate = new Date();
		maxDate.setFullYear(today.getFullYear() - 13); // min 13yo

		return dobDate >= minDate && dobDate <= maxDate;
	};

	const handleUpdateDob = (e) => {
		e.preventDefault();

		if (!dobDay || !dobMonth || !dobYear) {
			setDobErrors({ dob: 'Complete date of birth is required' });
			return;
		}

		if (!validateDob()) {
			setDobErrors({
				dob: 'Please enter a valid date. You must be between 13 and 100 years old',
			});
			return;
		}

		setIsUpdatingDob(true);

		// simulate api call
		setTimeout(() => {
			setIsUpdatingDob(false);
			setShowDobPicker(false);
			toast.success('Date of birth updated', {
				description: 'Your date of birth has been updated successfully',
			});
		}, 1500);
	};

	// acct management handlers
	const handleDeactivateAccount = () => {
		setIsDeactivating(true);

		// simulate api call
		setTimeout(() => {
			setIsDeactivating(false);
			setShowDeactivateDialog(false);
			setDeactivateReason('');
			toast.success('Account deactivated', {
				description:
					'Your account has been deactivated. You will be logged out shortly.',
			});

			// simulate logout
			setTimeout(() => {
				window.location.href = '/login';
			}, 3000);
		}, 1500);
	};

	const handleDeleteAccount = () => {
		if (deleteConfirmation !== 'DELETE') {
			toast.error('Confirmation required', {
				description: 'Please type DELETE to confirm account deletion',
			});
			return;
		}

		setIsDeleting(true);

		// simulate api call
		setTimeout(() => {
			setIsDeleting(false);
			setShowDeleteDialog(false);
			setDeleteConfirmation('');
			toast.success('Account deletion scheduled', {
				description:
					'Your account has been scheduled for deletion. You will be logged out shortly.',
			});

			// simulate logout
			setTimeout(() => {
				window.location.href = '/login';
			}, 3000);
		}, 1500);
	};

	// generate ddmmyy for select dropdowns
	const days = Array.from({ length: 31 }, (_, i) => i + 1);
	const months = [
		{ value: '1', label: 'January' },
		{ value: '2', label: 'February' },
		{ value: '3', label: 'March' },
		{ value: '4', label: 'April' },
		{ value: '5', label: 'May' },
		{ value: '6', label: 'June' },
		{ value: '7', label: 'July' },
		{ value: '8', label: 'August' },
		{ value: '9', label: 'September' },
		{ value: '10', label: 'October' },
		{ value: '11', label: 'November' },
		{ value: '12', label: 'December' },
	];
	const currentYear = new Date().getFullYear();
	const years = Array.from({ length: 88 }, (_, i) => currentYear - 13 - i);

	return (
		<Card className="border-border/40 shadow-md hover:shadow-lg transition-shadow duration-300">
			<CardHeader className="pb-5 mb-6 bg-primary/10 rounded-tl-lg rounded-tr-lg">
				<div className="flex items-center gap-3">
					<div>
						<CardTitle className="text-lg font-medium">
							Account Settings
						</CardTitle>
						<CardDescription className="text-sm mt-0.5">
							Manage your account information and preferences
						</CardDescription>
					</div>
				</div>
			</CardHeader>
			<CardContent className="space-y-8 pb-8">
				{/* Email Change Section */}
				<div className="space-y-6">
					<div className="flex items-start gap-3">
						<div className="mt-0.5 h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center shadow-sm">
							<Mail className="h-5 w-5 text-blue-600 dark:text-blue-400" />
						</div>
						<div>
							<h3 className="text-base font-medium leading-tight">
								Email Address
							</h3>
							<p className="text-sm text-muted-foreground mt-0.5">
								Update your email address. A verification code will be sent to
								your new email.
							</p>
						</div>
					</div>

					<div className="space-y-5 pl-14">
						<div className="space-y-2.5">
							<Label htmlFor="currentEmail" className="text-sm font-medium">
								Current Email
							</Label>
							<Input
								id="currentEmail"
								value={email}
								disabled
								readOnly
								className="bg-muted/50 text-muted-foreground cursor-not-allowed font-medium"
							/>
						</div>

						<form
							onSubmit={handleRequestEmailChange}
							className="space-y-5"
							noValidate
						>
							<div className="space-y-2.5">
								<div className="flex justify-between items-center">
									<Label htmlFor="newEmail" className="text-sm font-medium">
										New Email <span className="text-red-500">*</span>
									</Label>
									{emailErrors.newEmail && !isEmailFocused && (
										<span className="text-xs text-red-500 flex items-center gap-1">
											<AlertCircle className="h-3 w-3" />
											{emailErrors.newEmail}
										</span>
									)}
								</div>
								<Input
									id="newEmail"
									type="email"
									value={newEmail}
									onChange={handleEmailChange}
									onFocus={() => setIsEmailFocused(true)}
									onBlur={() => setIsEmailFocused(false)}
									placeholder="Enter your new email address"
									className={`w-full transition-colors duration-150 ${
										emailErrors.newEmail && !isEmailFocused
											? 'border-red-500 focus-visible:ring-red-500'
											: ''
									}`}
								/>
							</div>

							<div className="flex justify-end">
								<Button
									type="submit"
									disabled={isChangingEmail}
									className="h-9 text-sm font-medium"
								>
									{isChangingEmail ? (
										<>
											<Loader2 className="mr-2 h-4 w-4 animate-spin" />
											Sending Verification...
										</>
									) : (
										'Change Email'
									)}
								</Button>
							</div>
						</form>
					</div>
				</div>

				<Separator className="my-8" />

				{/* DOB Section */}
				<div className="space-y-6">
					<div className="flex items-start gap-4">
						<div className="mt-0.5 h-10 w-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center shadow-sm">
							<Calendar className="h-5 w-5 text-purple-600 dark:text-purple-400" />
						</div>
						<div>
							<h3 className="text-lg font-medium leading-tight">
								Date of Birth
							</h3>
							<p className="text-sm text-muted-foreground mt-1">
								Set your date of birth. This information will not be publicly
								visible.
							</p>
						</div>
					</div>

					<div className="pl-14">
						<Popover open={showDobPicker} onOpenChange={setShowDobPicker}>
							<PopoverTrigger asChild>
								<Button
									variant="outline"
									className={`w-full justify-start text-left font-normal h-10 ${
										!formattedDob ? 'text-muted-foreground' : ''
									}`}
								>
									<Calendar className="mr-2 h-4 w-4" />
									{formattedDob || 'Select your date of birth'}
								</Button>
							</PopoverTrigger>
							<PopoverContent className="w-full p-5" align="start">
								<form onSubmit={handleUpdateDob} className="space-y-6">
									<div className="space-y-4">
										<div className="flex justify-between items-center">
											<Label className="text-sm font-medium">
												Date of Birth <span className="text-red-500">*</span>
											</Label>
											{dobErrors.dob && (
												<span className="text-xs text-red-500 flex items-center gap-1">
													<AlertCircle className="h-3 w-3" /> {dobErrors.dob}
												</span>
											)}
										</div>

										<div className="grid grid-cols-3 gap-3">
											<div className="space-y-2">
												<Label
													htmlFor="dobDay"
													className="text-xs text-muted-foreground"
												>
													Day
												</Label>
												<Select value={dobDay} onValueChange={setDobDay}>
													<SelectTrigger id="dobDay" className="h-9">
														<SelectValue placeholder="Day" />
													</SelectTrigger>
													<SelectContent className="max-h-60">
														{days.map((day) => (
															<SelectItem key={day} value={day.toString()}>
																{day}
															</SelectItem>
														))}
													</SelectContent>
												</Select>
											</div>

											<div className="space-y-2">
												<Label
													htmlFor="dobMonth"
													className="text-xs text-muted-foreground"
												>
													Month
												</Label>
												<Select value={dobMonth} onValueChange={setDobMonth}>
													<SelectTrigger id="dobMonth" className="h-9">
														<SelectValue placeholder="Month" />
													</SelectTrigger>
													<SelectContent className="max-h-60">
														{months.map((month) => (
															<SelectItem key={month.value} value={month.value}>
																{month.label}
															</SelectItem>
														))}
													</SelectContent>
												</Select>
											</div>

											<div className="space-y-2">
												<Label
													htmlFor="dobYear"
													className="text-xs text-muted-foreground"
												>
													Year
												</Label>
												<Select value={dobYear} onValueChange={setDobYear}>
													<SelectTrigger id="dobYear" className="h-9">
														<SelectValue placeholder="Year" />
													</SelectTrigger>
													<SelectContent className="max-h-60">
														{years.map((year) => (
															<SelectItem key={year} value={year.toString()}>
																{year}
															</SelectItem>
														))}
													</SelectContent>
												</Select>
											</div>
										</div>

										<p className="text-xs text-muted-foreground pt-1">
											You must be at least 13 years old to use this service.
										</p>
									</div>

									<div className="flex justify-end gap-2">
										<Button
											type="button"
											variant="outline"
											onClick={() => setShowDobPicker(false)}
											className="h-9 text-sm font-medium"
										>
											Cancel
										</Button>
										<Button
											type="submit"
											disabled={isUpdatingDob}
											className="h-9 text-sm font-medium"
										>
											{isUpdatingDob ? (
												<>
													<Loader2 className="mr-2 h-4 w-4 animate-spin" />
													Updating...
												</>
											) : (
												'Update Date of Birth'
											)}
										</Button>
									</div>
								</form>
							</PopoverContent>
						</Popover>
					</div>
				</div>

				<Separator className="my-8" />

				{/* Account Management Section */}
				<div className="space-y-6">
					<div className="flex items-start gap-4">
						<div className="mt-0.5 h-10 w-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center shadow-sm">
							<UserX className="h-5 w-5 text-red-600 dark:text-red-400" />
						</div>
						<div>
							<h3 className="text-lg font-medium leading-tight">
								Account Management
							</h3>
							<p className="text-sm text-muted-foreground mt-1">
								Manage your account status. These actions cannot be easily
								reversed.
							</p>
						</div>
					</div>

					<div className="space-y-6 pl-14">
						<div className="rounded-md border border-amber-200 bg-amber-50 dark:bg-amber-950/20 dark:border-amber-900/50 p-4">
							<div className="flex items-start gap-3">
								<Info className="h-5 w-5 text-amber-600 dark:text-amber-500 mt-0.5 flex-shrink-0" />
								<div>
									<h4 className="text-sm font-medium text-amber-800 dark:text-amber-500">
										Important Information
									</h4>
									<p className="text-sm text-amber-700 dark:text-amber-400 mt-1.5">
										Deactivating or deleting your account will remove your
										access to HomeConnect services. This action may affect any
										connected devices or automations you have set up.
									</p>
								</div>
							</div>
						</div>

						<div className="space-y-6">
							<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-3 border-b pb-5">
								<div>
									<h3 className="text-base font-medium">Deactivate Account</h3>
									<p className="text-sm text-muted-foreground mt-1.5">
										Temporarily disable your account. You can reactivate it
										later.
									</p>
								</div>
								<Button
									variant="outline"
									className="border-amber-500 text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-950/30 hover:text-amber-700 h-9 text-sm font-medium"
									onClick={() => setShowDeactivateDialog(true)}
								>
									Deactivate Account
								</Button>
							</div>

							<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-3">
								<div>
									<h3 className="text-base font-medium">Delete Account</h3>
									<p className="text-sm text-muted-foreground mt-1.5">
										Permanently delete your account and all associated data.
										This action cannot be undone.
									</p>
								</div>
								<Button
									variant="destructive"
									className="h-9 text-sm font-medium"
									onClick={() => setShowDeleteDialog(true)}
								>
									Delete Account
								</Button>
							</div>
						</div>
					</div>
				</div>
			</CardContent>

			{/* Email Verification Dialog */}
			<Dialog
				open={showEmailVerification}
				onOpenChange={setShowEmailVerification}
			>
				<DialogContent className="sm:max-w-[425px]">
					<DialogHeader>
						<DialogTitle className="text-xl">Verify Your Email</DialogTitle>
						<DialogDescription className="text-sm mt-1.5">
							We've sent a verification code to{' '}
							<span className="font-medium">{newEmail}</span>. Please enter the
							code below to confirm your email change.
						</DialogDescription>
					</DialogHeader>
					<div className="grid gap-5 py-5">
						<div className="space-y-3">
							<Label htmlFor="verificationCode" className="text-sm font-medium">
								Verification Code
							</Label>
							<div className="flex justify-center">
								<Input
									id="verificationCode"
									value={verificationCode}
									onChange={(e) => setVerificationCode(e.target.value)}
									placeholder="Enter 6-digit code"
									className="text-center text-lg tracking-widest max-w-[220px] font-mono"
									maxLength={6}
								/>
							</div>
						</div>
						<div className="text-sm text-muted-foreground flex items-center justify-center">
							Didn't receive a code?{' '}
							{resendDisabled ? (
								<span className="text-muted-foreground ml-1.5 flex items-center">
									<Loader2 className="h-3.5 w-3.5 mr-1.5 animate-spin" />
									Resend in {resendCountdown}s
								</span>
							) : (
								<button
									className="text-primary hover:underline ml-1.5 focus:outline-none focus:underline"
									onClick={handleResendCode}
								>
									Resend code
								</button>
							)}
						</div>
					</div>
					<DialogFooter className="gap-2 sm:gap-0">
						<Button
							variant="outline"
							onClick={() => setShowEmailVerification(false)}
							className="mt-0 sm:mt-0"
						>
							Cancel
						</Button>
						<Button
							onClick={handleVerifyEmail}
							disabled={isVerifying || !verificationCode}
						>
							{isVerifying ? (
								<>
									<Loader2 className="mr-2 h-4 w-4 animate-spin" />
									Verifying...
								</>
							) : (
								'Verify Email'
							)}
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>

			{/* Deactivate Account Dialog */}
			<Dialog
				open={showDeactivateDialog}
				onOpenChange={setShowDeactivateDialog}
			>
				<DialogContent className="sm:max-w-[425px]">
					<DialogHeader>
						<DialogTitle className="flex items-center gap-2 text-amber-600">
							<AlertCircle className="h-5 w-5" />
							Deactivate Your Account
						</DialogTitle>
						<DialogDescription className="text-sm mt-1.5">
							Your account will be temporarily disabled. You can reactivate it
							by logging in again.
						</DialogDescription>
					</DialogHeader>
					<div className="grid gap-5 py-5">
						<div className="space-y-3">
							<Label htmlFor="deactivateReason" className="text-sm font-medium">
								Reason for deactivation (optional)
							</Label>
							<Input
								id="deactivateReason"
								value={deactivateReason}
								onChange={(e) => setDeactivateReason(e.target.value)}
								placeholder="Tell us why you're deactivating"
							/>
						</div>
						<div className="rounded-md border border-amber-200 bg-amber-50 dark:bg-amber-950/20 dark:border-amber-900/50 p-3">
							<div className="flex gap-2">
								<Info className="h-4 w-4 text-amber-600 dark:text-amber-500 mt-0.5 flex-shrink-0" />
								<p className="text-xs text-amber-700 dark:text-amber-400">
									Your connected devices will stop working when your account is
									deactivated.
								</p>
							</div>
						</div>
					</div>
					<DialogFooter className="gap-2 sm:gap-0">
						<Button
							variant="outline"
							onClick={() => setShowDeactivateDialog(false)}
							className="mt-0 sm:mt-0"
						>
							Cancel
						</Button>
						<Button
							variant="outline"
							className="border-amber-500 text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-950/30 hover:text-amber-700"
							onClick={handleDeactivateAccount}
							disabled={isDeactivating}
						>
							{isDeactivating ? (
								<>
									<Loader2 className="mr-2 h-4 w-4 animate-spin" />
									Deactivating...
								</>
							) : (
								'Deactivate Account'
							)}
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>

			{/* Delete Account Dialog */}
			<Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
				<DialogContent className="sm:max-w-[425px]">
					<DialogHeader>
						<DialogTitle className="flex items-center gap-2 text-red-600">
							<UserX className="h-5 w-5" />
							Delete Your Account
						</DialogTitle>
						<DialogDescription className="text-sm mt-1.5">
							This action is permanent and cannot be undone. All your data will
							be permanently removed.
						</DialogDescription>
					</DialogHeader>
					<div className="grid gap-5 py-5">
						<div className="rounded-md border border-red-200 bg-red-50 dark:bg-red-950/20 dark:border-red-900/50 p-3">
							<div className="flex gap-2">
								<AlertCircle className="h-4 w-4 text-red-600 dark:text-red-500 mt-0.5 flex-shrink-0" />
								<div className="text-xs text-red-700 dark:text-red-400">
									<p className="font-medium">
										Warning: This action cannot be reversed
									</p>
									<ul className="list-disc list-inside mt-1.5 space-y-1">
										<li>
											All your homes, rooms, and device configurations will be
											deleted
										</li>
										<li>Your automation rules will be permanently removed</li>
										<li>
											Your account information and preferences will be erased
										</li>
									</ul>
								</div>
							</div>
						</div>
						<div className="space-y-3">
							<Label
								htmlFor="deleteConfirmation"
								className="text-sm font-medium"
							>
								Type "DELETE" to confirm
							</Label>
							<Input
								id="deleteConfirmation"
								value={deleteConfirmation}
								onChange={(e) => setDeleteConfirmation(e.target.value)}
								placeholder="DELETE"
								className="text-center"
							/>
						</div>
					</div>
					<DialogFooter className="gap-2 sm:gap-0">
						<Button
							variant="outline"
							onClick={() => setShowDeleteDialog(false)}
							className="mt-0 sm:mt-0"
						>
							Cancel
						</Button>
						<Button
							variant="destructive"
							onClick={handleDeleteAccount}
							disabled={isDeleting || deleteConfirmation !== 'DELETE'}
						>
							{isDeleting ? (
								<>
									<Loader2 className="mr-2 h-4 w-4 animate-spin" />
									Deleting...
								</>
							) : (
								'Delete Account'
							)}
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</Card>
	);
}

export default AccountSettings;
