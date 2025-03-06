import { useHomeStore } from "@/store/home";
import { useRoomStore } from "@/store/room";
import { useState } from "react";
import LightCard from "./components/LightCard";

const RoomPage = () => {
  const {currentExpanded, setExpanded} = useState("");
  const { currentRoom } = useRoomStore();
  return (
    <div className="p-6 grid auto-cols-auto auto-rows-[1fr] room-template-area gap-4 flex-1">
      <div className="roomLight bg-blue-500">
        <LightCard />
      </div>
      <div className="roomAirConditioner bg-blue-500"></div>
      <div className="roomFan bg-blue-500"></div>
      <div className="roomEnergy bg-blue-500"></div>
      <div className="roomAddAppliance bg-blue-500"></div>
    </div>
  );
};

export default RoomPage;
