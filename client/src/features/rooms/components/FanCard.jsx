import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { useRoomStore } from "@/store/room";
import { motion } from "framer-motion";

const FanCard = ({ hovered }) => {
  const { currentRoom, updateRoom, turnOnAll, turnOffAll } = useRoomStore();
  // Extract fans from the room's appliances list
  const fans =
    currentRoom?.appliances?.filter(
      (appliance) => appliance.applianceType === "Fan"
    ) || [];

  // Count total and active fans
  const totalFans = fans.length;
  const activeFans = fans.filter((ac) => ac.status === "on").length;

  // Determine if all fan are ON
  const isAllFansOn = totalFans > 0 && activeFans === totalFans;

  // Handle Switch Toggle
  const toggleFans = async () => {
    try {
      // Update each fans in the backend
      if (!isAllFansOn) {
        await turnOnAll("Fan");
      } else {
        await turnOffAll("Fan");
      }
      // Update frontend state (refetch or update room store)
      updateRoom();
    } catch (error) {
      console.error("Failed to update Fans:", error);
    }
  };
  return (
    <Card className="flex-1 rounded-3xl flex flex-col relative overflow-hidden">
      <div className="sm:px-6 sm:pt-6 px-4 pt-2 flex flex-1">
        <div className="flex flex-1 justify-between relative">
          <h1 className="text-2xl xl:text-3xl font-semibold">Fan</h1>
          <div>
            <Switch checked={isAllFansOn} onCheckedChange={toggleFans} />
          </div>
          <img
            src="src/assets/fan.svg"
            className="absolute top-0 right-20 z-10 aspect-auto w-[20%] min-w-[100px] max-h-[300%] xl:w-[40%] xl:h-auto"
          ></img>
          <motion.div
            className="absolute bg-[rgb(151,151,151)] aspect-square w-[35%] md:w-[20%] right-[25%] top-[40%] xl:w-[30%] blur-2xl md:top-[5%] md:right-[15%] xl:top-[30%] xl:right-[20%] -z-0 rounded-3xl"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{
              opacity: activeFans >= 1 ? 1 : 0,
              scale: activeFans >= 1 ? 1.1 : 0.8,
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          ></motion.div>
        </div>
      </div>
      <div className="xl:px-6 xl:pb-6 px-3 py-3">
        <Card className="aspect-[3.5] w-[20%] sm:w-[35%] xl:w-[50%] max-w-36 rounded-3xl bg-[#C2E03A] flex justify-center items-center py-1">
          <div className="flex justify-evenly">
            <h1 className="text-2xl font-light w-[50%] flex justify-center items-center text-center">
              {activeFans}/{totalFans}
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

export default FanCard;
