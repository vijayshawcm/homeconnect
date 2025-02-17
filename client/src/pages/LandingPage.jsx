import { useEffect, useRef, useState } from 'react';
import Header from '@/components/landing/Header';
import ScrollProgress from '@/components/landing/ScrollProgress';
import HeroSection from '@/components/landing/HeroSection';
import FeaturesSection from '@/components/landing/FeaturesSection';
import FeaturesSection2 from '@/components/landing/FeaturesSection2';
import DashboardSection from '@/components/landing/DashboardSection';
import CTASection from '@/components/landing/CTASection';
import Footer from '@/components/landing/Footer';
import ScrollToTop from '@/components/landing/ScrollToTop';

export default function LandingPage() {
	const [isScrolled, setIsScrolled] = useState(false);
	const [showScrollTop, setShowScrollTop] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 50);
			setShowScrollTop(window.scrollY > 500);
		};

		window.addEventListener('scroll', handleScroll);
		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	return (
		<div className="overflow-hidden">
			<ScrollProgress />
			<Header isScrolled={isScrolled} />
			<HeroSection />
			<FeaturesSection isVisible={true} />
			<DashboardSection />
			<CTASection />
			<Footer />
			<ScrollToTop isVisible={showScrollTop} />
		</div>
	);
}
