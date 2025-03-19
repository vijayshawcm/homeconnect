import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { useRoomStore } from "@/store/room";
import { motion } from "framer-motion";

const LightCard = ({ hovered, totalLight, activeLight }) => {
  const { currentRoom, turnOnAll, turnOffAll, updateRoom } = useRoomStore();

  // Determine if all lights are ON
  const isAllLightsOn = totalLight > 0 && activeLight === totalLight;

  // Handle Switch Toggle
  const toggleLights = async () => {
    try {
      // Update each light in the backend
      if (!isAllLightsOn) {
        await turnOnAll("Light");
      } else {
        await turnOffAll("Light");
      }
      // Update frontend state (refetch or update room store)
      updateRoom();
    } catch (error) {
      console.error("Failed to update lights:", error);
    }
  };
  return (
    <Card className="flex flex-1 flex-col rounded-3xl relative overflow-hidden">
      <div className="flex justify-between items-center w-full sm:px-6 sm:pt-6 px-4 pt-2">
        <h1 className="sm:text-2xl text-xl font-semibold">Lights</h1>
        <div className="switch-container">
          <Switch checked={isAllLightsOn} onCheckedChange={toggleLights} />
        </div>
      </div>
      <div className="flex-1 xl:relative">
        <img
          src="src/assets/light.svg"
          className="absolute top-0 right-[20%] xl:right-0 z-10 aspect-auto w-[10%] md:w-[15%] min-w-[70px] max-h-[250%] xl:w-[60%] xl:h-auto"
        ></img>
        <motion.div
          className="absolute bg-[#fffb18] size-[30%] blur-2xl xl:top-[60%] xl:right-[15%] right-[15%] top-[70%] -z-0"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{
            opacity: activeLight >= 1 ? 1 : 0,
            scale: activeLight >= 1 ? 1.1 : 0.8,
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        ></motion.div>
      </div>
      <div className="xl:px-6 xl:pb-6 px-2 py-2">
        <Card className="aspect-[3.5] w-[20%] sm:w-[35%] xl:w-[50%] max-w-36 rounded-3xl bg-[#C2E03A] flex justify-center items-center py-1">
          <div className="flex justify-evenly">
            <h1 className="sm:text-2xl text-xl font-light w-[50%] flex justify-center items-center text-center">
              {activeLight}/{totalLight}
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

export default LightCard;
