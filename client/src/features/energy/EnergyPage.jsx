import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useHomeStore } from '../../store/home';
import TotalEnergyCard from './components/TotalEnergyCard';
import WeeklyEnergyChart from './components/WeeklyEnergyChart';
import RoomEnergyChart from './components/RoomEnergyChart';
import RoomCards from './components/RoomCards';

const EnergyPage = () => {
	const navigate = useNavigate();
	const { currentHome, homes, setCurrentHome } = useHomeStore();

	useEffect(() => {
		if (!currentHome && homes.length > 0) {
			setCurrentHome(homes[0]);
		} else if (homes.length === 0) {
			navigate('/welcome');
		}
	}, [currentHome, homes, navigate, setCurrentHome]);

	if (!currentHome) {
		return null;
	}

	return (
		<div className="flex flex-col w-full h-full">
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
				<TotalEnergyCard />
				<RoomCards />
				<WeeklyEnergyChart />
				<RoomEnergyChart />
			</div>
		</div>
	);
};

export default EnergyPage;
