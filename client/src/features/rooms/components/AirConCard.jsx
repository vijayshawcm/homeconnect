import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { useRoomStore } from "@/store/room";
import { userAuthStore } from "@/store/userAuth";
import { motion } from "framer-motion";

const AirConCard = ({ hovered, totalAirCons, activeAirCons }) => {
  const { currentRoom, updateRoom, turnOnAll, turnOffAll } = useRoomStore();
  const { user } = userAuthStore();

  // Determine if all airCons are ON
  const isAllAirConOn = totalAirCons > 0 && activeAirCons === totalAirCons;

  // Handle Switch Toggle
  const toggleAirCons = async () => {
    try {
      // Update each airCon in the backend
      if (!isAllAirConOn) {
        await turnOnAll({ requester: user.username, type: "AirConditioner" });
      } else {
        await turnOffAll({ requester: user.username, type: "AirConditioner" });
      }
      // Update frontend state (refetch or update room store)
      updateRoom();
    } catch (error) {
      console.error("Failed to update AirCons:", error);
    }
  };
  return (
    <Card className="flex flex-1 flex-col rounded-3xl relative overflow-hidden">
      <div className="flex justify-between items-center w-full sm:px-6 sm:pt-6 px-4 pt-2">
        <h1 className="sm:text-2xl text-xl font-semibold">Air Conditioners</h1>
        <div className="switch-container">
          <Switch checked={isAllAirConOn} onCheckedChange={toggleAirCons} />
        </div>
      </div>
      <div className="flex-1 relative">
        <img
          src="src/assets/aircon.svg"
          className="absolute right-24 top-2 z-10 aspect-auto w-[20%] min-w-[100px] max-h-[300%] xl:w-[50%] xl:h-auto"
        ></img>
        <motion.div
          className="absolute bg-[rgb(191,230,255)] size-[60%] xl:size-[60%] blur-2xl top-[90%] right-[6%] xl:top-[70%] xl:right-[6%] -z-0 rounded-3xl"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{
            opacity: activeAirCons >= 1 ? 1 : 0,
            scale: activeAirCons >= 1 ? 1.1 : 0.8,
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        ></motion.div>
      </div>
      <div className="xl:px-6 xl:pb-6 px-3 py-3">
        <Card className="aspect-[3.5] w-[20%] sm:w-[35%] xl:w-[50%] max-w-36 rounded-3xl bg-[#C2E03A] flex justify-center items-center py-1">
          <div className="flex justify-evenly">
            <h1 className="text-2xl font-light w-[50%] flex justify-center items-center text-center">
              {activeAirCons}/{totalAirCons}
            </h1>
            <span className="flex-1 font-normal leading-5 hidden sm:block">
              Active Devices
            </span>
          </div>
        </Card>
      </div>
    </Card>
  );
};

export default AirConCard;
