import ProfileCard from './ProfileCard';
import SummaryCard from './SummaryCard';
import WeatherCard from './WeatherCard';
import SuggestionsCard from './SuggestionsCard';

const BentoGrid = () => {
	return (
		<div className="grid auto-cols-auto lg:auto-cols-[1fr] auto-rows-[1fr] gap-8 grid-template-area p-4 ">
			<div className="bentoProfile flex">
				<ProfileCard />
			</div>
			<div className="bentoWeather flex">
				<WeatherCard />
			</div>
			<div className="bentoSummary flex">
				<SummaryCard />
			</div>
			<div className="bentoSuggestion flex">
				<SuggestionsCard />
			</div>
		</div>
	);
};

export default BentoGrid;
