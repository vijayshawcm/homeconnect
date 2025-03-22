import { useHomeStore } from '@/store/home';
import HeaderAvatar from './HeaderAvatar';

const EnergyHeader = () => {
	const { currentHome } = useHomeStore();

	return (
		<div className="flex flex-1 items-center justify-between">
			<h1 className="text-xl lg:text-2xl xl:text-3xl font-bold">
				Energy Monitoring - {currentHome.name}
			</h1>
			<div className="flex">
				<HeaderAvatar />
			</div>
		</div>
	);
};

export default EnergyHeader;
