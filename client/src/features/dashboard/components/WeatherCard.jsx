import { Card } from "@/components/ui/card";
import SunnyImage from "../../../assets/sunny.svg";
import { motion } from "framer-motion";

const WeatherCard = () => {
  return (
    <Card className="bg-white rounded-3xl p-4">
      <div className="font-semibold text-2xl">Weather Forecast</div>
      <div className="flex justify-between items-center">
        <motion.div>
          <motion.img
            animate={{ y: [0, -8, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeOut",
            }}
            src={SunnyImage}
            alt="SunnyImage"
            className="aspect-square size-64"
          />
        </motion.div>
        <div className="flex-1 flex justify-start items-center ml-10">
          <div className="flex flex-col gap-4 items-start min-h-52">
            <div className="font-semibold text-4xl">
              {/* To be replaced with weather API */}
              Kuala Lumpur
            </div>
            <div className="font-bold text-5xl">33°C</div>
            <div>
              <div className="font-medium">60% chance of precipitation </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default WeatherCard;
