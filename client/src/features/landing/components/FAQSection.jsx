import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const FAQSection = () => {
	const faqs = [
		{
			question: 'What is HomeConnect?',
			answer:
				'HomeConnect is a smart home management platform that allows you to control all your connected devices from one dashboard. It helps you save energy, enhance comfort, and simplify your daily routines.',
		},
		{
			question: 'How does HomeConnect save energy?',
			answer:
				"HomeConnect tracks your energy usage patterns and automatically adjusts your devices based on occupancy, time of day, and weather conditions. You'll receive personalized recommendations to reduce consumption.",
		},
		{
			question: 'Is HomeConnect secure?',
			answer:
				'Yes. HomeConnect uses encryption and two-factor authentication to keep your data safe. We regularly perform security audits and never share your information without consent.',
		},
		{
			question: 'Can I control devices from different manufacturers?',
			answer:
				"Yes. HomeConnect works with most major smart home brands including Philips Hue, Nest, Ecobee, and Samsung SmartThings. We're continuously expanding our compatibility.",
		},
		{
			question: 'Do I need technical knowledge to use HomeConnect?',
			answer:
				'No. HomeConnect is designed to be user-friendly for everyone. Our interface makes it easy to set up devices and create automation routines.',
		},
		{
			question: 'Can multiple family members use HomeConnect?',
			answer:
				'Yes. HomeConnect supports multiple user profiles with customizable permission levels for family members or guests.',
		},
	];

	const [activeIndex, setActiveIndex] = useState(null);

	const toggleFAQ = (index) => {
		setActiveIndex(activeIndex === index ? null : index);
	};

	return (
		<section className="py-16 bg-white">
			<div className="container mx-auto px-4 max-w-4xl">
				<div className="text-center mb-12">
					<h2 className="text-3xl font-bold text-gray-900">
						Frequently Asked Questions
					</h2>
					<p className="mt-4 text-gray-600">
						Find answers to common questions about HomeConnect
					</p>
				</div>

				<div className="divide-y divide-gray-200 border-t border-b border-gray-200">
					{faqs.map((faq, index) => (
						<div key={index} className="py-5">
							<button
								className="flex w-full justify-between items-center text-left focus:outline-none"
								onClick={() => toggleFAQ(index)}
								aria-expanded={activeIndex === index}
							>
								<h3 className="text-lg font-medium text-gray-900">
									{faq.question}
								</h3>
								<span className="ml-6 flex-shrink-0">
									<ChevronDown
										className={`h-5 w-5 text-gray-500 transition-transform duration-200 ${
											activeIndex === index ? 'rotate-180 text-indigo-600' : ''
										}`}
									/>
								</span>
							</button>
							{activeIndex === index && (
								<div className="mt-3 pr-12">
									<p className="text-base text-gray-600">{faq.answer}</p>
								</div>
							)}
						</div>
					))}
				</div>

				<div className="mt-10 text-center">
					<p className="text-gray-600">
						Still have questions?{' '}
						<a
							href="#contact"
							className="text-indigo-600 font-medium hover:text-indigo-500"
						>
							Contact our support team
						</a>
					</p>
				</div>
			</div>
		</section>
	);
};

export default FAQSection;
