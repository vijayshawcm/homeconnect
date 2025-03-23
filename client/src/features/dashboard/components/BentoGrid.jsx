import ProfileCard from './ProfileCard';
import SummaryCard from './SummaryCard';
import WeatherCard from './WeatherCard';
import SuggestionsCard from './SuggestionsCard';

const BentoGrid = () => {
	return (
		<div className="grid grid-cols-1 md:grid-cols-[2fr_1.2fr] gap-4">
			<div
				className="flex flex-col gap-4 md:grid"
				style={{ gridTemplateRows: '2fr 6fr' }}
			>
				<ProfileCard />
				<SummaryCard />
			</div>
			<div
				className="flex flex-col gap-4 md:grid md:grid-rows-2"
				style={{ gridTemplateRows: '4fr 5fr' }}
			>
				<WeatherCard />
				<SuggestionsCard />
			</div>
		</div>
	);
};

export default BentoGrid;
