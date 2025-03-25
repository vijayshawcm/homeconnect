import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const WeeklyEnergyChart = () => {
  const data = [
    { name: "Sun", Master_bedroom: 300, Main_area: 202 },
    { name: "Mon", Master_bedroom: 260, Main_area: 160 },
    { name: "Tue", Master_bedroom: 272, Main_area: 125 },
    { name: "Wed", Master_bedroom: 282, Main_area: 152 },
    { name: "Thu", Master_bedroom: 205, Main_area: 146 },
    { name: "Fri", Master_bedroom: 252, Main_area: 180 },
    { name: "Sat", Master_bedroom: 320, Main_area: 202 },
  ];

  return (
    <Card className="flex-1">
      <CardHeader className="pb-2">
        <CardTitle>Energy Usage - Week (KWh)</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[200px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 0,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="Master_bedroom"
                stroke="#c1e82b"
                activeDot={{ r: 8 }}
              />
              <Line type="monotone" dataKey="Main_area" stroke="#1e40af" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default WeeklyEnergyChart;
