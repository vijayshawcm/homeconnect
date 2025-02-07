import React, { useState } from 'react';
import {
	Card,
	CardHeader,
	CardTitle,
	CardContent,
	CardFooter,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Link } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import HomeConnectLogo from '../../assets/homeconnect-logo.svg';

// Validation Functions using regex
const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
const isValidUsername = (value) => /^[a-zA-Z0-9_]+$/.test(value);
const isValidPassword = (value) => value.length >= 6;

function Login() {
	const [usernameOrEmail, setUsernameOrEmail] = useState('');
	const [password, setPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false);
	const [rememberMe, setRememberMe] = useState(false);
	const [errors, setErrors] = useState({ usernameOrEmail: '', password: '' });
	const [loginError, setLoginError] = useState('');

	// Track focus state for input fields
	const [isUsernameFocused, setIsUsernameFocused] = useState(false);
	const [isPasswordFocused, setIsPasswordFocused] = useState(false);

	// Form Validation
	const validateForm = () => {
		const newErrors = {};

		// Validate Username or Email
		if (!usernameOrEmail) {
			newErrors.usernameOrEmail = 'Username or Email is required';
		} else if (usernameOrEmail.length < 5) {
			newErrors.usernameOrEmail = 'Please enter a valid email or username';
		} else if (
			!isValidEmail(usernameOrEmail) &&
			!isValidUsername(usernameOrEmail)
		) {
			newErrors.usernameOrEmail = 'Please enter a valid email or username';
		}

		// Validate Password
		if (!password) {
			newErrors.password = 'Password is required';
		} else if (!isValidPassword(password)) {
			newErrors.password = 'Password must be at least 6 characters long';
		}

		setErrors(newErrors); // Update errors state
		return Object.keys(newErrors).length === 0; // Return true if no errors
	};

	// Handle Login
	const handleLogin = async (e) => {
		e.preventDefault();

		// Clear previous errors
		setErrors({ usernameOrEmail: '', password: '' });

		// Validate form
		if (!validateForm()) return;

		// Auth logic here @isaac (API call to backend)
		try {
			// Simulate API call to the backend
			console.log('Logging in with:', {
				usernameOrEmail,
				password,
				rememberMe,
			});

			// Replace this part with actual API call thanks
			const response = await fetch('/api/auth/login', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ usernameOrEmail, password }),
			});

			// Check if response is valid JSON
			let data;
			try {
				data = await response.json();
			} catch (error) {
				throw new Error('Invalid server response');
			}

			// Handle response status
			if (!response.ok) {
				throw new Error(data.message || 'Login failed');
			}

			// Handle successful login by redirecting to dashboard
			console.log('Login successful:', data);
		} catch (error) {
			setLoginError(error.message || 'An error occurred during login');
		}
	};

	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-100">
			<Card className="w-full max-w-md">
				<CardHeader className="text-center">
					{/* Icon/Image */}
					<img
						src={HomeConnectLogo}
						alt="HomeConnect Logo"
						className="mx-auto mb-4 w-48 h-48 object-contain"
					/>
					{/* Title */}
					<CardTitle className="text-2xl font-bold">
						Login to HomeConnect
					</CardTitle>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleLogin} noValidate className="space-y-4">
						{/* Username or Email Field */}
						<div className="space-y-2">
							<Label htmlFor="usernameOrEmail">Username or Email</Label>
							<Input
								id="usernameOrEmail"
								type="text" // Allow both username and email
								placeholder="Enter your username or email"
								value={usernameOrEmail}
								onChange={(e) => setUsernameOrEmail(e.target.value)}
								onFocus={() => setIsUsernameFocused(true)} // Set focus state
								onBlur={() => setIsUsernameFocused(false)} // Reset focus state
								required
								className={`w-full ${
									errors.usernameOrEmail && !isUsernameFocused
										? 'border-red-500'
										: ''
								}`}
							/>
							{errors.usernameOrEmail && (
								<p className="text-red-500 text-sm">{errors.usernameOrEmail}</p>
							)}
						</div>

						{/* Password Field with Eye Icon */}
						<div className="space-y-2">
							<Label htmlFor="password">Password</Label>
							<div className="relative">
								<Input
									id="password"
									type={showPassword ? 'text' : 'password'}
									placeholder="Enter your password"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									onFocus={() => setIsPasswordFocused(true)} // Set focus state
									onBlur={() => setIsPasswordFocused(false)} // Reset focus state
									required
									className={`h-10 pr-10 ${
										errors.password && !isPasswordFocused
											? 'border-red-500'
											: ''
									}`}
								/>
								{/* Eye Icon */}
								<button
									type="button"
									className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
									onClick={() => setShowPassword(!showPassword)}
								>
									{showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
								</button>
							</div>
							{errors.password && (
								<p className="text-red-500 text-sm">{errors.password}</p>
							)}
						</div>

						{/* Remember Me and Forgot Password */}
						<div className="flex items-center justify-between">
							{/* Remember Me Checkbox */}
							<div className="flex items-center space-x-2">
								<Checkbox
									id="remember-me"
									checked={rememberMe}
									onCheckedChange={(checked) => setRememberMe(!!checked)}
								/>
								<Label htmlFor="remember-me" className="text-sm">
									Remember Me
								</Label>
							</div>
							{/* Forgot Password Link */}
							<Link
								to="/forgot-password"
								className="text-sm text-blue-500 hover:underline"
							>
								Forgot Password?
							</Link>
						</div>

						{/* Login Error Message */}
						{loginError && (
							<p className="text-red-500 text-sm text-center">{loginError}</p>
						)}

						{/* Login Button */}
						<Button type="submit" className="w-full">
							Login
						</Button>
					</form>
				</CardContent>
				<CardFooter className="flex flex-col space-y-4">
					{/* Register Link */}
					<div className="text-center text-sm">
						Don't have an account?{' '}
						<Link to="/register" className="text-blue-500 hover:underline">
							Register here
						</Link>
					</div>
				</CardFooter>
			</Card>
		</div>
	);
}

export default Login;
