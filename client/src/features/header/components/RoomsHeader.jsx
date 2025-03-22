import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useHomeStore } from "@/store/home";
import { useRoomStore } from "@/store/room";
import HeaderAvatar from "./HeaderAvatar";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const RoomsHeader = () => {
  const { currentHome } = useHomeStore();
  const { currentRoom, setCurrentRoom } = useRoomStore();
  const [carouselApi, setCarouselApi] = useState(null);

  useEffect(() => {
    if (carouselApi && currentRoom) {
      const roomIndex = currentHome.rooms.findIndex(
        (room) => room.name === currentRoom.name
      );
      if (roomIndex !== -1) {
        carouselApi.scrollTo(roomIndex); // Auto-scroll to selected room
      }
    }
  }, [carouselApi, currentRoom, currentHome.rooms]);

  return (
    <div className="flex items-center justify-between gap-4 flex-1">
      <Carousel
        className="flex-1 px-12"
        opts={{ align: "start", loop: false }}
        setApi={setCarouselApi}
      >
        <CarouselContent className="-ml-0">
          {currentHome.rooms.map((room) => {
            const formattedName = room.name.replace(/\s+/g, ""); // Remove spaces
            return (
              <CarouselItem
                key={room.name}
                className={`md:basis-1/2 lg:basis-1/4 transition-opacity flex justify-center items-center font-semibold pl-0 pr-6 ${
                  room.name === currentRoom.name
                    ? "opacity-100 font-semibold"
                    : "opacity-50"
                }`}
              >
                <Link
                  to={`/${formattedName}`}
                  className="text-xl flex justify-center items-center text-center text-balance flex-1"
                  onClick={() => setCurrentRoom(room)}
                >
                  {room.name}
                </Link>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious className = "absolute left-6"/>
        <CarouselNext className = "absolute right-6"/>
      </Carousel>
      <div className="flex gap-2">
        <HeaderAvatar />
      </div>
    </div>
  );
};

export default RoomsHeader;
