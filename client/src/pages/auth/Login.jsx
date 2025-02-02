import { useState } from 'react';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Checkbox from '../../components/Checkbox';
import HomeConnectLogo from '../../assets/homeconnect-logo.svg';

export default function Login() {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [rememberMe, setRememberMe] = useState(false);

	const handleLogin = (e) => {
		e.preventDefault();
		console.log('Username:', username);
		console.log('Password:', password);
		console.log('Remember Me:', rememberMe);
	};

	return (
		<div className="min-h-screen bg-gray-100 flex items-center justify-center">
			<div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
				<div className="flex justify-center">
					<img
						src={HomeConnectLogo}
						alt="HomeConnect Logo"
						className="h-48 w-48"
					/>
				</div>
				<h1 className="text-2xl font-bold text-center text-blue-600 mb-6">
					Login to HomeConnect
				</h1>
				<form onSubmit={handleLogin}>
					<div className="space-y-4">
						<Input
							type="text"
							placeholder="Username"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
						/>
						<Input
							type="password"
							placeholder="Password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
						<div className="flex items-center justify-between">
							<Checkbox
								label="Remember me"
								checked={rememberMe}
								onChange={(e) => setRememberMe(e.target.checked)}
							/>
							<a href="#" className="text-sm text-blue-600 hover:underline">
								Forgot password?
							</a>
						</div>
						<Button type="submit">Login</Button>
					</div>
				</form>
				<div className="mt-4 text-center">
					<p className="text-sm text-gray-600">
						Not yet a user?{' '}
						<a href="#" className="text-blue-600 hover:underline">
							Register Now
						</a>
					</p>
				</div>
			</div>
		</div>
	);
}
