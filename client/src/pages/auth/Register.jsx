import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import WelcomeIcon from '../../assets/welcome-icon.svg';
import { userRegistrationStore } from '@/store/userRegistration';

export default function Register() {
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const navigate = useNavigate();

	// Initialise zustand store modification methods
	const {
		setUsername: setUsernameStore,
		setEmail: setEmailStore,
		setPassword: setPasswordStore,
	} = userRegistrationStore();

	// Call otp mailing api
	const sendOTP = async (e) =>{
		console.log('email submitted:', email);
		
		// Send OTP to user
		const response = await fetch('server/users/sendOTP', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ email }),
		});

		if(!response.ok) {
			throw new Error('Invalid email entered!');
		}

		alert('OTP sent to your email!');
	}

	//TODO: regex and block empty inputs
	const handleRegister = (e) => {
		e.preventDefault();
		// Basic validation
		if (password !== confirmPassword) {
			alert('Passwords do not match!');
			return;
		}

		// Store user data in zustand store
		setUsernameStore(username);
		setEmailStore(email);
		setPasswordStore(password);

		// Send otp and redirect user after valid details entered
		console.log('Registration details entered, attempting to send OTP to user');
		try {
			sendOTP();
			console.log('OTP sent succesfully! Redirecting to otp verification')
		} catch (err) {
			return alert(err.message || 'Invalid email entered!');
		}

		navigate('/otp-verification'); // Redirect to otp verification
	};

	return (
		<div className="min-h-screen bg-gray-100 flex items-center justify-center">
			<div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
				<div className="flex justify-center">
					<img src={WelcomeIcon} alt="Welcome Icon" className="h-48 w-48" />
				</div>
				<h1 className="text-2xl font-bold text-center text-blue-600 mb-6">
					Register for HomeConnect
				</h1>
				<form onSubmit={handleRegister}>
					<div className="space-y-4">
						<Input
							type="text"
							placeholder="Username"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
						/>
						<Input
							type="email"
							placeholder="Email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
						<Input
							type="password"
							placeholder="Password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
						<Input
							type="password"
							placeholder="Confirm Password"
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
						/>
						<Button type="submit">Register</Button>
					</div>
				</form>
				<div className="mt-4 text-center">
					<p className="text-sm text-gray-600">
						Already have an account?{' '}
						<a href="/login" className="text-blue-600 hover:underline">
							Login
						</a>
					</p>
				</div>
			</div>
		</div>
	);
}
