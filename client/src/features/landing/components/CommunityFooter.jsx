const CommunityFooter = () => {
	const currentYear = new Date().getFullYear();

	return (
		<footer className="bg-gray-800 text-white py-8">
			<div className="container mx-auto px-4 text-center">
				<h2 className="text-xl font-bold mb-2">HomeConnect</h2>
				<p className="mb-4">Empowering smart homes around the world</p>
				<p className="text-sm text-gray-400">
					&copy; {currentYear} HomeConnect. All rights reserved.
				</p>
			</div>
		</footer>
	);
};

export default CommunityFooter;
