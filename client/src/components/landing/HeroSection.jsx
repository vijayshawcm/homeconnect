import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import SmartHome from '@/assets/smart-home.png';

function HeroSection() {
	return (
		<section className="relative min-h-[90vh] sm:min-h-screen flex items-center justify-center bg-gradient-to-br from-violet-600 via-purple-600 to-violet-800 overflow-hidden">
			{/* Container */}
			<div className="container mx-auto max-w-7xl px-6 py-20 relative">
				<div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
					{/* Left: Headline + Buttons */}
					<motion.div
						initial={{ opacity: 0, x: -20 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.8 }}
						className="text-left"
					>
						<h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight tracking-tight mb-4 text-white">
							Welcome to{' '}
							<motion.span
								className="inline-block"
								initial={{ opacity: 0, clipPath: 'inset(0% 100% 0% 0%)' }}
								animate={{ opacity: 1, clipPath: 'inset(0% 0% 0% 0%)' }}
								transition={{ duration: 2, ease: 'easeOut' }}
							>
								<span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-200 to-cyan-200">
									HomeConnect
								</span>
							</motion.span>
						</h1>

						<p className="text-xl md:text-2xl text-violet-100 font-medium mb-4">
							Smarter living, at your fingertips.
						</p>

						<p className="text-base md:text-lg text-violet-200 mb-8 max-w-lg">
							Transform your home into an intelligent ecosystem that adapts to
							your lifestyle. Experience unprecedented comfort, security, and
							energy efficiency with our cutting-edge smart home solution.
						</p>

						<div className="flex flex-col sm:flex-row gap-4">
							<Link to="/login">
								<Button
									size="lg"
									className="h-12 px-8 bg-white text-violet-600 hover:bg-violet-50 group"
								>
									Get Started
									<ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
								</Button>
							</Link>
							<Button
								size="lg"
								variant="secondary"
								className="h-12 px-8 bg-white/20 text-white hover:bg-white/30 transition-colors"
							>
								Watch Demo
							</Button>
						</div>
					</motion.div>

					{/* Right: Smart Home Illustration */}
					<motion.div
						initial={{ opacity: 0, x: 20 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.8, delay: 0.2 }}
						className="relative lg:justify-self-end"
					>
						<motion.img
							src={SmartHome}
							alt="Smart Home Illustration"
							className="relative w-full max-w-lg mx-auto"
							animate={{ y: [0, -20, 0] }}
							transition={{
								duration: 4,
								repeat: Infinity,
								ease: 'easeInOut',
							}}
						/>
					</motion.div>
				</div>
			</div>
		</section>
	);
}

export default HeroSection;
