import { motion } from 'framer-motion';
import DashboardGallery from '@/features/landing/components/DashboardGallery';

const stats = [
	{ value: '30%', label: 'Average Energy Savings' },
	{ value: '15min', label: 'Setup Time' },
	{ value: '24/7', label: 'Smart Monitoring' },
	{ value: '50k+', label: 'Happy Homes' },
];

function DashboardSection() {
	return (
		<section
			id="dashboard"
			className="py-20 sm:py-32 bg-gradient-to-b from-white to-violet-50/50 relative overflow-hidden"
		>
			<div className="container mx-auto max-w-7xl px-6">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
					viewport={{ once: true }}
					className="text-center max-w-3xl mx-auto mb-16"
				>
					<h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
						Complete Control at Your Fingertips
					</h2>
					<p className="text-lg text-muted-foreground">
						Monitor and manage your entire home from our intuitive dashboard
					</p>
				</motion.div>

				<div className="relative mx-auto mb-16">
					<div className="absolute -inset-4 bg-gradient-to-r from-violet-500/30 via-purple-500/30 to-cyan-500/30 rounded-2xl blur-3xl opacity-50" />
					<DashboardGallery />
				</div>

				<div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
					{stats.map((stat, index) => (
						<motion.div
							key={stat.label}
							initial={{ opacity: 0, scale: 0.5 }}
							whileInView={{ opacity: 1, scale: 1 }}
							transition={{ duration: 0.8, delay: index * 0.2 }}
							viewport={{ once: true }}
							className="text-center"
						>
							<div className="text-3xl md:text-4xl font-bold text-violet-600 mb-1">
								{stat.value}
							</div>
							<div className="text-sm text-muted-foreground">{stat.label}</div>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
}

export default DashboardSection;
