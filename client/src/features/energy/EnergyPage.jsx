import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useHomeStore } from "../../store/home";
import TotalEnergyCard from "./components/TotalEnergyCard";
import WeeklyEnergyChart from "./components/WeeklyEnergyChart";
import RoomEnergyChart from "./components/RoomEnergyChart";
import RoomCards from "./components/RoomCards";

const EnergyPage = () => {
  const navigate = useNavigate();
  const { currentHome, homes, setCurrentHome } = useHomeStore();

  useEffect(() => {
    if (!currentHome && homes.length > 0) {
      setCurrentHome(homes[0]);
    } else if (homes.length === 0) {
      navigate("/welcome");
    }
  }, [currentHome, homes, navigate, setCurrentHome]);

  if (!currentHome) {
    return null;
  }

  return (
    <div className="flex flex-col flex-1">
      <div className="flex-1 grid energy-template-area auto-cols-[1fr] auto-rows-[1fr] gap-4 p-4">
        <div className="energyTotalCard flex">
					<TotalEnergyCard/>
				</div>
        <div className="energyRoomCard flex" >
					<RoomCards/>
				</div>
        <div className="energyWeeklyCard bg-sky-400" />
        <div className="roomEnergyCard bg-sky-400" />
      </div>
    </div>
  );
};

export default EnergyPage;
