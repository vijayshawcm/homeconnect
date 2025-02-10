import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import SmartHome from '../assets/smart-home.png';

function LandingPage() {
	return (
		<div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 to-black text-white">
			<motion.div
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8 }}
				className="text-center"
			>
				<h1 className="text-5xl font-bold tracking-tight mb-4">
					Welcome to HomeConnect
				</h1>
				<p className="text-lg text-gray-300 max-w-2xl mx-auto mb-6">
					The ultimate smart home management system designed for efficiency,
					security, and convenience.
				</p>
				<motion.div
					initial={{ opacity: 0, scale: 0.9 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ duration: 0.5, delay: 0.3 }}
				>
					<Link to="/register">
						<Button className="px-6 py-3 text-lg font-semibold rounded-xl bg-blue-500 hover:bg-blue-600 flex items-center gap-2">
							Get Started <ArrowRight size={20} />
						</Button>
					</Link>
				</motion.div>
			</motion.div>
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 1, delay: 0.5 }}
				className="mt-12 max-w-4xl"
			>
				<img
					src={SmartHome}
					alt="Smart Home Dashboard"
					className="w-full rounded-2xl shadow-lg"
				/>
			</motion.div>
		</div>
	);
}

export default LandingPage;
