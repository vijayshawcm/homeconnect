import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useHomeStore } from "@/store/home";
import { userAuthStore } from "@/store/userAuth";
import { Home, Lightbulb, DoorClosed, Zap } from "lucide-react";

function ProfileStats() {
  const { currentHome, homes } = useHomeStore();
  const { ownedHomes, dwelledHomes } = homes;
  const { user } = userAuthStore();
	console.log(homes)
  // Calc total homes
  const homeCount = ownedHomes.length + dwelledHomes.length;

  // Calculate total rooms
  const totalRooms = [...ownedHomes, ...dwelledHomes].reduce(
    (total, home) => total + (home.rooms ? home.rooms.length : 0),
    0
  );

  // Calculate total appliances
  const totalAppliances = [...ownedHomes, ...dwelledHomes].reduce(
    (total, home) => {
      if (home.rooms) {
        console.log(home.rooms);
        return (
          total +
          home.rooms.reduce(
            (roomTotal, room) =>
              roomTotal + (room.appliances ? room.appliances.length : 0),
            0
          )
        );
      }
      return total;
    },
    0
  );

  const stats = [
    {
      title: "Homes",
      value: homeCount,
      icon: Home,
      description: "Total homes joined/created",
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      title: "Rooms",
      value: totalRooms,
      icon: DoorClosed,
      description: "Total rooms connected",
      color: "text-teal-500",
      bgColor: "bg-teal-500/10",
    },
    {
      title: "Devices",
      value: totalAppliances,
      icon: Lightbulb,
      description: "Active smart devices",
      color: "text-amber-500",
      bgColor: "bg-amber-500/10",
    },
    {
      title: "Automations",
      value: 3,
      icon: Zap,
      description: "Running automations",
      color: "text-green-500",
      bgColor: "bg-green-500/10",
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <Card
          key={index}
          className="overflow-hidden border-border hover:shadow-md transition-shadow"
        >
          <CardHeader className="flex flex-row items-center justify-between pb-2 pt-4 px-4">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <div
              className={`w-8 h-8 aspect-square rounded-full flex items-center justify-center ${stat.bgColor}`}
            >
              <stat.icon className={`h-1/2 w-1/2 ${stat.color}`} />
            </div>
          </CardHeader>
          <CardContent className="px-4 pb-4 pt-0">
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground mt-2">
              {stat.description}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default ProfileStats;
