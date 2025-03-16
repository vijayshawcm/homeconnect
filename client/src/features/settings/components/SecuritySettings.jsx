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
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import {
	Loader2,
	Lock,
	LogOut,
	Smartphone,
	Eye,
	EyeOff,
	KeyRound,
	Fingerprint,
	AlertCircle,
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';

function SecuritySettings() {
	const [passwordData, setPasswordData] = useState({
		currentPassword: '',
		newPassword: '',
		confirmPassword: '',
	});

	const [errors, setErrors] = useState({});
	const [isCurrentPasswordFocused, setIsCurrentPasswordFocused] =
		useState(false);
	const [isNewPasswordFocused, setIsNewPasswordFocused] = useState(false);
	const [isConfirmPasswordFocused, setIsConfirmPasswordFocused] =
		useState(false);
	const [isTwoFactorEnabled, setIsTwoFactorEnabled] = useState(false);
	const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
	const [showCurrentPassword, setShowCurrentPassword] = useState(false);
	const [showNewPassword, setShowNewPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [passwordStrength, setPasswordStrength] = useState(0);
	const [passwordFeedback, setPasswordFeedback] = useState('');
	const [passwordRequirements, setPasswordRequirements] = useState({
		minLength: false,
		hasUppercase: false,
		hasLowercase: false,
		hasNumber: false,
		hasSymbol: false,
	});

	// calc pw strength when pw changes
	useEffect(() => {
		if (!passwordData.newPassword) {
			setPasswordStrength(0);
			setPasswordFeedback('');
			setPasswordRequirements({
				minLength: false,
				hasUppercase: false,
				hasLowercase: false,
				hasNumber: false,
				hasSymbol: false,
			});
			return;
		}

		// check reqs
		const requirements = {
			minLength: passwordData.newPassword.length >= 8,
			hasUppercase: /[A-Z]/.test(passwordData.newPassword),
			hasLowercase: /[a-z]/.test(passwordData.newPassword),
			hasNumber: /[0-9]/.test(passwordData.newPassword),
			hasSymbol: /[^A-Za-z0-9]/.test(passwordData.newPassword),
		};

		setPasswordRequirements(requirements);

		// calc strength
		const metRequirements = Object.values(requirements).filter(Boolean).length;
		const strength = Math.min(100, metRequirements * 20);
		setPasswordStrength(strength);

		// set feedback
		if (strength <= 20) {
			setPasswordFeedback('Very Weak');
		} else if (strength <= 40) {
			setPasswordFeedback('Weak');
		} else if (strength <= 60) {
			setPasswordFeedback('Moderate');
		} else if (strength <= 80) {
			setPasswordFeedback('Strong');
		} else {
			setPasswordFeedback('Very Strong');
		}
	}, [passwordData.newPassword]);

	const handlePasswordChange = (e) => {
		const { name, value } = e.target;
		setPasswordData((prev) => ({ ...prev, [name]: value }));

		// clear error when user starts typing
		if (errors[name]) {
			setErrors((prev) => ({ ...prev, [name]: '' }));
		}
	};

	const validatePasswordForm = () => {
		const newErrors = {};

		if (!passwordData.currentPassword) {
			newErrors.currentPassword = 'Current password is required';
			setErrors(newErrors); // Update errors state
			return false; // Stop further validation
		}

		if (!passwordData.newPassword) {
			newErrors.newPassword = 'New password is required';
			setErrors(newErrors); // Update errors state
			return false; // Stop further validation
		} else if (passwordStrength < 60) {
			newErrors.newPassword = 'Password is not strong enough';
			setErrors(newErrors); // Update errors state
			return false; // Stop further validation
		}

		if (!passwordData.confirmPassword) {
			newErrors.confirmPassword = 'Please confirm your password';
			setErrors(newErrors); // Update errors state
			return false; // Stop further validation
		} else if (passwordData.newPassword !== passwordData.confirmPassword) {
			newErrors.confirmPassword = 'Passwords do not match';
			setErrors(newErrors); // Update errors state
			return false; // Stop further validation
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleUpdatePassword = async (e) => {
		e.preventDefault();

		if (!validatePasswordForm()) return;

		setIsUpdatingPassword(true);

		try {
			// simulate api call
			await new Promise((resolve) => setTimeout(resolve, 1500));

			toast.success('Password updated successfully');
			setPasswordData({
				currentPassword: '',
				newPassword: '',
				confirmPassword: '',
			});
		} catch (error) {
			toast.error('Failed to update password');
		} finally {
			setIsUpdatingPassword(false);
		}
	};

	const handleToggleTwoFactor = async () => {
		try {
			// api call
			await new Promise((resolve) => setTimeout(resolve, 800));

			setIsTwoFactorEnabled(!isTwoFactorEnabled);
			toast.success(
				isTwoFactorEnabled
					? 'Two-factor authentication disabled'
					: 'Two-factor authentication enabled'
			);
		} catch (error) {
			toast.error('Failed to update two-factor authentication');
		}
	};

	const handleSignOut = (device) => {
		toast.success(`Signed out from ${device}`);
	};

	const handleSignOutAll = () => {
		toast.success('Signed out from all devices');
	};

	return (
		<Card className="border-border/40 shadow-md hover:shadow-lg transition-shadow duration-300">
			<CardHeader className="pb-5 mb-6 bg-primary/10 rounded-tl-lg rounded-tr-lg">
				<div className="flex items-center gap-3">
					<div>
						<CardTitle className="text-lg font-medium">
							Security Settings
						</CardTitle>
						<CardDescription className="text-sm mt-0.5">
							Manage your account security and authentication methods
						</CardDescription>
					</div>
				</div>
			</CardHeader>
			<CardContent className="space-y-8 pb-8">
				{/* Password Change Section */}
				<div className="space-y-6">
					<div className="flex items-center gap-3">
						<div className="h-10 w-10 aspect-square rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center shadow-sm">
							<KeyRound className="h-1/2 w-1/2 text-blue-600 dark:text-blue-400" />
						</div>
						<div>
							<h3 className="text-base font-medium leading-tight">
								Change Password
							</h3>
							<p className="text-sm text-muted-foreground mt-0.5">
								Update your password to keep your account secure
							</p>
						</div>
					</div>

					<form
						onSubmit={handleUpdatePassword}
						className="space-y-5 pl-14"
						noValidate
					>
						<div className="space-y-5">
							<div className="space-y-2.5">
								<div className="flex items-center space-x-1">
									<Label
										htmlFor="currentPassword"
										className="text-sm font-medium"
									>
										Current Password
									</Label>
									<span className="text-red-500">*</span>
									{errors.currentPassword && (
										<span className="text-red-500 text-xs ml-auto">
											- {errors.currentPassword}
										</span>
									)}
								</div>
								<div className="relative">
									<Input
										id="currentPassword"
										name="currentPassword"
										type={showCurrentPassword ? 'text' : 'password'}
										value={passwordData.currentPassword}
										onChange={handlePasswordChange}
										onFocus={() => setIsCurrentPasswordFocused(true)}
										onBlur={() => setIsCurrentPasswordFocused(false)}
										className={`w-full border border-gray-300 focus:border-black focus-visible:ring-0 focus:outline-none dark:focus:border-white transition-colors duration-150 ${
											errors.currentPassword && !isCurrentPasswordFocused
												? 'border-red-500'
												: ''
										}`}
									/>
									<Button
										type="button"
										variant="ghost"
										size="icon"
										className="absolute right-0 top-0 h-full px-3 text-muted-foreground hover:text-foreground hover:bg-transparent"
										onClick={() => setShowCurrentPassword(!showCurrentPassword)}
									>
										{showCurrentPassword ? (
											<Eye className="h-4 w-4" />
										) : (
											<EyeOff className="h-4 w-4" />
										)}
										<span className="sr-only">
											{showCurrentPassword ? 'Hide password' : 'Show password'}
										</span>
									</Button>
								</div>
							</div>

							<div className="space-y-2.5">
								<div className="flex items-center space-x-1">
									<Label htmlFor="newPassword" className="text-sm font-medium">
										New Password
									</Label>
									<span className="text-red-500">*</span>
									{errors.newPassword && (
										<span className="text-red-500 text-xs ml-auto">
											- {errors.newPassword}
										</span>
									)}
								</div>
								<div className="relative">
									<Input
										id="newPassword"
										name="newPassword"
										type={showNewPassword ? 'text' : 'password'}
										value={passwordData.newPassword}
										onChange={handlePasswordChange}
										onFocus={() => setIsNewPasswordFocused(true)}
										onBlur={() => setIsNewPasswordFocused(false)}
										className={`h-9 pr-10 border border-gray-300 focus:border-black focus-visible:ring-0 focus:outline-none dark:focus:border-white transition-colors duration-150 ${
											errors.newPassword && !isNewPasswordFocused
												? 'border-red-500 focus-visible:ring-red-500'
												: ''
										}`}
									/>
									<Button
										type="button"
										variant="ghost"
										size="icon"
										className="absolute right-0 top-0 h-full px-3 text-muted-foreground hover:text-foreground hover:bg-transparent"
										onClick={() => setShowNewPassword(!showNewPassword)}
									>
										{showNewPassword ? (
											<Eye className="h-4 w-4" />
										) : (
											<EyeOff className="h-4 w-4" />
										)}
										<span className="sr-only">
											{showNewPassword ? 'Hide password' : 'Show password'}
										</span>
									</Button>
								</div>

								{passwordData.newPassword && (
									<div className="mt-4 space-y-4">
										<div className="space-y-2.5">
											<div className="flex justify-between items-center">
												<span className="text-xs font-medium">
													Password Strength: {passwordFeedback}
												</span>
												<span className="text-xs">{passwordStrength}%</span>
											</div>
											<Progress
												value={passwordStrength}
												className="h-2"
												indicatorClassName={`${
													passwordStrength <= 20
														? 'bg-red-500'
														: passwordStrength <= 40
														? 'bg-orange-500'
														: passwordStrength <= 60
														? 'bg-yellow-500'
														: passwordStrength <= 80
														? 'bg-green-500'
														: 'bg-emerald-500'
												}`}
											/>
										</div>

										<div className="space-y-2 text-xs">
											<div
												className={`flex items-center gap-1.5 ${
													passwordRequirements.minLength
														? 'text-green-600 dark:text-green-400'
														: 'text-muted-foreground'
												}`}
											>
												<div
													className={`h-1.5 w-1.5 rounded-full ${
														passwordRequirements.minLength
															? 'bg-green-600 dark:bg-green-400'
															: 'bg-muted-foreground'
													}`}
												/>
												<span>At least 8 characters</span>
											</div>
											<div
												className={`flex items-center gap-1.5 ${
													passwordRequirements.hasUppercase
														? 'text-green-600 dark:text-green-400'
														: 'text-muted-foreground'
												}`}
											>
												<div
													className={`h-1.5 w-1.5 rounded-full ${
														passwordRequirements.hasUppercase
															? 'bg-green-600 dark:bg-green-400'
															: 'bg-muted-foreground'
													}`}
												/>
												<span>At least one uppercase letter</span>
											</div>
											<div
												className={`flex items-center gap-1.5 ${
													passwordRequirements.hasLowercase
														? 'text-green-600 dark:text-green-400'
														: 'text-muted-foreground'
												}`}
											>
												<div
													className={`h-1.5 w-1.5 rounded-full ${
														passwordRequirements.hasLowercase
															? 'bg-green-600 dark:bg-green-400'
															: 'bg-muted-foreground'
													}`}
												/>
												<span>At least one lowercase letter</span>
											</div>
											<div
												className={`flex items-center gap-1.5 ${
													passwordRequirements.hasNumber
														? 'text-green-600 dark:text-green-400'
														: 'text-muted-foreground'
												}`}
											>
												<div
													className={`h-1.5 w-1.5 rounded-full ${
														passwordRequirements.hasNumber
															? 'bg-green-600 dark:bg-green-400'
															: 'bg-muted-foreground'
													}`}
												/>
												<span>At least one number</span>
											</div>
											<div
												className={`flex items-center gap-1.5 ${
													passwordRequirements.hasSymbol
														? 'text-green-600 dark:text-green-400'
														: 'text-muted-foreground'
												}`}
											>
												<div
													className={`h-1.5 w-1.5 rounded-full ${
														passwordRequirements.hasSymbol
															? 'bg-green-600 dark:bg-green-400'
															: 'bg-muted-foreground'
													}`}
												/>
												<span>At least one special character</span>
											</div>
										</div>
									</div>
								)}
							</div>

							<div className="space-y-2.5">
								<div className="flex items-center space-x-1">
									<Label
										htmlFor="confirmPassword"
										className="text-sm font-medium"
									>
										Confirm New Password
									</Label>
									<span className="text-red-500">*</span>
									{errors.confirmPassword && !isConfirmPasswordFocused && (
										<span className="text-red-500 text-xs ml-auto">
											- {errors.confirmPassword}
										</span>
									)}
								</div>
								<div className="relative">
									<Input
										id="confirmPassword"
										name="confirmPassword"
										type={showConfirmPassword ? 'text' : 'password'}
										value={passwordData.confirmPassword}
										onChange={handlePasswordChange}
										onFocus={() => setIsConfirmPasswordFocused(true)}
										onBlur={() => setIsConfirmPasswordFocused(false)}
										className={`h-9 pr-10 border border-gray-300 focus:border-black focus-visible:ring-0 focus:outline-none dark:focus:border-white transition-colors duration-150 ${
											errors.confirmPassword && !isConfirmPasswordFocused
												? 'border-red-500'
												: ''
										}`}
									/>
									<Button
										type="button"
										variant="ghost"
										size="icon"
										className="absolute right-0 top-0 h-full px-3 text-muted-foreground hover:text-foreground hover:bg-transparent"
										onClick={() => setShowConfirmPassword(!showConfirmPassword)}
									>
										{showConfirmPassword ? (
											<Eye className="h-4 w-4" />
										) : (
											<EyeOff className="h-4 w-4" />
										)}
										<span className="sr-only">
											{showConfirmPassword ? 'Hide password' : 'Show password'}
										</span>
									</Button>
								</div>
							</div>

							<div className="flex justify-end">
								<Button
									type="submit"
									disabled={isUpdatingPassword}
									className="h-9 text-sm font-medium"
								>
									{isUpdatingPassword ? (
										<>
											<Loader2 className="mr-2 h-4 w-4 animate-spin" />
											Updating...
										</>
									) : (
										'Update Password'
									)}
								</Button>
							</div>
						</div>
					</form>
				</div>

				<Separator className="my-8" />

				{/* 2FA Section */}
				<div className="space-y-6">
					<div className="flex items-center gap-4">
						<div className="h-10 w-10 aspect-square rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center shadow-sm">
							<Fingerprint className="h-1/2 w-1/2 text-purple-600 dark:text-purple-400" />
						</div>
						<div>
							<h3 className="text-base font-medium leading-tight">
								Two-Factor Authentication
							</h3>
							<p className="text-sm text-muted-foreground mt-1">
								Add an extra layer of security to your account
							</p>
						</div>
					</div>

					<div className="pl-14">
						<div className="flex items-center justify-between bg-muted/50 p-4 rounded-lg hover:bg-muted/70 transition-colors duration-200">
							<div>
								<Label htmlFor="two-factor" className="text-base font-medium">
									Enable 2FA
								</Label>
								<p className="text-sm text-muted-foreground mt-1">
									Protect your account with two-factor authentication
								</p>
							</div>
							<Switch
								id="two-factor"
								checked={isTwoFactorEnabled}
								onCheckedChange={handleToggleTwoFactor}
							/>
						</div>
					</div>
				</div>

				<Separator className="my-8" />

				{/* Active Sessions Section */}
				<div className="space-y-6">
					<div className="flex items-center gap-4">
						<div className="h-10 w-10 aspect-square rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center shadow-sm">
							<Smartphone className="h-1/2 w-1/2 text-amber-600 dark:text-amber-400" />
						</div>
						<div>
							<h3 className="text-base font-medium leading-tight">
								Active Sessions
							</h3>
							<p className="text-sm text-muted-foreground mt-1">
								Manage devices where you're currently logged in
							</p>
						</div>
					</div>

					<div className="space-y-4 pl-14">
						<div className="flex justify-between items-center bg-muted/50 p-4 rounded-lg hover:bg-muted/70 transition-colors duration-200">
							<div className="flex items-center gap-3">
								<div className="h-10 w-10 aspect-square rounded-full bg-background flex items-center justify-center shadow-sm">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="20"
										height="20"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										strokeWidth="2"
										strokeLinecap="round"
										strokeLinejoin="round"
										className="text-primary"
									>
										<rect x="4" y="1" width="16" height="20" rx="2" />
										<rect x="9" y="21" width="6" height="2" />
										<path d="M12 18v-9" />
									</svg>
								</div>
								<div>
									<p className="text-sm font-medium">Chrome on Windows</p>
									<div className="flex items-center mt-1">
										<div className="h-2 w-2 rounded-full bg-green-500 mr-1.5"></div>
										<p className="text-xs text-muted-foreground">
											Current session
										</p>
									</div>
								</div>
							</div>
							<Button
								variant="ghost"
								size="sm"
								className="text-muted-foreground"
							>
								This Device
							</Button>
						</div>

						<div className="flex justify-between items-center bg-muted/50 p-4 rounded-lg hover:bg-muted/70 transition-colors duration-200">
							<div className="flex items-center gap-3">
								<div className="h-10 w-10 aspect-square rounded-full bg-background flex items-center justify-center shadow-sm">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="20"
										height="20"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										strokeWidth="2"
										strokeLinecap="round"
										strokeLinejoin="round"
										className="text-primary"
									>
										<rect x="2" y="3" width="20" height="14" rx="2" />
										<line x1="8" x2="16" y1="21" y2="21" />
										<line x1="12" x2="12" y1="17" y2="21" />
									</svg>
								</div>
								<div>
									<p className="text-sm font-medium">Safari on MacBook</p>
									<div className="flex items-center mt-1">
										<div className="h-2 w-2 rounded-full bg-amber-500 mr-1.5"></div>
										<p className="text-xs text-muted-foreground">
											Last active: 2 hours ago
										</p>
									</div>
								</div>
							</div>
							<Button
								variant="outline"
								size="sm"
								onClick={() => handleSignOut('Safari on MacBook')}
							>
								Sign Out
							</Button>
						</div>

						<div className="flex justify-between items-center bg-muted/50 p-4 rounded-lg hover:bg-muted/70 transition-colors duration-200">
							<div className="flex items-center gap-3">
								<div className="h-10 w-10 aspect-square rounded-full bg-background flex items-center justify-center shadow-sm">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="20"
										height="20"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										strokeWidth="2"
										strokeLinecap="round"
										strokeLinejoin="round"
										className="text-primary"
									>
										<rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
										<path d="M12 18h.01" />
									</svg>
								</div>
								<div>
									<p className="text-sm font-medium">Safari on iPhone</p>
									<div className="flex items-center mt-1">
										<div className="h-2 w-2 rounded-full bg-red-500 mr-1.5"></div>
										<p className="text-xs text-muted-foreground">
											Last active: 2 days ago
										</p>
									</div>
								</div>
							</div>
							<Button
								variant="outline"
								size="sm"
								onClick={() => handleSignOut('Safari on iPhone')}
							>
								Sign Out
							</Button>
						</div>

						<div className="flex justify-end mt-5">
							<Button
								variant="destructive"
								className="h-9 text-sm font-medium"
								onClick={handleSignOutAll}
							>
								<LogOut className="mr-2 h-4 w-4" />
								Sign Out All Devices
							</Button>
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}

export default SecuritySettings;
