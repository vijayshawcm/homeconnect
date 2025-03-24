import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
	Check,
	ChevronRight,
	Home,
	Lightbulb,
	Thermometer,
	Droplets,
	Shield,
	Zap,
	Sparkles,
	ArrowRight,
} from 'lucide-react';

const quizQuestions = [
	{
		id: 1,
		question: "What's your primary goal for home automation?",
		options: [
			{
				id: 'a',
				text: 'Energy efficiency and cost savings',
				icon: <Zap className="h-6 w-6" />,
				color: 'from-green-400 to-emerald-600',
			},
			{
				id: 'b',
				text: 'Convenience and comfort',
				icon: <Home className="h-6 w-6" />,
				color: 'from-blue-400 to-indigo-600',
			},
			{
				id: 'c',
				text: 'Security and safety',
				icon: <Shield className="h-6 w-6" />,
				color: 'from-purple-400 to-violet-600',
			},
			{
				id: 'd',
				text: 'All of the above',
				icon: <Check className="h-6 w-6" />,
				color: 'from-pink-400 to-rose-600',
			},
		],
	},
	{
		id: 2,
		question: 'Which room would you prioritize automating first?',
		options: [
			{
				id: 'a',
				text: 'Living room',
				icon: <Home className="h-6 w-6" />,
				color: 'from-amber-400 to-orange-600',
			},
			{
				id: 'b',
				text: 'Bedroom',
				icon: <Home className="h-6 w-6" />,
				color: 'from-indigo-400 to-blue-600',
			},
			{
				id: 'c',
				text: 'Kitchen',
				icon: <Home className="h-6 w-6" />,
				color: 'from-emerald-400 to-green-600',
			},
			{
				id: 'd',
				text: 'Bathroom',
				icon: <Droplets className="h-6 w-6" />,
				color: 'from-cyan-400 to-sky-600',
			},
		],
	},
	{
		id: 3,
		question: 'Which feature interests you most?',
		options: [
			{
				id: 'a',
				text: 'Smart lighting',
				icon: <Lightbulb className="h-6 w-6" />,
				color: 'from-yellow-400 to-amber-600',
			},
			{
				id: 'b',
				text: 'Climate control',
				icon: <Thermometer className="h-6 w-6" />,
				color: 'from-sky-400 to-blue-600',
			},
			{
				id: 'c',
				text: 'Energy monitoring',
				icon: <Zap className="h-6 w-6" />,
				color: 'from-green-400 to-emerald-600',
			},
			{
				id: 'd',
				text: 'Security systems',
				icon: <Shield className="h-6 w-6" />,
				color: 'from-purple-400 to-violet-600',
			},
		],
	},
	{
		id: 4,
		question: 'How would you describe your technical expertise?',
		options: [
			{
				id: 'a',
				text: 'Beginner - I need simple solutions',
				icon: <Sparkles className="h-6 w-6" />,
				color: 'from-blue-400 to-indigo-600',
			},
			{
				id: 'b',
				text: 'Intermediate - I can follow instructions',
				icon: <Sparkles className="h-6 w-6" />,
				color: 'from-indigo-400 to-violet-600',
			},
			{
				id: 'c',
				text: "Advanced - I'm comfortable with technology",
				icon: <Sparkles className="h-6 w-6" />,
				color: 'from-violet-400 to-purple-600',
			},
			{
				id: 'd',
				text: 'Expert - I can build custom solutions',
				icon: <Sparkles className="h-6 w-6" />,
				color: 'from-purple-400 to-fuchsia-600',
			},
		],
	},
	{
		id: 5,
		question: "What's your budget for home automation?",
		options: [
			{
				id: 'a',
				text: 'Under $500',
				icon: <Zap className="h-6 w-6" />,
				color: 'from-emerald-400 to-green-600',
			},
			{
				id: 'b',
				text: '$500 - $1,000',
				icon: <Zap className="h-6 w-6" />,
				color: 'from-blue-400 to-indigo-600',
			},
			{
				id: 'c',
				text: '$1,000 - $5,000',
				icon: <Zap className="h-6 w-6" />,
				color: 'from-violet-400 to-purple-600',
			},
			{
				id: 'd',
				text: 'Over $5,000',
				icon: <Zap className="h-6 w-6" />,
				color: 'from-rose-400 to-pink-600',
			},
		],
	},
];

// Recommendation profiles based on answers
const getRecommendation = (answers) => {
	// Count the most common answers
	const counts = answers.reduce((acc, answer) => {
		acc[answer] = (acc[answer] || 0) + 1;
		return acc;
	}, {});

	// Find the most common answer
	let maxCount = 0;
	let mostCommon = '';

	for (const answer in counts) {
		if (counts[answer] > maxCount) {
			maxCount = counts[answer];
			mostCommon = answer;
		}
	}

	const profiles = {
		a: {
			title: 'Efficiency Optimizer',
			description:
				"You're focused on making your home more efficient and reducing energy costs. HomeConnect's energy monitoring and smart device control will help you save money while reducing your environmental footprint.",
			recommendation:
				"Start with our Energy Monitoring Dashboard to track and optimize your home's energy usage.",
			icon: <Zap className="h-16 w-16 text-green-500" />,
			gradient: 'from-green-400 to-emerald-600',
			features: [
				'Real-time energy usage monitoring',
				'Automated energy-saving routines',
				'Cost analysis and optimization suggestions',
				'Smart device scheduling for peak efficiency',
			],
		},
		b: {
			title: 'Comfort Enthusiast',
			description:
				"You value comfort and convenience in your living space. HomeConnect's automated routines and intuitive controls will make your home respond to your needs without complicated setup.",
			recommendation:
				'Begin with Smart Room Controls to create the perfect ambiance in your favorite spaces.',
			icon: <Home className="h-16 w-16 text-blue-500" />,
			gradient: 'from-blue-400 to-indigo-600',
			features: [
				'One-touch room ambiance settings',
				'Automated morning and evening routines',
				'Voice-controlled environment adjustments',
				'Personalized comfort profiles for each family member',
			],
		},
		c: {
			title: 'Security Conscious',
			description:
				"Safety and security are your top priorities. HomeConnect's monitoring and alert systems will give you peace of mind whether you're home or away.",
			recommendation:
				"Set up Security Monitoring to keep track of your home's status from anywhere.",
			icon: <Shield className="h-16 w-16 text-purple-500" />,
			gradient: 'from-purple-400 to-violet-600',
			features: [
				'Real-time security alerts and notifications',
				'Remote monitoring of all entry points',
				'Automated lighting to simulate occupancy',
				'Integration with emergency services',
			],
		},
		d: {
			title: 'Smart Home Enthusiast',
			description:
				"You want it all! A comprehensive smart home setup that balances efficiency, comfort, and security. HomeConnect's integrated platform is perfect for your holistic approach.",
			recommendation:
				'Explore our Complete Home Dashboard to manage all aspects of your smart home.',
			icon: <Sparkles className="h-16 w-16 text-violet-500" />,
			gradient: 'from-violet-400 to-fuchsia-600',
			features: [
				'Comprehensive home management dashboard',
				'Advanced automation across all systems',
				'AI-powered optimization and suggestions',
				'Seamless integration between all smart devices',
			],
		},
	};

	return profiles[mostCommon] || profiles['d'];
};

const InteractiveQuiz = () => {
	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [answers, setAnswers] = useState([]);
	const [showResults, setShowResults] = useState(false);
	const [recommendation, setRecommendation] = useState(null);
	const [isAnimating, setIsAnimating] = useState(false);
	const [selectedOption, setSelectedOption] = useState(null);
	const navigate = useNavigate();

	const totalQuestions = quizQuestions.length;
	const progress = (currentQuestion / totalQuestions) * 100;

	const handleAnswer = (optionId) => {
		if (isAnimating) return;
		setIsAnimating(true);
		setSelectedOption(optionId);
		const newAnswers = [...answers, optionId];
		setAnswers(newAnswers);
		setTimeout(() => {
			if (currentQuestion < totalQuestions - 1) {
				setCurrentQuestion(currentQuestion + 1);
				setSelectedOption(null);
			} else {
				setRecommendation(getRecommendation(newAnswers));
				setShowResults(true);
			}
			setIsAnimating(false);
		}, 600);
	};

	const resetQuiz = () => {
		setCurrentQuestion(0);
		setAnswers([]);
		setShowResults(false);
		setRecommendation(null);
		setSelectedOption(null);
	};

	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				when: 'beforeChildren',
				staggerChildren: 0.1,
			},
		},
		exit: {
			opacity: 0,
			transition: { when: 'afterChildren' },
		},
	};

	const itemVariants = {
		hidden: { y: 20, opacity: 0 },
		visible: {
			y: 0,
			opacity: 1,
			transition: { type: 'spring', stiffness: 300, damping: 24 },
		},
		exit: { y: -20, opacity: 0 },
	};

	return (
		<section className="py-10 sm:py-20 bg-white relative overflow-hidden">
			<div className="container mx-auto px-6 relative">
				<AnimatePresence mode="wait">
					{!showResults ? (
						<motion.div
							key="quiz"
							variants={containerVariants}
							initial="hidden"
							animate="visible"
							exit="exit"
							className="w-4/6 mx-auto"
						>
							<motion.div variants={itemVariants} className="text-center mb-10">
								<h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-indigo-600">
									Discover Your Ideal Smart Home
								</h2>
								<p className="text-lg text-slate-600">
									Take this quick quiz to get personalized recommendations
									tailored to your lifestyle
								</p>
							</motion.div>

							<motion.div variants={itemVariants} className="mb-8">
								<div className="flex justify-between text-sm mb-2 text-slate-600">
									<span className="font-medium">
										Question {currentQuestion + 1} of {totalQuestions}
									</span>
									<span>{Math.round(progress)}% Complete</span>
								</div>
								<div className="h-2 bg-slate-100 rounded-full overflow-hidden">
									<motion.div
										className="h-full bg-gradient-to-r from-violet-500 to-indigo-500"
										initial={{
											width: `${(currentQuestion / totalQuestions) * 100}%`,
										}}
										animate={{ width: `${progress}%` }}
										transition={{ duration: 0.5, ease: 'easeInOut' }}
									/>
								</div>
							</motion.div>

							<motion.div
								variants={itemVariants}
								className="bg-white rounded-2xl shadow-xl p-8 mb-8 backdrop-blur-sm bg-white/80 border border-slate-100"
							>
								<h3 className="text-xl md:text-2xl font-semibold mb-8 text-slate-800">
									{quizQuestions[currentQuestion].question}
								</h3>

								<div className="grid gap-4">
									{quizQuestions[currentQuestion].options.map((option) => (
										<motion.button
											key={option.id}
											whileHover={{
												scale: 1.02,
												boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
											}}
											whileTap={{ scale: 0.98 }}
											onClick={() => handleAnswer(option.id)}
											className={`flex items-center p-5 rounded-xl border-2 transition-all text-left relative overflow-hidden group ${
												selectedOption === option.id
													? 'border-transparent shadow-lg'
													: 'border-slate-100 hover:border-violet-200 shadow-sm'
											}`}
										>
											<div
												className={`absolute inset-0 bg-gradient-to-r ${
													option.color
												} opacity-0 transition-opacity duration-300 ${
													selectedOption === option.id
														? 'opacity-10'
														: 'group-hover:opacity-5'
												}`}
											/>

											{/* Icon container */}
											{option.icon && (
												<div
													className={`flex items-center justify-center w-12 h-12 rounded-lg mr-4 bg-gradient-to-br ${option.color} text-white`}
												>
													{option.icon}
												</div>
											)}

											{/* Text content */}
											<span className="font-medium text-slate-800 group-hover:text-slate-900">
												{option.text}
											</span>

											{/* Arrow that appears on hover/selection */}
											<div
												className={`ml-auto transform transition-transform duration-300 ${
													selectedOption === option.id
														? 'translate-x-0 opacity-100'
														: 'translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100'
												}`}
											>
												<ArrowRight className="h-5 w-5 text-slate-500" />
											</div>
										</motion.button>
									))}
								</div>
							</motion.div>
						</motion.div>
					) : (
						<motion.div
							key="results"
							variants={containerVariants}
							initial="hidden"
							animate="visible"
							className="w-4/6 mx-auto"
						>
							<motion.div
								variants={itemVariants}
								className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-8 backdrop-blur-sm bg-white/90 border border-slate-100"
							>
								<div className="text-center mb-10">
									<div className="inline-flex items-center justify-center p-3 mb-6 rounded-full bg-gradient-to-br from-violet-100 to-indigo-100">
										<div
											className={`p-4 rounded-full bg-gradient-to-r ${recommendation.gradient} text-white`}
										>
											{recommendation.icon}
										</div>
									</div>

									<h2 className="text-2xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-indigo-600">
										Your Smart Home Profile: {recommendation.title}
									</h2>

									<p className="text-ms text-slate-600 max-w-2xl mx-auto">
										{recommendation.description}
									</p>
								</div>

								<div className="grid md:grid-cols-2 gap-8 mb-10">
									<div className="bg-gradient-to-br from-violet-50 to-indigo-50 rounded-xl p-6 border border-violet-100">
										<h3 className="font-semibold text-violet-800 mb-4 text-lg">
											Recommended Starting Point
										</h3>
										<p className="text-slate-700 mb-4">
											{recommendation.recommendation}
										</p>
										<div className="flex items-center text-violet-600">
											<Sparkles className="h-5 w-5 mr-2" />
											<span className="font-medium">
												Perfect match for your needs
											</span>
										</div>
									</div>

									<div className="bg-gradient-to-br from-slate-50 to-gray-50 rounded-xl p-6 border border-slate-100">
										<h3 className="font-semibold text-slate-800 mb-4 text-lg">
											Key Features For You
										</h3>
										<ul className="space-y-3">
											{recommendation.features.map((feature, index) => (
												<li key={index} className="flex items-start">
													<Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
													<span className="text-slate-700">{feature}</span>
												</li>
											))}
										</ul>
									</div>
								</div>

								<div className="flex flex-col sm:flex-row gap-4 justify-center">
									<Button
										onClick={() => navigate('/register')}
										size="lg"
										className="h-12 px-8 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-sm shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 transition-all duration-300"
									>
										Get Started Now
										<ChevronRight className="ml-2 h-5 w-5" />
									</Button>

									<Button
										onClick={resetQuiz}
										variant="outline"
										size="lg"
										className="h-12 px-8 text-sm border-2 border-slate-200 hover:bg-slate-50 hover:border-slate-300"
									>
										Retake Quiz
									</Button>
								</div>
							</motion.div>

							<motion.div
								variants={itemVariants}
								className="text-center text-slate-500 text-sm"
							>
								Your answers help us provide a more personalized experience.
								<br />
								We don't store your quiz results unless you create an account.
							</motion.div>
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		</section>
	);
};

export default InteractiveQuiz;
