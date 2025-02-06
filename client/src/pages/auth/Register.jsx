import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import WelcomeIcon from '../../assets/welcome-icon.svg';

export default function Register() {
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const navigate = useNavigate();

	const handleRegister = (e) => {
		e.preventDefault();
		// Basic validation
		if (password !== confirmPassword) {
			alert('Passwords do not match!');
			return;
		}
		// Simulate successful registration
		console.log('Registration successful!');
		navigate('/phone-verification'); // Redirect to phone verification
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
