import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { useRoomStore } from "@/store/room";
import { motion } from "framer-motion";

const LightCard = ({ hovered }) => {
  const { currentRoom, turnOnAll, turnOffAll, updateRoom } = useRoomStore();
  // Extract fans from the room's appliances list
  const lights =
    currentRoom?.appliances?.filter(
      (appliance) => appliance.applianceType === "Light"
    ) || [];

  // Count total and active fans
  const totalLight = lights.length;
  const activeLight = lights.filter((ac) => ac.status === "on").length;

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
    <Card className="flex flex-1 flex-col rounded-3xl relative">
      <div className="flex justify-between items-center w-full px-6 pt-6">
        <h1 className="text-3xl font-semibold">Lights</h1>
        <div>
          <Switch checked={isAllLightsOn} onCheckedChange={toggleLights} />
        </div>
      </div>
      <div className="flex-1 relative">
        <img src="src/assets/light.svg" className="absolute right-0 z-10"></img>
        <motion.div
          className="absolute bg-[#fffb18] size-32 blur-2xl top-[55%] right-[4.6rem] -z-0"
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
              {activeLight}/{totalLight}
            </h1>
            <span className="flex-1 font-normal leading-5">Active Devices</span>
          </div>
        </Card>
      </div>
    </Card>
  );
};

export default LightCard;
