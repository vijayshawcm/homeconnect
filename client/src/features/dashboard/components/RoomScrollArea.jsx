import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import RoomCards from "./RoomCards";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

const RoomScrollArea = ({rooms}) => {
  return (
    <ScrollArea className="w-full whitespace-nowrap">
      <div className="w-max flex gap-8 py-4 shrink-0 pl-4">
        {rooms.map((room) => (
          <RoomCards key={room.name} room={room} />
        ))}
      </div>
      <ScrollBar orientation="horizontal"/>
    </ScrollArea>
  );
};

export default RoomScrollArea;
