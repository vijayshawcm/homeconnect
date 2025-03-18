import ProfileCard from "./ProfileCard";
import SummaryCard from "./SummaryCard";
import WeatherCard from "./WeatherCard";

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
        <SummaryCard/>
      </div>
      <div className="bg-blue-800 bentoSuggestion flex"></div>
    </div>
  );
};

export default BentoGrid;
