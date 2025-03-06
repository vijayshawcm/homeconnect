import ProfileCard from "./ProfileCard";
import SummaryCard from "./SummaryCard";
import WeatherCard from "./WeatherCard";

const BentoGrid = () => {
  return (
    <div className="grid auto-cols-auto lg:auto-cols-[24%] auto-rows-[1fr] gap-5 grid-template-area px-4 lg:p-4 ">
      <div className="bentoProfile">
        <ProfileCard />
      </div>
      <div className="bentoWeather">
        <WeatherCard />
      </div>
      <div className="bentoSummary">
        <SummaryCard/>
      </div>
      <div className="bg-blue-800 bentoSuggestion"></div>
    </div>
  );
};

export default BentoGrid;
