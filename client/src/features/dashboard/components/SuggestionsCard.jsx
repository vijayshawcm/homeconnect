import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
	Lightbulb,
	Zap,
	Thermometer,
	Clock,
	DollarSign,
	RefreshCw,
	ChevronRight,
	Check,
} from 'lucide-react';

// mock data
const mockSuggestions = [
	{
		id: 1,
		title: 'Lower your living room temperature',
		description: 'Reducing by 2°C could save 15% on heating costs',
		icon: <Thermometer className="h-5 w-5" />,
		category: 'energy',
		impact: 'high',
	},
	{
		id: 2,
		title: 'Turn off kitchen lights',
		description: 'Lights have been on for 3 hours with no activity',
		icon: <Lightbulb className="h-5 w-5" />,
		category: 'lighting',
		impact: 'medium',
	},
	{
		id: 3,
		title: 'Schedule router restart',
		description: 'Weekly restarts can improve network performance',
		icon: <RefreshCw className="h-5 w-5" />,
		category: 'maintenance',
		impact: 'low',
	},
	{
		id: 4,
		title: 'Optimize refrigerator settings',
		description: 'Current temperature is lower than recommended',
		icon: <Zap className="h-5 w-5" />,
		category: 'energy',
		impact: 'medium',
	},
	{
		id: 5,
		title: 'Create bedtime routine',
		description: 'Automatically adjust lights and temperature at night',
		icon: <Clock className="h-5 w-5" />,
		category: 'automation',
		impact: 'high',
	},
];

const categoryColors = {
	energy:
		'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300',
	lighting:
		'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
	maintenance: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
	automation:
		'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
};

const impactColors = {
	high: 'text-red-500',
	medium: 'text-amber-500',
	low: 'text-green-500',
};

const SuggestionsCard = () => {
	const [implementedSuggestions, setImplementedSuggestions] = useState([]);

	const handleImplement = (id) => {
		setImplementedSuggestions([...implementedSuggestions, id]);
	};

	return (
		<Card className="shadow-sm w-full">
			<CardHeader className="pb-3">
				<div className="flex justify-between items-center">
					<CardTitle className="text-xl font-semibold">
						Smart Suggestions
					</CardTitle>
				</div>
			</CardHeader>
			<CardContent>
				<div className="space-y-4">
					{mockSuggestions.slice(0, 3).map((suggestion) => (
						<div
							key={suggestion.id}
							className={`flex items-start p-3 rounded-lg transition-colors ${
								implementedSuggestions.includes(suggestion.id)
									? 'bg-muted/30 opacity-70'
									: 'bg-muted/20 hover:bg-muted/30'
							}`}
						>
							<div
								className={`p-2 rounded-full mr-3 ${
									categoryColors[suggestion.category].split(' ')[0]
								}`}
							>
								{suggestion.icon}
							</div>
							<div className="flex-1">
								<div className="flex items-center justify-between mb-1">
									<h3 className="font-medium">
										{suggestion.title}
										{implementedSuggestions.includes(suggestion.id) && (
											<span className="ml-2 text-green-500 inline-flex items-center text-sm">
												<Check className="h-3 w-3 mr-1" /> Implemented
											</span>
										)}
									</h3>
									<Badge
										variant="outline"
										className={`text-xs ${categoryColors[suggestion.category]}`}
									>
										{suggestion.category}
									</Badge>
								</div>
								<p className="text-sm text-muted-foreground">
									{suggestion.description}
								</p>
								<div className="flex justify-between items-center mt-2">
									<div className="flex items-center">
										<DollarSign
											className={`h-4 w-4 mr-1 ${
												impactColors[suggestion.impact]
											}`}
										/>
										<span className="text-xs text-muted-foreground">
											{suggestion.impact.charAt(0).toUpperCase() +
												suggestion.impact.slice(1)}{' '}
											impact
										</span>
									</div>
									{!implementedSuggestions.includes(suggestion.id) && (
										<Button
											variant="outline"
											size="sm"
											className="text-xs h-7"
											onClick={() => handleImplement(suggestion.id)}
										>
											Implement
										</Button>
									)}
								</div>
							</div>
						</div>
					))}
				</div>

				<div className="mt-4 pt-3 border-t flex justify-between items-center">
					<div className="text-sm text-muted-foreground">
						• Updated 10 minutes ago
					</div>
					<Button variant="ghost" size="sm" className="h-8 gap-1">
						<RefreshCw className="h-3.5 w-3.5" />
						<span className="text-xs">Refresh</span>
					</Button>
				</div>
			</CardContent>
		</Card>
	);
};

export default SuggestionsCard;
