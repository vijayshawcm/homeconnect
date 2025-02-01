export default function App() {
	return (
		<div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
			<h1 className="text-4xl font-bold text-blue-600 mb-4">
				Welcome to HomeConnect
			</h1>
			<p className="text-lg text-gray-700">
				Manage your smart home with ease and efficiency.
			</p>
			<div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
				<div className="bg-white p-6 rounded-lg shadow-md">
					<h2 className="text-xl font-semibold text-gray-800">Energy Usage</h2>
					<p className="text-gray-600">
						Monitor your energy consumption in real-time.
					</p>
				</div>
				<div className="bg-white p-6 rounded-lg shadow-md">
					<h2 className="text-xl font-semibold text-gray-800">
						Device Management
					</h2>
					<p className="text-gray-600">
						Control and manage your smart home devices.
					</p>
				</div>
			</div>
		</div>
	);
}
