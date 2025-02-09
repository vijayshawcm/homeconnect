import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Link } from 'react-router-dom'; // Import Link for navigation
import { Eye, EyeOff } from 'lucide-react'; // Eye icons for password visibility

function LoginForm() {
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
			setErrors(newErrors); // Update errors state
			return false; // Stop further validation
		}

		// Validate Password
		if (!password) {
			newErrors.password = 'Password is required';
			setErrors(newErrors); // Update errors state
			return false; // Stop further validation
		}

		setErrors(newErrors); // Update errors state
		return Object.keys(newErrors).length === 0; // Return true if no errors
	};

	// Handle Login
	const handleLogin = async (e) => {
		e.preventDefault();

		// Clear previous errors
		setErrors({ usernameOrEmail: '', password: '' });

		// Validate Form
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
		<form onSubmit={handleLogin} noValidate className="space-y-3">
			{/* Username or Email Field */}
			<div className="space-y-1">
				<div className="flex items-center space-x-1">
					<Label htmlFor="usernameOrEmail" className="text-sm">
						Username or Email
					</Label>
					<span className="text-red-500">*</span>
					{errors.usernameOrEmail && (
						<span className="text-red-500 text-xs ml-auto">
							- {errors.usernameOrEmail}
						</span>
					)}
				</div>
				<Input
					id="usernameOrEmail"
					type="text"
					value={usernameOrEmail}
					onChange={(e) => setUsernameOrEmail(e.target.value)}
					onFocus={() => setIsUsernameFocused(true)}
					onBlur={() => setIsUsernameFocused(false)}
					required
					className={`w-full border border-gray-300 focus:border-black focus-visible:ring-0 focus:outline-none transition-colors duration-150 ${
						errors.usernameOrEmail && !isUsernameFocused ? 'border-red-500' : ''
					}`}
				/>
			</div>

			{/* Password Field with Eye Icon */}
			<div className="space-y-1">
				<div className="flex items-center space-x-1">
					<Label htmlFor="password" className="text-sm">
						Password
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
						onChange={(e) => setPassword(e.target.value)}
						onFocus={() => setIsPasswordFocused(true)}
						onBlur={() => setIsPasswordFocused(false)}
						required
						className={`h-9 pr-10 border border-gray-300 focus:border-black focus-visible:ring-0 focus:outline-none transition-colors duration-150 ${
							errors.password && !isPasswordFocused ? 'border-red-500' : ''
						}`}
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
			</div>

			{/* Remember Me and Forgot Password */}
			<div className="flex items-center justify-between text-sm">
				{/* Remember Me Checkbox */}
				<div className="flex items-center space-x-1">
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
				<Link to="/forgot-password" className="text-blue-500 hover:underline">
					Forgot Password?
				</Link>
			</div>

			{/* Login Error Message */}
			{loginError && (
				<p className="text-red-500 text-xs text-center">{loginError}</p>
			)}

			{/* Login Button */}
			<Button type="submit" className="w-full h-9 text-sm">
				Login
			</Button>
		</form>
	);
}

export default LoginForm;
