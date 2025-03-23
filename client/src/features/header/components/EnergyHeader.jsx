import { useHomeStore } from '@/store/home';
import HeaderAvatar from './HeaderAvatar';
import { Sparkle, Zap } from 'lucide-react';

const EnergyHeader = () => {
	const { currentHome } = useHomeStore();

	return (
    <div className="flex flex-1 items-center justify-between">
      <div className="flex items-center gap-3">
        <Zap className="h-1/2 w-1/2 text-primary" />
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Energy</h1>
        </div>
      </div>
      <HeaderAvatar />
    </div>
  );
};

export default EnergyHeader;
