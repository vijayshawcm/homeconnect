import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/common/Button';
import ShieldIcon from '../../assets/shield-icon.svg';

export default function OTPVerification() {
	const [otp, setOtp] = useState(['', '', '', '', '', '']);
	const otpInputRefs = useRef([]); // Refs for each input box
	const navigate = useNavigate();

	const handleOtpSubmit = (e) => {
		e.preventDefault();
		const otpCode = otp.join('');
		console.log('OTP submitted:', otpCode);
		// Check for empty inputs
		if (otpCode.length < 6) {
			alert('Please enter all 6 digits!');
			const firstEmptyIndex = otp.findIndex((digit) => digit === '');
			if (firstEmptyIndex !== -1) {
				otpInputRefs.current[firstEmptyIndex].focus(); // Focus on the first empty input box
			}
			return;
		}

		// Simulate OTP verification
		if (otpCode === '123456') {
			// Replace with actual OTP validation
			alert('Phone number verified!');
			navigate('/dashboard'); // Redirect to dashboard
		} else {
			// Wrong OTP code logic:
			// Clear input box to allow user to reenter OTP code
			// include cases where the phone number gets blocked after a certain amount of time
			alert('Invalid OTP!');
			setOtp(['', '', '', '', '', '']); // Clear all input boxes
			otpInputRefs.current[0].focus(); // Focus on the first input box
		}
	};

	const handleOtpChange = (index, value) => {
		const newOtp = [...otp];
		newOtp[index] = value;
		setOtp(newOtp);

		// Auto-focus to the next input box
		if (value && index < 5) {
			otpInputRefs.current[index + 1].focus();
		}
	};

	const handleKeyDown = (index, e) => {
		// Move focus to the previous input box on backspace
		if (e.key === 'Backspace' && index > 0 && !otp[index]) {
			otpInputRefs.current[index - 1].focus();
		}
	};

	// Nice thing to have if the OTP auto submits upon input boxes' completion
	// but then what would be the point of the 'Verify OTP' button if we added this functionality?

	return (
		<div className="min-h-screen bg-gray-100 flex items-center justify-center">
			<div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
				<div className="flex justify-center">
					<img src={ShieldIcon} alt="Shield Icon" className="h-48 w-48" />
				</div>
				<h1 className="text-2xl font-bold text-center text-blue-600 mb-4">
					OTP Verification
				</h1>
				<p className="text-sm text-gray-600 text-center mb-6">
					Enter the 6-digit code sent to your phone.
				</p>
				<form onSubmit={handleOtpSubmit}>
					<div className="flex justify-center space-x-3 mb-6">
						{otp.map((digit, index) => (
							<input
								key={index}
								type="text"
								maxLength="1"
								value={digit}
								onChange={(e) => handleOtpChange(index, e.target.value)}
								onKeyDown={(e) => handleKeyDown(index, e)}
								ref={(el) => (otpInputRefs.current[index] = el)}
								className="w-12 h-12 text-center text-xl border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
							/>
						))}
					</div>
					<Button type="submit" className="w-full">
						Verify OTP
					</Button>
					<div className="mt-4 text-center">
						<p className="text-sm text-gray-600">
							Didn't receive the code?{' '}
							<button
								type="button"
								onClick={() => alert('OTP resent!')} // Simulate OTP resend
								className="text-blue-600 hover:underline focus:outline-none"
							>
								Resend
							</button>
						</p>
					</div>
				</form>
			</div>
		</div>
	);
}
