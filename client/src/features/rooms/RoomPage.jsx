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

const RoomPage = () => {
  const { currentExpanded, setExpanded } = useState(null);
  const [hovered, setHovered] = useState(null);
  const { currentRoom } = useRoomStore();
  const applianceGrid = [
    {
      className: "roomLight",
      key: "light",
      component: <LightCard key={"light"} hovered={hovered === "light"} />,
    },
    {
      className: "roomAirConditioner",
      key: "aircon",
      component: <AirConCard key={"aircon"} hovered={hovered === "aircon"} />,
    },
    {
      className: "roomFan",
      key: "fan",
      component: <FanCard key={"fan"} hovered={hovered === "fan"} />,
    },
    {
      className: "roomAddAppliance",
      key: "add",
      component: <AddApplianceCard key={"add"} />,
    },
  ];
  return (
    <motion.div
      className="2xl:px-8 2xl:py-12 flex-1 flex gap-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      key={currentRoom.name}
    >
      {/* Dimming background effect */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            className="absolute inset-0 backdrop-blur-[2px] pointer-events-none w-full h-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          />
        )}
      </AnimatePresence>
      {currentExpanded ? null : (
        <div className="grid auto-cols-[1fr] auto-rows-[1fr] room-template-area gap-4 flex-1">
          {applianceGrid.map(({ className, key, component }) => (
            <motion.div
              key={className}
              className={`${className} flex rounded-3xl cursor-pointer`}
              layoutId="hoveredCard"
              initial={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
              animate={{
                scale: hovered === key ? 1.03 : 1,
                opacity: hovered && hovered !== key ? 0.4 : 1,
                boxShadow: "0px 0px 8px rgb(255,255,255)",
              }}
              transition={{ type: "spring", stiffness: 250, damping: 20 }}
              onHoverStart={() => setHovered(key)}
              onHoverEnd={() => setHovered(null)}
            >
              {component}
            </motion.div>
          ))}
        </div>
      )}
      <div className="border-2 border-[#184C85] rounded-lg"></div>
      <motion.div
        className="flex justify-center rounded-3xl w-[25%]"
        initial={{ scale: 1, opacity: 0, filter: "blur(0px)", x: 50 }}
        animate={{
          x: 0,
          scale: hovered === "electricity" ? 1.02 : 1,
          opacity: hovered && hovered !== "electricity" ? 0.4 : 1,
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
            className="absolute top-[50%] right-3"
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
