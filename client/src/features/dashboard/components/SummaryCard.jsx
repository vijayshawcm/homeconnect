import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import SummaryChart from './SummaryChart';

const SummaryCard = () => {
	return (
		<Card className="w-full">
			<CardHeader className="pb-3">
				<CardTitle>Energy Usage</CardTitle>
			</CardHeader>
			<CardContent className="p-4">
				<SummaryChart />
			</CardContent>
		</Card>
	);
};

export default SummaryCard;
