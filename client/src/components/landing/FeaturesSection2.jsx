import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { ThermometerSun, Lightbulb, Lock, Wifi } from 'lucide-react';

const features = [
	{
		title: 'Smart Climate Control',
		description:
			'AI-powered temperature management that learns your preferences and optimizes energy usage.',
		icon: <ThermometerSun className="h-6 w-6" />,
		gradient: 'from-violet-500/20 to-purple-500/20',
	},
	{
		title: 'Intelligent Lighting',
		description:
			'Automated lighting systems that adjust based on natural light and room occupancy.',
		icon: <Lightbulb className="h-6 w-6" />,
		gradient: 'from-cyan-500/20 to-blue-500/20',
	},
	{
		title: 'Enhanced Security',
		description:
			'Advanced security features with real-time monitoring and instant alerts.',
		icon: <Lock className="h-6 w-6" />,
		gradient: 'from-purple-500/20 to-violet-500/20',
	},
	{
		title: 'Seamless Connectivity',
		description:
			'Connect and control all your smart devices from a single, intuitive interface.',
		icon: <Wifi className="h-6 w-6" />,
		gradient: 'from-blue-500/20 to-cyan-500/20',
	},
];

function FeaturesSection({ isVisible }) {
	return (
		<section
			id="features"
			className="py-20 sm:py-32 bg-white relative overflow-hidden"
		>
			<div className="container mx-auto max-w-7xl px-6">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={isVisible ? { opacity: 1, y: 0 } : {}}
					transition={{ duration: 0.8 }}
					className="text-center max-w-3xl mx-auto mb-16"
				>
					<h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
						Intelligent Features for Modern Living
					</h2>
					<p className="text-lg text-muted-foreground">
						Experience the perfect blend of comfort, security, and efficiency
					</p>
				</motion.div>

				<div className="grid md:grid-cols-2 gap-8">
					{features.map((feature, index) => (
						<motion.div
							key={feature.title}
							initial={{ opacity: 0, y: 20 }}
							animate={isVisible ? { opacity: 1, y: 0 } : {}}
							transition={{ duration: 0.8, delay: index * 0.2 }}
						>
							<Card className="p-6 h-full hover:shadow-lg transition-all group relative overflow-hidden">
								<div
									className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
								/>
								<div className="relative">
									<div className="rounded-lg w-12 h-12 bg-violet-500/10 text-violet-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500">
										{feature.icon}
									</div>
									<h3 className="text-xl font-semibold mb-2">
										{feature.title}
									</h3>
									<p className="text-muted-foreground">{feature.description}</p>
								</div>
							</Card>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
}

export default FeaturesSection;
