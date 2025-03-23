import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useHomeStore } from "@/store/home";
import { Label, Pie, PieChart } from "recharts";

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
      value: room.currentEnergyUsage,
      fill: `var(--color-${roomKey})`,
    });
  });

  return { chartConfig, chartData };
}

const TotalEnergyCard = () => {
  const { currentHome, updateHome } = useHomeStore();

  const currentHomeData = currentHome.rooms.map((room) => {
    return {
      room: room.name,
      currentEnergyUsage: room.energyProfile.currentUsage,
    };
  });
  const { chartConfig, chartData } = generateChartData(currentHomeData);
  console.log(currentHome);
  return (
    <Card className="flex-1 flex flex-col rounded-3xl">
      <CardHeader className="p-3 pl-5">
        <CardTitle className="text-xl">Current Energy Usage</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col p-0">
        <ChartContainer config={chartConfig} className="flex-1">
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="room"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {currentHome.energyProfile.currentUsage}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          KWh
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default TotalEnergyCard;
