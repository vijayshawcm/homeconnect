import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { BsFillLightningChargeFill } from "react-icons/bs";
import { useRoomStore } from "@/store/room";

const RoomCards = ({ room }) => {
  const { setCurrentRoom } = useRoomStore();
  const formattedName = room.name.replace(/\s+/g, ""); // Remove spaces
  return (
    <Link to={`/${formattedName}`} onClick={() => setCurrentRoom(room)}>
      <Card className="bg-[#C2E03A] lg:w-80 lg:h-40 w-60 rounded-3xl shadow-md relative transition-all duration-300 ease-in-out hover:scale-[1.03] active:scale-95 select-none touch-none hover:shadow-xl border-0 hover:border hover:border-black">
        <CardHeader className=" text-xl font-semibold">
          {" "}
          {room.name}{" "}
        </CardHeader>
        <CardContent className="text-4xl font-medium">
          {room.type === "" ? null : (
            <img
              src={`src/assets/${room.type}.svg`}
              className="absolute object-fit top-0 right-[5%] select-none"
            />
          )}
          <div className="flex items-center">
            <BsFillLightningChargeFill />
            20%
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default RoomCards;
