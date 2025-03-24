import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useHomeStore } from "@/store/home";
import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const RoomEnergyChart = () => {
  const { currentHome, getRoomsCurrentUsage } = useHomeStore();
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchUsage = async () => {
      try {
        const d = await getRoomsCurrentUsage();
        setChartData(d);
      } catch (error) {
        console.error("Failed to fetch usage data:", error);
        return []; // Return an empty array if there's an error
      }
    };
    fetchUsage();
  }, [getRoomsCurrentUsage, currentHome]);
	console.log(chartData)
  const data = [
    {
      name: "Garage",
      lights: 5,
      water: 3,
      airConditioner: 2,
    },
    {
      name: "Kitchen",
      lights: 14,
      water: 12,
      airConditioner: 8,
    },
    {
      name: "Bedroom",
      lights: 18,
      water: 14,
      airConditioner: 10,
    },
    {
      name: "Living Room",
      lights: 20,
      water: 5,
      airConditioner: 10,
    },
  ];

  return (
    <Card className="flex-1 flex flex-col">
      <CardHeader className="p-3 pl-5">
        <CardTitle className="text-xl">Energy Usage - Room(kwH)</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col">
        <div className="flex-1 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{
                top: 5,
                right: 30,
                left: 0,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="room" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="Light" fill="#c1e82b" />
              <Bar dataKey="Fan" fill="#1e40af" />
              <Bar dataKey="AirConditioner" fill="#333333" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default RoomEnergyChart;
