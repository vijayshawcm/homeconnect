import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useHomeStore } from "@/store/home";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

function generateChartData(homeRooms) {
  const chartConfig = {};
  const chartData = [];

  homeRooms.forEach((room, index) => {
    const roomKey = room.room.toLowerCase().replace(/\s+/g, "_"); // Convert room name to a valid key
    const colorVar = `--chart-${index + 1}`; // Dynamically generate color variable

    // Dynamically generate chartConfig
    chartConfig[roomKey] = {
      label: room.room,
      color: `hsl(var(${colorVar}))`,
    };

    // Dynamically generate chartData
    chartData.push({
      room: roomKey,
      Usage: room.currentEnergyUsage,
      fill: `var(--color-${roomKey})`,
    });
  });

  return { chartConfig, chartData };
}

const SummaryChart = () => {
  const { currentHome } = useHomeStore();
  const currentHomeData = currentHome.rooms.map((room) => {
    return {
      room: room.name,
      currentEnergyUsage: room.energyProfile.currentUsage,
    };
  });
  const { chartConfig, chartData } = generateChartData(currentHomeData);

  return (
    <ChartContainer config={chartConfig} className="flex-1">
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey={"room"}
          tickLine={false}
          tickMargin={10}
          axisLine={false}
        />

        <ChartTooltip
          content={<ChartTooltipContent hideLabel className="w-44" />}
        />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="Usage" fill="var(--color-light)" radius={3} />
      </BarChart>
    </ChartContainer>
  );
};

export default SummaryChart;
