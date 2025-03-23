import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useHomeStore } from "@/store/home";
import { useRoomStore } from "@/store/room";

const RoomCards = () => {
  const { currentHome } = useHomeStore();
  const {currentRoom, setCurrentRoom} = useRoomStore()

  return (
    <Card className="flex-1 flex flex-col h-full bg-transparent border-none shadow-none p-0 overflow-hidden">
      <CardContent className="p-0 flex-1 flex flex-col justify-center items-center">
        <ScrollArea className="w-full h-full">
          <div className="flex w-max gap-4 shrink-0">
            {currentHome.rooms.map((room) => (
              <Card
                key={room._id}
                onClick={() => setCurrentRoom(room._id)}
                className={`w-60 cursor-pointer border-2 
									${
                    currentRoom._id === room._id ? "border-black" : ""
                  } p-2 transition-all bg-[#C2E03A] hover:border-primary hover:bg-[#A8C82A] lg:h-60 lg:w-40 rounded-3xl overflow-hidden flex flex-col`}
              >
                <CardHeader className="p-2 text-xl font-semibold">
                  {room.name}
                </CardHeader>
                <CardContent className="relative flex-1">
                  <img
                    src={`src/assets/${room.type}.svg`}
                    className="absolute h-full"
                  ></img>
                </CardContent>
              </Card>
            ))}
          </div>
          <ScrollBar orientation="horizontal" className="hidden" />
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default RoomCards;
