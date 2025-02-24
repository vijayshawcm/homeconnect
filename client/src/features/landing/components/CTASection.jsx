import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

function CTASection() {
	return (
		<section className="py-20 sm:py-32 bg-white relative overflow-hidden">
			<div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-purple-500/5 to-cyan-500/5" />
			<div className="container mx-auto max-w-7xl px-6 relative">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
					viewport={{ once: true }}
					className="max-w-3xl mx-auto text-center"
				>
					<h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
						Ready to Transform Your Home?
					</h2>
					<p className="text-lg text-muted-foreground mb-8">
						Join thousands of homeowners who are already experiencing the future
						of smart living
					</p>
					<Link to="/login">
						<Button
							size="lg"
							className="h-12 px-8 bg-violet-600 hover:bg-violet-700"
						>
							Get Started Now
							<ArrowRight className="ml-2 h-5 w-5" />
						</Button>
					</Link>
				</motion.div>
			</div>
		</section>
	);
}

export default CTASection;
