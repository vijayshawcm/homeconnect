import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { useRoomStore } from "@/store/room";

const AirConCard = () => {
  const { currentRoom } = useRoomStore();
  // Extract air conditioners from the room's appliances list
  const airConditioners =
    currentRoom?.appliances?.filter(
      (appliance) => appliance.applianceType === "AirConditioner"
    ) || [];

  // Count total and active air conditioners
  const totalAirCons = airConditioners.length;
  const activeAirCons = airConditioners.filter((ac) => ac.status === "on").length;

  return (
    <Card className="flex flex-1 flex-col rounded-3xl">
      <div className="flex justify-between items-center w-full px-6 pt-6">
        <h1 className="text-3xl font-semibold">Air Conditioner</h1>
        <Switch />
      </div>
      <div className="flex-1 relative">
        <img
          src="src/assets/aircon.svg"
          className="absolute right-24 top-2"
        ></img>
      </div>
      <div className="px-6 pb-6 ">
        <Card className="w-36 rounded-3xl bg-[#C2E03A] flex justify-center items-center py-1">
          <div className="flex justify-evenly">
            <h1 className="text-2xl font-light w-[50%] flex justify-center items-center text-center">
              {activeAirCons}/{totalAirCons}
            </h1>
            <span className="flex-1 font-normal leading-5">Active Devices</span>
          </div>
        </Card>
      </div>
    </Card>
  );
};

export default AirConCard;
