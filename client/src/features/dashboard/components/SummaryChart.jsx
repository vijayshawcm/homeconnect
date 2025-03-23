import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useHomeStore } from "@/store/home";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

const chartData = [
  { month: "Admin's ", light: 20, fan: 80, airConditioner: 200 },
  { month: "Admin's Bedroom", light: 50, fan: 129, airConditioner: 190 },
  { month: "March", light: 120, fan: 80, airConditioner: 90 },
  { month: "April", light: 290, fan: 80, airConditioner: 320 },
];

const chartConfig = {
  light: {
    label: "Lights",
    color: "#C2E03A",
  },
  fan: {
    label: "Fan",
    color: "#184C85",
  },
  airConditioner: {
    label: "Air Conditioner",
    color: "#0D1B2A",
  },
};

const SummaryChart = () => {
  const { currentHome } = useHomeStore();
  console.log(currentHome);
  return (
    <ChartContainer config={chartConfig} className="flex-1">
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey={"month"}
          tickLine={false}
          tickMargin={10}
          axisLine={false}
        />

        <div className="lg:block hidden">
          <YAxis tickLine={false} axisLine={false} />
        </div>
        <ChartTooltip
          content={<ChartTooltipContent hideLabel className="w-44" />}
        />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="light" fill="var(--color-light)" radius={3} />
        <Bar dataKey="fan" fill="var(--color-fan)" radius={3} />
        <Bar
          dataKey="airConditioner"
          fill="var(--color-airConditioner)"
          radius={3}
        />
      </BarChart>
    </ChartContainer>
  );
};

export default SummaryChart;
