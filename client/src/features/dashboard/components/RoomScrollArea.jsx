import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import RoomCards from "./RoomCards";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useSidebar } from "@/components/ui/sidebar";
import clsx from "clsx";

const RoomScrollArea = ({ rooms }) => {
  const { open, isMobile } = useSidebar();
  // Adjust gap based on sidebar state and screen size
  const gapClass = clsx({
    "gap-4": isMobile, // Smaller gap for mobile
    "gap-10": !isMobile && open, // Medium gap when sidebar is open
    "gap-14": !isMobile && !open, // Default gap when sidebar is closed
  });

  return (
    <ScrollArea className="w-full whitespace-nowrap">
      <div
        className={`w-max flex ${gapClass} py-4 shrink-0 pl-4 transition-all duration-500`}
      >
        {rooms.map((room) => (
          <RoomCards key={room.name} room={room} />
        ))}
      </div>
      <ScrollBar orientation="horizontal" className="px-5" />
    </ScrollArea>
  );
};

export default RoomScrollArea;
