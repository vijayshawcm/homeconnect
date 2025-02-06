import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import HotspotIcon from '../../assets/hotspot-icon.svg';

export default function PhoneVerification() {
	const [phoneNumber, setPhoneNumber] = useState('');
	const navigate = useNavigate();

	const handlePhoneSubmit = (e) => {
		e.preventDefault();
		console.log('Phone number submitted:', phoneNumber);
		// Simulate OTP sent to the user
		alert('OTP sent to your phone number!');
		navigate('/otp-verification'); // Redirect to OTP verification
	};

	return (
		<div className="min-h-screen bg-gray-100 flex items-center justify-center">
			<div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
				<div className="flex justify-center">
					<img src={HotspotIcon} alt="Hotspot Icon" className="h-48 w-48" />
				</div>
				<h1 className="text-2xl font-bold text-center text-blue-600 mb-4">
					Phone Verification
				</h1>
				<p className="text-sm text-gray-600 text-center mb-6">
					Enter your phone number. <br /> We'll send you a verification code.
				</p>
				<form onSubmit={handlePhoneSubmit}>
					<div className="space-y-4">
						<Input
							type="tel"
							placeholder="Phone Number"
							value={phoneNumber}
							onChange={(e) => setPhoneNumber(e.target.value)}
						/>
						<Button type="submit">Send OTP</Button>
					</div>
				</form>
			</div>
		</div>
	);
}
