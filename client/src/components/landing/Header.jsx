import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import HomeConnectLogo from '@/assets/homeconnect-logo.png';

function Header({ isScrolled }) {
	// Function to handle smooth scrolling
	const scrollToSection = (id) => {
		const element = document.getElementById(id);
		if (element) {
			element.scrollIntoView({
				behavior: 'smooth',
				block: 'start', // Scrolls to the top of section
			});
		}
	};

	return (
		<header
			className={cn(
				'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
				isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm' : 'bg-transparent'
			)}
		>
			<div className="container mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
				{/* Brand Logo */}
				<Link to="/" className="flex items-center space-x-2">
					<img
						src={HomeConnectLogo}
						alt="HomeConnect Logo"
						className="h-10 w-auto"
					/>
				</Link>
				{/* Navigation */}
				<nav className="hidden md:flex items-center space-x-10">
					{/* Features Link */}
					<a
						href="#features"
						onClick={(e) => {
							e.preventDefault(); // Prevent default anchor behavior
							scrollToSection('features'); // Scroll to the features section
						}}
						className={cn(
							'text-base font-medium transition-colors cursor-pointer',
							// Switch text color on scroll
							isScrolled
								? 'text-gray-700 hover:text-violet-600'
								: 'text-white hover:text-violet-200'
						)}
					>
						Features
					</a>
					{/* Dashboard Link */}
					<a
						href="#dashboard"
						onClick={(e) => {
							e.preventDefault(); // Prevent default anchor behavior
							scrollToSection('dashboard'); // Scroll to the dashboard section
						}}
						className={cn(
							'text-base font-medium transition-colors cursor-pointer',
							isScrolled
								? 'text-gray-700 hover:text-violet-600'
								: 'text-white hover:text-violet-200'
						)}
					>
						Dashboard
					</a>
					{/* "Get Started" Button */}
					<Link to="/login">
						<Button
							size="sm"
							className={cn(
								'transition-colors font-semibold',
								isScrolled
									? 'bg-violet-600 hover:bg-violet-700 text-white'
									: 'bg-white text-violet-600 hover:bg-violet-50'
							)}
						>
							Get Started
						</Button>
					</Link>
				</nav>
			</div>
		</header>
	);
}

export default Header;
