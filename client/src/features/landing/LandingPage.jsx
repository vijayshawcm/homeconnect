import { useEffect, useRef, useState } from 'react';
import Header from '@/features/landing/components/Header';
import ScrollProgress from '@/features/landing/components/ScrollProgress';
import HeroSection from '@/features/landing/components/HeroSection';
import FeaturesSection from '@/features/landing/components/FeaturesSection';
import DashboardSection from '@/features/landing/components/DashboardSection';
import InteractiveQuiz from '@/features/landing/components/InteractiveQuiz';
import FAQSection from '@/features/landing/components/FAQSection';
import CommunityFooter from '@/features/landing/components/CommunityFooter';
import ScrollToTop from '@/features/landing/components/ScrollToTop';
import { updatePageTitle } from '@/lib/utils';

function LandingPage() {
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

	useEffect(() => {
		updatePageTitle(); // Use default title
	}, []);

	return (
		<div className="overflow-hidden">
			<ScrollProgress />
			<Header isScrolled={isScrolled} />
			<HeroSection />
			<FeaturesSection isVisible={true} />
			<DashboardSection />
			<InteractiveQuiz />
			<FAQSection />
			<CommunityFooter />
			<ScrollToTop isVisible={showScrollTop} />
		</div>
	);
}

export default LandingPage;
