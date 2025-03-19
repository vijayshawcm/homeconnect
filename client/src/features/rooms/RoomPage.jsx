import { useHomeStore } from "@/store/home";
import { useRoomStore } from "@/store/room";
import { useState } from "react";
import LightCard from "./components/LightCard";
import AirConCard from "./components/AirConCard";
import { Card } from "@/components/ui/card";
import { AddApplianceCard } from "./components/AddApplianceCard";
import FanCard from "./components/FanCard";
import { ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useSidebar } from "@/components/ui/sidebar";
import ExpandedView from "./components/ExpandedView";

const RoomPage = () => {
  const [currentExpanded, setExpanded] = useState(null);
  const [hovered, setHovered] = useState(null);
  const { currentRoom } = useRoomStore();
  const { isMobile } = useSidebar();

  // Function to get total and active appliances of a given type
  const getApplianceStats = (type) => {
    const appliances =
      currentRoom?.appliances?.filter(
        (appliance) => appliance.applianceType === type
      ) || [];
    return {
      total: appliances.length,
      active: appliances.filter((appliance) => appliance.status === "on")
        .length,
    };
  };

  const lightStats = getApplianceStats("Light");
  const fansStats = getApplianceStats("Fan");
  const airConStats = getApplianceStats("AirConditioner");

  const applianceGrid = [
    {
      className: "roomLight",
      key: "Light",
      component: (
        <LightCard
          key={"light"}
          hovered={hovered === "light"}
          totalLight={lightStats.total}
          activeLight={lightStats.active}
        />
      ),
    },
    {
      className: "roomAirConditioner",
      key: "AirConditioner",
      component: (
        <AirConCard
          key={"aircon"}
          hovered={hovered === "aircon"}
          totalAirCons={airConStats.total}
          activeAirCons={airConStats.active}
        />
      ),
    },
    {
      className: "roomFan",
      key: "Fan",
      component: (
        <FanCard
          key={"fan"}
          hovered={hovered === "fan"}
          totalFans={fansStats.total}
          activeFans={fansStats.active}
        />
      ),
    },
    {
      className: "roomAddAppliance",
      key: "add",
      component: <AddApplianceCard key={"add"} />,
    },
  ];
  return (
    <motion.div
      className="xl:p-8 flex-1 flex xl:gap-4 gap-2 p-4 flex-col xl:flex-row"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      key={currentRoom.name}
    >
      <motion.div
        className="flex-1 flex justify-center items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
        key={currentExpanded}
      >
        {currentExpanded ? (
          <ExpandedView
            appliance={currentExpanded}
            onClose={() => setExpanded(null)}
          ></ExpandedView>
        ) : (
          <div className="grid auto-cols-[1fr] auto-rows-[1fr] room-template-area gap-4 flex-1 h-full">
            {applianceGrid.map(({ className, key, component }) => (
              <motion.div
                key={className}
                className={`${className} flex rounded-3xl cursor-pointer`}
                layoutId="hoveredCard"
                initial={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
                animate={{
                  scale: hovered === key ? 1.03 : 1,
                  opacity: hovered && hovered !== key ? 0.4 : 1,
                  filter:
                    hovered && hovered !== key ? "blur(1px)" : "blur(0px)",
                  boxShadow: "0px 0px 8px rgb(255,255,255)",
                }}
                transition={{ type: "spring", stiffness: 250, damping: 20 }}
                onHoverStart={() => setHovered(key)}
                onHoverEnd={() => setHovered(null)}
                onClick={(e) => {
                  if (e.target.closest(".switch-container")) return; // Prevent expansion if clicking switch
                  setHovered(null);
                  setExpanded(key);
                }}
              >
                {component}
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>

      <div className="border-2 border-[#184C85] rounded-lg"></div>
      <motion.div
        className="flex justify-center rounded-3xl xl:w-[25%] w-full"
        initial={{ scale: 1, opacity: 0, filter: "blur(0px)", x: 50 }}
        animate={{
          x: 0,
          scale: hovered === "electricity" ? 1.02 : 1,
          opacity: hovered && hovered !== "electricity" ? 1 : 1,
          boxShadow: "0px 0px 8px rgb(255,255,255)",
        }}
        transition={{ type: "spring", stiffness: 250, damping: 20 }}
        onHoverStart={() => setHovered("electricity")}
        onHoverEnd={() => setHovered(null)}
      >
        <Card className="w-full rounded-3xl p-8 font-semibold text-2xl flex flex-col relative bg-gradient-to-r from-white from-90% to-[rgb(217,217,217,66)] cursor-pointer">
          <span>Energy Profile</span>
          <span>for</span>
          <span>{`${currentRoom.name}`}</span>
          {/* Animated Arrow */}
          <motion.div
            className="absolute xl:top-[50%] xl:right-3 top-[40%] right-0"
            animate={{ x: hovered === "electricity" ? [0, 15, 0] : 0 }} // Subtle left-right motion
            transition={
              hovered === "electricity"
                ? { repeat: Infinity, duration: 0.8, ease: "easeInOut" }
                : {}
            }
          >
            <ArrowRight className="size-12" />
          </motion.div>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default RoomPage;
