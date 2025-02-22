import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

function ScrollToTop({ isVisible }) {
	const handleClick = () => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	};

	return (
		<AnimatePresence>
			{isVisible && (
				<motion.button
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: 20 }}
					onClick={handleClick}
					className="fixed bottom-6 right-6 bg-violet-600 hover:bg-violet-700 text-white rounded-full p-3 shadow-lg transition-colors"
					aria-label="Scroll to top"
				>
					<ArrowUp className="h-6 w-6" />
				</motion.button>
			)}
		</AnimatePresence>
	);
}

export default ScrollToTop;
