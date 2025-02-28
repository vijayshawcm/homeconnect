import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { BsFillLightningChargeFill } from "react-icons/bs";

const RoomCards = ({ room }) => {
  return (
    <Link className="">
      <Card
        className="bg-[#C2E03A] lg:w-80 lg:h-40 w-60 rounded-3xl relative transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95 select-none touch-none"
      >
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
