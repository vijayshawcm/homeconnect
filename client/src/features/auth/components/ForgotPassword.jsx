import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import OTPForm from '@/features/auth/components/OTPForm'; // Import OTPForm
import { Eye, EyeOff } from 'lucide-react'; // Eye icons for password visibility
import Lottie from 'lottie-react'; // Import Lottie
import successAnimation from '@/assets/lottie/success-checkmark.json'; // Import successful checkmark animation
import { forgotPasswordStore } from '@/features/auth/store/forgotPassword';

function ForgotPassword({
	onBackToLogin,
	onOTPSent,
	forgotPasswordStep,
	setForgotPasswordStep,
	onPasswordChangeSuccess,
}) {
	const { email, setEmail } = forgotPasswordStore();
	const [isLoading, setIsLoading] = useState(false); // Track loading state
	const [isUpdatingPassword, setIsUpdatingPassword] = useState(false); // Track loading state for updating password
	const [isOTPSent, setIsOTPSent] = useState(false); // Track if OTP has been sent
	const [isPasswordReset, setIsPasswordReset] = useState(false); // Track if user is resetting password
	const [error, setError] = useState(''); // Track error messages
	const [password, setPassword] = useState(''); // Track new password
	const [confirmPassword, setConfirmPassword] = useState(''); // Track confirm password
	const [errors, setErrors] = useState({}); // Track individual field errors
	const [showPassword, setShowPassword] = useState(false); // Track password visibility
	const [showConfirmPassword, setShowConfirmPassword] = useState(false); // Track confirm password visibility
	const [passwordChangeSuccess, setPasswordChangeSuccess] = useState(false); // Track password change success
	const [passwordRequirements, setPasswordRequirements] = useState({
		minLength: false,
		hasLetterCase: false,
		hasNumber: false,
		hasSymbol: false,
	});

	// Handle email input change
	const handleEmailChange = (e) => {
		setEmail(e.target.value);
	};

	// Validate email format
	const validateEmail = () => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!email.trim()) {
			setError('Email is required.');
			return false;
		}
		if (!emailRegex.test(email)) {
			setError('Please enter a valid email address.');
			return false;
		}
		setError('');
		return true;
	};

	// Call otp mailing api
	const sendOTP = async (e) => {
		console.log('email submitted:', email);

		// Send OTP to user
		const response = await fetch('server/users/sendOTP', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ email }),
		});

		if (!response.ok) {
			throw new Error('Failed to send OTP. Please try again.');
		}

		//alert('OTP sent to your email!'); otp sent animation or whatever
	};

	// Handle form submission (Send OTP to Email)
	const handleSubmit = async (e) => {
		e.preventDefault();
		setError('');
		if (!validateEmail()) return;
		setEmail(email); // Update Zustand store before sending OTP
		try {
			setIsLoading(true); // Show loading state
			// Simulate API call
			console.log('Sending password reset email to:', email);
			await sendOTP();
			await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate network delay
			setIsOTPSent(true); // Proceed to OTP verification
			onOTPSent(); // Notify AuthContainer about OTP sent
		} catch (error) {
			setError(
				error.message || 'An error occurred while sending the reset link.'
			);
		} finally {
			setIsLoading(false); // Hide loading state
		}
	};

	const validatePasswordRequirements = (value) => {
		setPasswordRequirements({
			minLength: value.length >= 8,
			hasLetterCase: /[A-Z]/.test(value) && /[a-z]/.test(value),
			hasNumber: /[0-9]/.test(value),
			hasSymbol: /[!@#$%^&*(),.?":{}|<>]/.test(value),
		});
	};

	// Handle Password Update
	const handlePasswordUpdate = async (e) => {
		e.preventDefault();
		setErrors({});
		const newErrors = {};
		if (!password) {
			newErrors.password = 'New password is required.';
		} else if (!Object.values(passwordRequirements).every(Boolean)) {
			newErrors.password = 'Password does not meet all requirements';
		}
		if (!confirmPassword) {
			newErrors.confirmPassword = 'Confirm password is required.';
		} else if (password !== confirmPassword) {
			newErrors.confirmPassword = 'Passwords do not match.';
		}
		if (Object.keys(newErrors).length > 0) {
			// Set errors in the order of validation
			if (newErrors.password) {
				setErrors({ password: newErrors.password });
			} else if (newErrors.confirmPassword) {
				setErrors({ confirmPassword: newErrors.confirmPassword });
			}
			return;
		}
		setIsUpdatingPassword(true); // set loading state to true
		await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate network delay
		try {
			console.log('Updating password:', password);
			// Simulate API call to update password
			await new Promise((resolve) => setTimeout(resolve, 2000));
			if (onPasswordChangeSuccess) onPasswordChangeSuccess(); // Notify parent component about successful password change
			setPasswordChangeSuccess(true); // Show success animation
			setTimeout(() => {
				window.location.href = '/login'; // Redirect to login page after 2 seconds
			}, 2000);
		} catch (error) {
			setErrors({
				password:
					error.message || 'An error occurred while updating the password.',
			});
		} finally {
			setIsUpdatingPassword(false); // set loading state to false
		}
	};

	// Render OTP Verification Step
	if (isOTPSent && !isPasswordReset) {
		return (
			<OTPForm
				mode="reset-password"
				onVerificationSuccess={() => {
					setIsPasswordReset(true); // Transition to password reset step
					setForgotPasswordStep(3); // Update step to password reset
				}}
				successMessage="OTP verified! Please update your password."
			/>
		);
	}

	// Render Password Change Success Animation
	if (passwordChangeSuccess) {
		return (
			<div className="text-center space-y-4">
				{/* Lottie Success Animation */}
				<Lottie
					animationData={successAnimation} // Pass the JSON file
					loop={false} // Play animation once
					className="w-32 h-32 mx-auto"
				/>
				<h1 className="text-2xl font-bold text-green-500">Success!</h1>
				<p className="text-gray-600">Password updated successfully.</p>
			</div>
		);
	}

	// Render Password Reset Step
	if (isPasswordReset) {
		return (
			<form
				onSubmit={handlePasswordUpdate}
				noValidate // Prevent default browser validation
				className="space-y-4 w-full mx-auto"
			>
				{/* New Password Field */}
				<div className="space-y-1">
					<div className="flex items-center space-x-1">
						<Label htmlFor="password" className="text-sm">
							New Password
						</Label>
						<span className="text-red-500">*</span>
						{errors.password && (
							<span className="text-red-500 text-xs ml-auto">
								- {errors.password}
							</span>
						)}
					</div>
					<div className="relative">
						<Input
							id="password"
							type={showPassword ? 'text' : 'password'}
							value={password}
							onChange={(e) => {
								setPassword(e.target.value);
								validatePasswordRequirements(e.target.value);
							}}
							className={`w-full border ${
								errors.password ? 'border-red-500' : 'border-gray-300'
							} focus:border-black focus-visible:ring-0 focus:outline-none transition-colors duration-150`}
						/>
						{/* Eye Icon */}
						<button
							type="button"
							className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
							onClick={() => setShowPassword(!showPassword)}
						>
							{showPassword ? <Eye size={16} /> : <EyeOff size={16} />}
						</button>
					</div>
					{password && (
						<div className="!mt-2 space-y-2">
							<p className="text-xs text-gray-600">
								Your password should contain:
							</p>
							<div className="space-y-1.5">
								<div
									className={`flex items-center space-x-1 ${
										passwordRequirements.minLength
											? 'text-green-500'
											: 'text-gray-500'
									}`}
								>
									<div
										className={`h-1.5 w-1.5 rounded-full ${
											passwordRequirements.minLength
												? 'bg-green-500'
												: 'bg-gray-300'
										}`}
									/>
									<span className="text-xs">At least 8 characters</span>
								</div>
								<div
									className={`flex items-center space-x-1 ${
										passwordRequirements.hasLetterCase
											? 'text-green-500'
											: 'text-gray-500'
									}`}
								>
									<div
										className={`h-1.5 w-1.5 rounded-full ${
											passwordRequirements.hasLetterCase
												? 'bg-green-500'
												: 'bg-gray-300'
										}`}
									/>
									<span className="text-xs">
										One uppercase and lowercase character
									</span>
								</div>
								<div
									className={`flex items-center space-x-1 ${
										passwordRequirements.hasNumber
											? 'text-green-500'
											: 'text-gray-500'
									}`}
								>
									<div
										className={`h-1.5 w-1.5 rounded-full ${
											passwordRequirements.hasNumber
												? 'bg-green-500'
												: 'bg-gray-300'
										}`}
									/>
									<span className="text-xs">One digit</span>
								</div>
								<div
									className={`flex items-center space-x-1 ${
										passwordRequirements.hasSymbol
											? 'text-green-500'
											: 'text-gray-500'
									}`}
								>
									<div
										className={`h-1.5 w-1.5 rounded-full ${
											passwordRequirements.hasSymbol
												? 'bg-green-500'
												: 'bg-gray-300'
										}`}
									/>
									<span className="text-xs">One symbol</span>
								</div>
							</div>
						</div>
					)}
				</div>
				{/* Confirm Password Field */}
				<div className="space-y-1">
					<div className="flex items-center space-x-1">
						<Label htmlFor="confirmPassword" className="text-sm">
							Confirm Password
						</Label>
						<span className="text-red-500">*</span>
						{errors.confirmPassword && (
							<span className="text-red-500 text-xs ml-auto">
								- {errors.confirmPassword}
							</span>
						)}
					</div>
					<div className="relative">
						<Input
							id="confirmPassword"
							type={showConfirmPassword ? 'text' : 'password'}
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
							className={`w-full border ${
								errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
							} focus:border-black focus-visible:ring-0 focus:outline-none transition-colors duration-150`}
						/>
						{/* Eye Icon */}
						<button
							type="button"
							className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
							onClick={() => setShowConfirmPassword(!showConfirmPassword)}
						>
							{showConfirmPassword ? <Eye size={16} /> : <EyeOff size={16} />}
						</button>
					</div>
				</div>
				{/* Submit Button */}
				<Button
					type="submit"
					className="w-full h-10 text-sm"
					disabled={isUpdatingPassword}
				>
					{isUpdatingPassword ? 'Updating Password...' : 'Update Password'}
				</Button>
			</form>
		);
	}

	// Render Email Input Step
	return (
		<form
			onSubmit={handleSubmit}
			noValidate // Prevent default browser validation
			className="space-y-4 w-full mx-auto"
		>
			{/* Email Field */}
			<div className="space-y-1">
				<div className="flex items-center space-x-1">
					<Label htmlFor="email" className="text-sm">
						Email
					</Label>
					<span className="text-red-500">*</span>
					{error && (
						<span className="text-red-500 text-xs ml-auto">- {error}</span>
					)}
				</div>
				<Input
					id="email"
					type="email"
					value={email}
					onChange={handleEmailChange}
					aria-invalid={!!error}
					aria-describedby="email-error"
					className={`w-full border ${
						error ? 'border-red-500' : 'border-gray-300'
					} focus:border-black focus-visible:ring-0 focus:outline-none transition-colors duration-150`}
				/>
			</div>
			{/* Submit Button */}
			<Button
				type="submit"
				disabled={isLoading}
				className="w-full h-10 text-sm"
			>
				{isLoading ? 'Sending...' : 'Send Reset Link'}
			</Button>
			{/* Back to Login Link */}
			<div className="text-center text-xs text-gray-600">
				Remember your password?{' '}
				<button
					onClick={(e) => {
						e.preventDefault(); // Prevent form submission
						onBackToLogin(); // Navigate back to login
					}}
					className="text-blue-500 hover:underline cursor-pointer"
				>
					Go to Login
				</button>
			</div>
		</form>
	);
}

export default ForgotPassword;
