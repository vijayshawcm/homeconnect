import { useHomeStore } from "@/store/home";
import { useRoomStore } from "@/store/room";
import { useState } from "react";
import LightCard from "./components/LightCard";
import AirConCard from "./components/AirConCard";
import { Card } from "@/components/ui/card";
import { AddApplianceCard } from "./components/AddApplianceCard";
import FanCard from "./components/FanCard";
import { ArrowRight } from "lucide-react";

const RoomPage = () => {
  const { currentExpanded, setExpanded } = useState("");
  const { currentRoom } = useRoomStore();
  return (
    <div className="py-16 px-12 flex-1 flex gap-5">
      <div className="grid auto-cols-[1fr] auto-rows-[1fr] room-template-area gap-6 flex-1">
        <div className="roomLight flex">
          <LightCard />
        </div>
        <div className="roomAirConditioner flex">
          <AirConCard />
        </div>
        <div className="roomFan flex">
          <FanCard/>
        </div>
        <div className="roomAddAppliance flex">
          <AddApplianceCard/>
        </div>
      </div>
      <div className="border-2 border-[#184C85]"></div>
      <Card className="w-96 rounded-3xl p-8 font-semibold text-3xl flex flex-col relative">
        <span>Electricity</span>
        <span>for</span>
        <span>{`${currentRoom.name}`}</span>
        <ArrowRight className="size-12 absolute top-[50%] right-2"/>
      </Card>
    </div>
  );
};

export default RoomPage;
