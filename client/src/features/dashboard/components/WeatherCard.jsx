import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import {
	CloudRain,
	Droplets,
	Thermometer,
	Wind,
	Sun,
	Cloud,
} from 'lucide-react';
import { useState } from 'react';

const WeatherCard = () => {
	const [weather] = useState({
		temp: 33,
		condition: 'Sunny',
		location: 'Kuala Lumpur',
		precipitation: '60%',
		humidity: '45%',
		wind: '5 km/h',
	});

	// Weather icon based on condition
	const getWeatherIcon = (condition) => {
		switch (condition.toLowerCase()) {
			case 'sunny':
				return (
					<div className="relative">
						<motion.div
							animate={{
								rotate: 360,
							}}
							transition={{
								duration: 20,
								repeat: Number.POSITIVE_INFINITY,
								ease: 'linear',
							}}
						>
							<Sun className="h-16 w-16 text-amber-400" />
						</motion.div>
						<motion.div
							className="absolute inset-0 bg-amber-300/20 rounded-full blur-xl"
							animate={{
								scale: [1, 1.2, 1],
								opacity: [0.5, 0.8, 0.5],
							}}
							transition={{
								duration: 3,
								repeat: Number.POSITIVE_INFINITY,
								ease: 'easeInOut',
							}}
							style={{ height: '100%', width: '100%' }}
						/>
					</div>
				);
			case 'cloudy':
				return <Cloud className="h-16 w-16 text-gray-400" />;
			case 'rainy':
				return <CloudRain className="h-16 w-16 text-blue-400" />;
			default:
				return <Sun className="h-16 w-16 text-amber-400" />;
		}
	};

	return (
		<Card className="border shadow-sm h-full overflow-hidden">
			<CardHeader className="pb-2 relative">
				<CardTitle className="flex items-center justify-between">
					<span>Weather Forecast</span>
					<span className="text-sm font-normal text-muted-foreground">
						Today
					</span>
				</CardTitle>
			</CardHeader>

			<CardContent className="px-6 pb-6 relative">
				<div className="flex flex-col sm:flex-row items-center justify-between gap-4">
					<div className="flex flex-col space-y-2">
						<h3 className="text-xl font-medium text-foreground">
							{weather.location}
						</h3>
						<div className="flex items-end gap-2">
							<span className="text-5xl font-bold tracking-tight">
								{weather.temp}°
							</span>
							<span className="text-muted-foreground text-lg mb-1">
								{weather.condition}
							</span>
						</div>

						<div className="flex items-center text-muted-foreground mt-1">
							<CloudRain className="mr-2 h-4 w-4" />
							<span className="text-sm">
								{weather.precipitation} precipitation chance
							</span>
						</div>
					</div>

					<motion.div
						className="sm:self-center flex items-center justify-center"
						animate={{ y: [0, -5, 0] }}
						transition={{
							duration: 3,
							repeat: Number.POSITIVE_INFINITY,
							ease: 'easeInOut',
						}}
					>
						{getWeatherIcon(weather.condition)}
					</motion.div>
				</div>

				<div className="mt-6 grid grid-cols-3 gap-3">
					{[
						{
							icon: Thermometer,
							label: 'Feels like',
							value: `${weather.temp - 2}°`,
							color: 'text-red-500',
							bgColor: 'bg-red-100 dark:bg-red-900/30',
						},
						{
							icon: Droplets,
							label: 'Humidity',
							value: weather.humidity,
							color: 'text-blue-500',
							bgColor: 'bg-blue-100 dark:bg-blue-900/30',
						},
						{
							icon: Wind,
							label: 'Wind',
							value: weather.wind,
							color: 'text-emerald-500',
							bgColor: 'bg-emerald-100 dark:bg-emerald-900/30',
						},
					].map((item) => (
						<div
							key={item.label}
							className={`flex flex-col items-center rounded-lg ${item.bgColor} p-3 transition-all hover:scale-105`}
						>
							<item.icon className={`h-5 w-5 ${item.color} mb-1`} />
							<span className="text-xs text-muted-foreground">
								{item.label}
							</span>
							<span className="text-sm font-medium">{item.value}</span>
						</div>
					))}
				</div>

				<div className="mt-5 pt-4 border-t">
					<div className="flex justify-between">
						{['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((day, i) => {
							const temps = [32, 34, 31, 33, 32];
							const icons = [Sun, Sun, Cloud, Sun, CloudRain];
							const Icon = icons[i];

							return (
								<div key={day} className="flex flex-col items-center">
									<span className="text-xs text-muted-foreground">{day}</span>
									<Icon className="h-4 w-4 my-1 text-muted-foreground" />
									<span className="text-xs font-medium">{temps[i]}°</span>
								</div>
							);
						})}
					</div>
				</div>
			</CardContent>
		</Card>
	);
};

export default WeatherCard;
