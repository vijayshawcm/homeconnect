import { useState, useRef, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Lottie from 'lottie-react'; // Import Lottie
import successAnimation from '@/assets/lottie/success-checkmark.json'; // Import successful checkmark animation
import { userRegistrationStore } from '@/features/auth/store/userRegistration';
import { userAuthStore } from '@/store/userAuth';
import { useNavigate } from 'react-router-dom';
import { forgotPasswordStore } from '@/features/auth/store/forgotPassword';

function OTPForm({ mode = 'verify', onVerificationSuccess, successMessage }) {
	const [otp, setOtp] = useState(['', '', '', '', '', '']); // Array to hold 6 digits
	const [errors, setErrors] = useState('');
	const [isVerifying, setIsVerifying] = useState(false);
	const [verificationSuccess, setVerificationSuccess] = useState(false);
	const [isResending, setIsResending] = useState(false); // Track resend state
	const [shake, setShake] = useState(false); // Track shake animation
	const [fadeOut, setFadeOut] = useState(false); // Track fade-out animation
	const [animateBoxes, setAnimateBoxes] = useState(false); // Track simultaneous animations (green border + jump)
	const [countdown, setCountdown] = useState(60);
	const [isResendDisabled, setIsResendDisabled] = useState(false);

	// Setup redirect
	const navigate = useNavigate();

	// Refs for each input field
	const inputRefs = [
		useRef(null),
		useRef(null),
		useRef(null),
		useRef(null),
		useRef(null),
		useRef(null),
	];

	// Get user registration info from zustand store
	const {
		email: registrationEmail,
		username: registrationUsername,
		password: registrationPassword,
		displayName: registrationDisplayName,
	} = userRegistrationStore();

	const { email: forgotPasswordEmail } = forgotPasswordStore();

	const email = mode === 'verify' ? registrationEmail : forgotPasswordEmail;
	const username = mode === 'verify' ? registrationUsername : null; // Handle username for different modes
	const displayName = mode === 'verify' ? registrationDisplayName : null; // Handle display name (full name) for different modes
	const password = mode === 'verify' ? registrationPassword : null; // Handle password for different modes

	// Prepare auth store to fetch user login
	const { fetchLogin } = userAuthStore();

	// Handle OTP input change
	const handleInputChange = (index, value) => {
		if (!/^\d*$/.test(value)) return; // Allow only numbers
		const newOtp = [...otp];
		newOtp[index] = value;
		setOtp(newOtp);
		// Move focus to the next input if a value is entered
		if (value && index < 5) {
			inputRefs[index + 1].current.focus();
		}
	};

	// Handle OTP paste
	const handlePaste = (e) => {
		e.preventDefault();
		const pastedData = e.clipboardData.getData('text').slice(0, 6).split(''); // Limit to 6 digits
		if (pastedData.every((char) => /^\d$/.test(char))) {
			setOtp([...pastedData, ...Array(6 - pastedData.length).fill('')]); // Fill remaining slots with empty strings
			inputRefs[Math.min(pastedData.length, 5)].current.focus(); // Focus on last filled input
		}
	};

	// Handle Backspace Key
	const handleKeyDown = (index, e) => {
		if (e.key === 'Backspace' && !otp[index] && index > 0) {
			// If current field is empty and backspace is pressed, move focus to previous field
			inputRefs[index - 1].current.focus();
		}
	};

	// Form Validation
	const validateOTP = () => {
		if (otp.some((digit) => digit === '')) {
			setErrors('Please fill all OTP fields');
			setShake(true); // Trigger shake animation
			setTimeout(() => setShake(false), 500); // Reset shake after animation
			return false;
		}
		setErrors('');
		return true;
	};

	// User registration
	const registerUser = async (e) => {
		console.log(
			'registering user: ' + username + '\n' + email + '\n' + password
		);
		const response = await fetch('server/auth/register', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ username, displayName, email, password }),
		});

		if (!response.ok) {
			throw new Error('Invalid user details entered!');
		}

		// alert('Account succesfully registered!');
	};

	// Handle OTP Verification
	const handleVerify = async (e) => {
		e.preventDefault();
		// Clear previous errors
		setErrors('');
		// Validate OTP
		if (!validateOTP()) return;

		try {
			setIsVerifying(true); // Show loading state
			await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate network delay
			console.log('Verifying OTP:', otp.join(''));
			// OTP verification
			const response = await fetch('server/auth/verifyOTP', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ OTP: otp.join('') }),
			});

			// Logic for incorrect OTP
			if (!response.ok) {
				setShake(true); // Trigger shake animation
				setTimeout(() => setShake(false), 500); // Reset shake after animation
				throw new Error('Incorrect OTP');
			}

			// Step 1: Trigger green border and jumping animation simultaneously
			setAnimateBoxes(true);
			setTimeout(() => {
				if (mode === 'verify') {
					// Step 2: Fade out OTP fields
					setFadeOut(true);
					setTimeout(async () => {
						registerUser(); // Register user if email verification is successful
						await fetchLogin(); // Fetch user login status
						setTimeout(() => {
							// ! We don't question this it just works, changing this breaks everything
							window.location.replace('/welcome'); // Redirect to dashboard
						}, 2000);
						// Step 3: Show success animation
						setVerificationSuccess(true);
						// Notify parent component about successful verification
						if (onVerificationSuccess) onVerificationSuccess();
					}, 500); // Match with fade-out animation
				} else if (mode === 'reset-password') {
					// Notify parent component about successful verification
					if (onVerificationSuccess) onVerificationSuccess();
				}
			}, 500); // Match with border/jump animation

			// Remove focus from all OTP inputs to clear borders
			inputRefs.forEach((input) => input.current?.blur());
		} catch (error) {
			setErrors(error.message || 'An error occurred during OTP verification');
		} finally {
			setIsVerifying(false); // Hide loading state
		}
	};

	// Call otp mailing api
	const sendOTP = async (e) => {
		console.log('email submitted:', email);

		// Send OTP to user
		const response = await fetch('server/auth/sendOTP', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ email }),
		});

		if (!response.ok) {
			throw new Error('Failed to send OTP. Please try again.');
		}

		//alert('OTP sent to your email!'); otp sent animation or whatever
	};

	// Handle Resend OTP
	const handleResend = async (e) => {
		e.preventDefault(); // Prevent form submission
		try {
			setIsResending(true); // Show loading state
			setIsResendDisabled(true); // Disable the resend button
			setCountdown(60); // Reset countdown
			console.log('Resending OTP...');
			await sendOTP();
			await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate network delay
			// alert here for debugging ye
		} catch (error) {
			console.error('An error occurred while resending the OTP:', error);
		} finally {
			setIsResending(false); // Hide loading state
		}
	};

	useEffect(() => {
		let timer;
		if (isResendDisabled && countdown > 0) {
			timer = setInterval(() => {
				setCountdown((prevCountdown) => prevCountdown - 1);
			}, 1000);
		} else if (countdown === 0) {
			setIsResendDisabled(false);
			setCountdown(60);
		}
		return () => clearInterval(timer);
	}, [isResendDisabled, countdown]);

	// Render Success Animation
	if (verificationSuccess) {
		return (
			<div className="text-center space-y-4">
				{/* Lottie Success Animation */}
				<Lottie
					animationData={successAnimation} // Pass the JSON file
					loop={false} // Play animation once
					className="w-32 h-32 mx-auto"
				/>
				<h1 className="text-2xl font-bold text-green-500">Success!</h1>
				<p className="text-gray-600">
					{successMessage || 'Your account has been verified.'}
				</p>
			</div>
		);
	}

	return (
		<form
			onSubmit={handleVerify}
			noValidate
			className="space-y-4 w-full max-w-xs mx-auto"
		>
			{/* OTP Fields */}
			<div
				className={`flex justify-between w-full ${
					shake ? 'animate-shake' : ''
				} ${fadeOut ? 'animate-fade-out-scale' : ''}`}
			>
				{otp.map((digit, index) => (
					<Input
						key={index}
						ref={inputRefs[index]}
						type="text"
						value={digit}
						onChange={(e) => handleInputChange(index, e.target.value)}
						onPaste={handlePaste}
						onKeyDown={(e) => handleKeyDown(index, e)}
						maxLength={1}
						className={`w-12 h-12 text-center transition-all duration-300 ${
							animateBoxes
								? 'border-2 border-green-500 animate-border-green animate-jump'
								: 'border-2 border-gray-300'
						} focus:border-transparent focus:ring-0`}
						autoComplete="off"
					/>
				))}
			</div>

			{/* Error Message */}
			{errors && <p className="text-red-500 text-xs text-center">{errors}</p>}

			{/* Verify Button */}
			<Button
				type="submit"
				disabled={isVerifying}
				className="w-full h-10 text-sm"
			>
				{isVerifying ? 'Verifying...' : 'Verify'}
			</Button>

			{/* Resend Code Link */}
			<div className="text-center text-xs text-gray-600">
				Didn't receive the code?{' '}
				{isResending ? (
					<span className="text-gray-400">Resending...</span>
				) : isResendDisabled ? (
					<span className="text-gray-400">Resend in {countdown}s</span>
				) : (
					<button
						onClick={(e) => handleResend(e)}
						disabled={isResendDisabled}
						className="text-blue-500 hover:underline cursor-pointer"
					>
						Resend
					</button>
				)}
			</div>
		</form>
	);
}

export default OTPForm;
