import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { useRoomStore } from "@/store/room";
import { motion } from "framer-motion";

const AirConCard = ({ hovered }) => {
  const { currentRoom, updateRoom, turnOnAll, turnOffAll } = useRoomStore();
  // Extract air conditioners from the room's appliances list
  const airConditioners =
    currentRoom?.appliances?.filter(
      (appliance) => appliance.applianceType === "AirConditioner"
    ) || [];

  // Count total and active air conditioners
  const totalAirCons = airConditioners.length;
  const activeAirCons = airConditioners.filter(
    (ac) => ac.status === "on"
  ).length;

  // Determine if all airCons are ON
  const isAllAirConOn = totalAirCons > 0 && activeAirCons === totalAirCons;

  // Handle Switch Toggle
  const toggleAirCons = async () => {
    try {
      // Update each airCon in the backend
      if (!isAllAirConOn) {
        await turnOnAll("AirConditioner");
      } else {
        await turnOffAll("AirConditioner");
      }
      // Update frontend state (refetch or update room store)
      updateRoom();
    } catch (error) {
      console.error("Failed to update AirCons:", error);
    }
  };
  return (
    <Card className="flex flex-1 flex-col rounded-3xl relative">
      <div className="flex justify-between items-center w-full px-6 pt-6">
        <h1 className="text-3xl font-semibold">Air Conditioner</h1>
        <div>
          <Switch checked={isAllAirConOn} onCheckedChange={toggleAirCons} />
        </div>
      </div>
      <div className="flex-1 relative">
        <img
          src="src/assets/aircon.svg"
          className="absolute right-24 top-2 z-10"
        ></img>
        <motion.div
          className="absolute bg-[rgb(191,230,255)] size-56 blur-2xl top-[25%] right-[9rem] -z-0 rounded-3xl"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{
            opacity: hovered ? 1 : 0,
            scale: hovered ? 1.1 : 0.8,
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        ></motion.div>
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
