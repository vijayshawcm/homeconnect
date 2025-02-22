import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { ThermometerSun, Lightbulb, Lock, Wifi } from 'lucide-react';

const features = [
	{
		title: 'Smart Climate Control',
		description:
			'AI-powered temperature management that learns your preferences and optimizes energy usage.',
		icon: ThermometerSun,
		gradient: 'from-violet-500/20 to-purple-500/20',
		iconBg: 'bg-violet-600',
	},
	{
		title: 'Intelligent Lighting',
		description:
			'Automated lighting systems that adjust based on natural light and room occupancy.',
		icon: Lightbulb,
		gradient: 'from-cyan-500/20 to-blue-500/20',
		iconBg: 'bg-cyan-600',
	},
	{
		title: 'Enhanced Security',
		description:
			'Advanced security features with real-time monitoring and instant alerts.',
		icon: Lock,
		gradient: 'from-purple-500/20 to-violet-500/20',
		iconBg: 'bg-purple-600',
	},
	{
		title: 'Seamless Connectivity',
		description:
			'Connect and control all your smart devices from a single, intuitive interface.',
		icon: Wifi,
		gradient: 'from-blue-500/20 to-cyan-500/20',
		iconBg: 'bg-blue-600',
	},
];

const containerVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.2,
			delayChildren: 0.3,
		},
	},
};

const itemVariants = {
	hidden: { opacity: 0, y: 20 },
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.8,
			ease: 'easeOut',
		},
	},
};

function FeaturesSection({ isVisible }) {
	return (
		<section
			id="features"
			className="relative py-28 bg-gradient-to-b from-violet-800 to-gray-900 overflow-hidden"
		>
			{/* Background Pattern */}
			<div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#ffffff0a_1px,transparent_1px)] bg-[size:24px_24px]" />

			<div className="container relative mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
				<motion.div
					initial="hidden"
					animate={isVisible ? 'visible' : 'hidden'}
					variants={containerVariants}
					className="space-y-16"
				>
					{/* Section Header */}
					<motion.div
						variants={itemVariants}
						className="text-center max-w-3xl mx-auto space-y-4"
					>
						<h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-white">
							Intelligent Features for Modern Living
						</h2>
						<p className="text-lg text-violet-200 leading-relaxed">
							Experience the perfect blend of comfort, security, and efficiency
							with our cutting-edge smart home solutions.
						</p>
					</motion.div>

					{/* Features Grid */}
					<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
						{features.map((feature, index) => {
							const Icon = feature.icon;
							return (
								<motion.div
									key={feature.title}
									variants={itemVariants}
									className="relative group"
								>
									<Card className="relative h-full p-8 bg-white/10 backdrop-blur-sm border-white/10 hover:shadow-2xl transition-all duration-300 group">
										<div
											className={cn(
												'absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg',
												feature.gradient
											)}
										/>
										<div className="relative space-y-4">
											<motion.div
												className={cn(
													'mx-auto flex items-center justify-center w-16 h-16 rounded-full mb-2 transition-transform duration-300 group-hover:scale-110',
													feature.iconBg
												)}
												whileHover={{ rotate: 5 }}
											>
												<Icon className="text-white w-8 h-8" />
											</motion.div>
											<div className="text-center space-y-2">
												<h3 className="text-xl font-semibold text-white">
													{feature.title}
												</h3>
												<p className="text-violet-200 leading-relaxed">
													{feature.description}
												</p>
											</div>
										</div>
									</Card>
								</motion.div>
							);
						})}
					</div>
				</motion.div>
			</div>

			{/* Bottom Gradient Line */}
			<div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/50 to-transparent" />
		</section>
	);
}

export default FeaturesSection;
