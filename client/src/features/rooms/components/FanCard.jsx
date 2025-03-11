import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { useRoomStore } from "@/store/room";

const FanCard = () => {
  const { currentRoom } = useRoomStore();
  // Extract fans from the room's appliances list
  const fans =
    currentRoom?.appliances?.filter(
      (appliance) => appliance.applianceType === "Fan"
    ) || [];

  // Count total and active fans
  const totalFans = fans.length;
  const activeFans = fans.filter(
    (ac) => ac.status === "on"
  ).length;
  return (
    <Card className="flex-1 rounded-3xl flex flex-col">
      <div className="px-6 pt-6 flex flex-1">
        <div className="flex flex-1 justify-between relative">
          <h1 className="text-3xl font-semibold">Fan</h1>
          <Switch />
          <img
            src="src/assets/fan.svg"
            className="absolute top-0 right-20"
          ></img>
        </div>
      </div>
      <div className="px-6 pb-6 ">
        <Card className="w-36 rounded-3xl bg-[#C2E03A] flex justify-center items-center py-1">
          <div className="flex justify-evenly">
            <h1 className="text-2xl font-light w-[50%] flex justify-center items-center text-center">
              {activeFans}/{totalFans}
            </h1>
            <span className="flex-1 font-normal leading-5">Active Devices</span>
          </div>
        </Card>
      </div>
    </Card>
  );
};

export default FanCard;
