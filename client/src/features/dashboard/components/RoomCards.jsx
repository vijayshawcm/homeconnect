import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { BsFillLightningChargeFill } from "react-icons/bs";
import { useRoomStore } from "@/store/room";
import { useHomeStore } from "@/store/home";

const RoomCards = ({ room }) => {
  const { currentHome } = useHomeStore();
  const { setCurrentRoom } = useRoomStore();
  const formattedName = room.name.replace(/\s+/g, ""); // Remove spaces
  const totalEnergy = currentHome.energyProfile.currentUsage;
  const roomEnergy = room.energyProfile.currentUsage;
  const energyPercentage =
    totalEnergy > 0 ? ((roomEnergy / totalEnergy) * 100).toFixed(0) : 0;

  return (
    <Card
      className="bg-[#C2E03A] lg:w-72 lg:h-40 w-60 rounded-3xl shadow-md relative transition-all duration-300 ease-in-out hover:scale-[1.03] active:scale-95 select-none touch-none hover:shadow-xl border-0 hover:border hover:border-black overflow-hidden"
      key={`${room._id}`}
    >
      <Link to={`/${formattedName}`} onClick={() => setCurrentRoom(room)}>
        <CardHeader className=" text-xl font-semibold">{room.name}</CardHeader>
        <CardContent className="text-4xl font-medium">
          {room.type === "" ? null : (
            <img
              src={`src/assets/${room.type}.svg`}
              className="absolute object-fit top-0 right-[5%] select-none"
            />
          )}
          <div className="flex items-center">
            <BsFillLightningChargeFill />
            {energyPercentage + "%"}
          </div>
        </CardContent>
      </Link>
    </Card>
  );
};

export default RoomCards;
