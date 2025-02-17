import React, { useState, useEffect } from 'react';
import {
	Card,
	CardHeader,
	CardTitle,
	CardContent,
	CardFooter,
} from '@/components/ui/card';
import HomeConnectLogo from '../assets/homeconnect-logo.png';
import LoginForm from './components/LoginForm'; // Import LoginForm
import RegisterForm from './components/RegisterForm'; // Import RegisterForm
import OTPForm from './components/OTPForm'; // Import OTPForm
import ForgotPassword from './components/ForgotPassword'; // Import ForgotPassword
import { Link, useNavigate } from 'react-router-dom';

function AuthContainer({ mode }) {
	const [currentMode, setCurrentMode] = useState(mode); // Track current mode
	const [isTransitioning, setIsTransitioning] = useState(false); // Track transition state
	const [isOTPVerified, setIsOTPVerified] = useState(false); // Track OTP verification status
	const [forgotPasswordStep, setForgotPasswordStep] = useState(1); // Track forgot-password step
	const navigate = useNavigate(); // For navigation

	// Update currentMode with smooth transition
	useEffect(() => {
		setIsTransitioning(true); // Start transition
		setTimeout(() => {
			setCurrentMode(mode); // Update mode after transition
			setIsTransitioning(false); // End transition
		}, 150); // Match with transition duration
	}, [mode]);

	// Function to navigate back to login
	const handleBackToLogin = () => {
		navigate('/login'); // Redirect to login page
	};

	return (
		<div className="flex items-center justify-center min-h-screen bg-cover bg-center bg-gradient-to-br from-white to-sky-100">
			{/* HomeConnect Logo */}
			<Link to="/">
				<img
					src={HomeConnectLogo}
					alt="HomeConnect Logo"
					className="absolute top-6 left-7 w-48 h-12 object-contain"
				/>
			</Link>
			{/* Card Container */}
			<Card className="w-full max-w-md shadow-lg bg-white">
				{!isOTPVerified ? (
					<CardHeader className="text-center">
						{/* Conditional Rendering of Title and Subtitle */}
						<CardTitle className="text-xl font-bold text-gray-800">
							{currentMode === 'login'
								? 'Welcome to HomeConnect'
								: currentMode === 'register'
								? 'Create an Account'
								: currentMode === 'forgot-password' && forgotPasswordStep === 1
								? 'Forgot Password'
								: currentMode === 'forgot-password' && forgotPasswordStep === 2
								? 'Verify Your Email'
								: currentMode === 'forgot-password' && forgotPasswordStep === 3
								? 'Reset Your Password'
								: 'Verify Your Email'}
						</CardTitle>
						<p className="text-sm text-gray-600">
							{currentMode === 'login'
								? 'Your personalized home management solution.'
								: currentMode === 'register'
								? 'Join us and start managing your home today.'
								: currentMode === 'forgot-password' && forgotPasswordStep === 1
								? 'Enter your email to reset your password.'
								: currentMode === 'forgot-password' && forgotPasswordStep === 2
								? 'Please enter the 6-digit code we sent to your email to verify your identity.'
								: currentMode === 'forgot-password' && forgotPasswordStep === 3
								? 'Create a new password for your account.'
								: 'Please enter the 6-digit code sent to your email.'}
						</p>
					</CardHeader>
				) : (
					<div className="h-6"></div> // White space above Lottie icon
				)}
				<CardContent>
					{/* Smooth Transition Container */}
					<div
						className={`transition-opacity duration-300 ${
							isTransitioning ? 'opacity-0' : 'opacity-100'
						}`}
					>
						{currentMode === 'login' ? (
							<LoginForm />
						) : currentMode === 'register' ? (
							<RegisterForm />
						) : currentMode === 'forgot-password' ? (
							<ForgotPassword
								onBackToLogin={handleBackToLogin}
								onOTPSent={() => setForgotPasswordStep(2)} // Update step to OTP verification
								forgotPasswordStep={forgotPasswordStep} // Pass forgotPasswordStep
								setForgotPasswordStep={setForgotPasswordStep} // Pass setForgotPasswordStep
							/>
						) : (
							<OTPForm
								mode={
									currentMode === 'forgot-password'
										? 'reset-password'
										: 'verify'
								}
								onVerificationSuccess={() => {
									setIsOTPVerified(true);
									setForgotPasswordStep(3); // Update step to password reset
								}}
							/>
						)}
					</div>
				</CardContent>
				{currentMode !== 'verify' && !isOTPVerified && (
					<CardFooter className="flex flex-col space-y-2">
						{/* Switch Between Login and Register */}
						<div className="text-center text-xs text-gray-600">
							{currentMode === 'login' ? (
								<>
									Don't have an account?{' '}
									<Link
										to="/register"
										className="text-blue-500 hover:underline cursor-pointer"
									>
										Register here
									</Link>
								</>
							) : currentMode === 'register' ? (
								<>
									Already have an account?{' '}
									<Link
										to="/login"
										className="text-blue-500 hover:underline cursor-pointer"
									>
										Login here
									</Link>
								</>
							) : null}
						</div>
					</CardFooter>
				)}
			</Card>
		</div>
	);
}

export default AuthContainer;
