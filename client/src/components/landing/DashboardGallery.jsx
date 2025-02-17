import { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import Dashboard from '@/assets/dashboard-preview.png';

const dashboardImages = [
	{ src: Dashboard, alt: 'Dashboard Overview', title: 'Smart Dashboard' },
	{ src: Dashboard, alt: 'Energy Analytics', title: 'Energy Analytics' },
	{ src: Dashboard, alt: 'Device Management', title: 'Device Management' },
	{ src: Dashboard, alt: 'Security Controls', title: 'Security Controls' },
];

function DashboardGallery() {
	const [currentIndex, setCurrentIndex] = useState(0);
	const scrollContainerRef = useRef(null);

	const scrollTo = (index) => {
		const container = scrollContainerRef.current;
		if (container) {
			const scrollWidth = container.scrollWidth / dashboardImages.length;
			container.scrollTo({
				left: scrollWidth * index,
				behavior: 'smooth',
			});
			setCurrentIndex(index);
		}
	};

	const handleScroll = (direction) => {
		const newIndex =
			direction === 'next'
				? Math.min(currentIndex + 1, dashboardImages.length - 1)
				: Math.max(currentIndex - 1, 0);
		scrollTo(newIndex);
	};

	return (
		<div className="relative group w-4/5 mx-auto rounded-2xl overflow-hidden">
			<div
				ref={scrollContainerRef}
				className="overflow-x-auto scrollbar-hide snap-x snap-mandatory flex gap-6"
				style={{ WebkitOverflowScrolling: 'touch' }}
			>
				{dashboardImages.map((image, index) => (
					<div key={index} className="flex-none w-full snap-center">
						<div className="relative rounded-2xl shadow-2xl overflow-hidden border">
							<img
								src={image.src || '/placeholder.svg'}
								alt={image.alt}
								className="w-full"
							/>
							<div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-6">
								<h3 className="text-white text-xl font-semibold">
									{image.title}
								</h3>
							</div>
						</div>
					</div>
				))}
			</div>

			<button
				onClick={() => handleScroll('prev')}
				className={cn(
					'absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg transition-all',
					'opacity-0 group-hover:opacity-100',
					currentIndex === 0 && 'hidden'
				)}
				aria-label="Previous image"
			>
				<ChevronLeft className="h-6 w-6" />
			</button>

			<button
				onClick={() => handleScroll('next')}
				className={cn(
					'absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg transition-all',
					'opacity-0 group-hover:opacity-100',
					currentIndex === dashboardImages.length - 1 && 'hidden'
				)}
				aria-label="Next image"
			>
				<ChevronRight className="h-6 w-6" />
			</button>

			<div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
				{dashboardImages.map((_, index) => (
					<button
						key={index}
						onClick={() => scrollTo(index)}
						className={cn(
							'w-2 h-2 rounded-full transition-all',
							index === currentIndex ? 'bg-white w-4' : 'bg-white/50'
						)}
						aria-label={`Go to image ${index + 1}`}
					/>
				))}
			</div>
		</div>
	);
}

export default DashboardGallery;
