import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import RoomCards from "./RoomCards";

// !TO BE REPLACED WITH BACKEND JUST EXAMPLE FOR NOW
const rooms = [
  { name: "Living Room", type: "living_room", percentage: "30%" },
  { name: "Bedroom", type: "bedroom", percentage: "20%" },
  { name: "Kitchen", type: "kitchen", percentage: "20%" },
  { name: "Garage", type: "", percentage: "10%" },
  { name: "Aiky's BedRoom", type: "bedroom", percentage: "20%" },
];

const DashboardCarousel = () => {
  return (
    <Carousel
      className="w-[95%] m-auto"
      opts={{
        align: "start",
      }}
    >
      <CarouselContent className="h-48 flex items-center">
        {rooms.map((room) => (
          <CarouselItem key={rooms.name} className="basis-1/4 px-6  ">
            <RoomCards room={room} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="-left-10" />
      <CarouselNext className="-right-10" />
    </Carousel>
  );
};

export default DashboardCarousel;
