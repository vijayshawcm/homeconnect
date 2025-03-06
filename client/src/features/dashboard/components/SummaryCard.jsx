import { Card } from "@/components/ui/card";
import SummaryChart from "./SummaryChart";

const SummaryCard = () => {
  return (
    <Card className="bg-white rounded-3xl flex flex-col justify-end gap-8 p-4 h-full">
      <h1 className="font-semibold text-2xl">Summary</h1>
      <SummaryChart />
    </Card>
  );
};

export default SummaryCard;
