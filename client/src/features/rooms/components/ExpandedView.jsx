import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Slider } from "@/components/ui/slider";
import { useRoomStore } from "@/store/room";
import { motion } from "framer-motion";
import { ChevronLeft, Power, PowerOff, Sun, SunDim, Timer } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import Thermostat from "./Thermostat";
import { TbAirConditioning } from "react-icons/tb";

const ExpandedView = ({ appliance, onClose }) => {
  const { currentRoom, turnOnAppliance, turnOffAppliance, modifyAppliance } =
    useRoomStore();
  const [lightCarouselApi, setLightCarouselApi] = useState(null);
  const [airConCarouselApi, setAirConCarouselApi] = useState(null);

  const getApplianceStats = useCallback(
    (type) => {
      const appliances =
        currentRoom?.appliances?.filter(
          (appliance) => appliance.applianceType === type
        ) || [];
      return {
        appliances: appliances,
        total: appliances.length,
        active: appliances.filter((appliance) => appliance.status === "on")
          .length,
      };
    },
    [currentRoom] // Dependencies: Only re-create if currentRoom changes
  );

  // Initialize state with the computed stats
  const initialStats = getApplianceStats(appliance);
  const [getStats, setGetStats] = useState(initialStats);
  const [currentAppliance, setCurrentAppliance] = useState(
    initialStats.appliances.length > 0 ? initialStats.appliances[0] : null
  );
  const [brightness, setBrightness] = useState(
    currentAppliance?.brightness || 0
  );
  const [lightMode, setLightMode] = useState(
    currentAppliance?.colorTemperature || "warm"
  );
  const [airConMode, setairConMode] = useState(
    currentAppliance?.mode || "auto"
  );
  const lightModes = [
    { display: "Warm", value: "warm" },
    { display: "Neutral", value: "neutral" },
    { display: "Cool", value: "cool" },
  ];
  const airConModes = [
    { display: "Auto", value: "auto" },
    { display: "Cool", value: "cool" },
    { display: "Dry", value: "dry" },
  ];
  // Update brightness when currentAppliance changes
  useEffect(() => {
    if (currentAppliance) {
      setBrightness(currentAppliance.brightness); // Default to 50 if brightness is not set
      setLightMode(currentAppliance.colorTemperature || "warm");
    }
  }, [currentAppliance]);

  useEffect(() => {
    const stats = getApplianceStats(appliance);
    setGetStats(stats);

    // Ensure we set the current appliance if it's null
    if (!currentAppliance && stats.appliances.length > 0) {
      setCurrentAppliance(stats.appliances[0]);
    }
  }, [appliance, currentRoom, currentAppliance, getApplianceStats]);

  // Handle Carousel scroll events
  useEffect(() => {
    if (!lightCarouselApi) return;

    if (lightCarouselApi && currentAppliance) {
      const modeIndex = lightModes.findIndex(
        ({value}) => value === currentAppliance.colorTemperature
      );
      if (modeIndex !== -1) {
        lightCarouselApi.scrollTo(modeIndex); // Auto-scroll to selected mode
      }
    }

    const handleCarouselChange = () => {
      const selectedIndex = lightCarouselApi.selectedScrollSnap();
      const selectedMode = lightModes[selectedIndex]?.value;
      if (selectedMode) {
        setLightMode(selectedMode);
        modifyAppliance(currentAppliance?._id, {
          colorTemperature: selectedMode,
        });
      }
    };

    lightCarouselApi.on("select", handleCarouselChange);

    // Cleanup listener
    return () => {
      lightCarouselApi.off("select", handleCarouselChange);
    };
  }, [lightCarouselApi, currentAppliance?._id, modifyAppliance, lightModes]);

  // Handle Carousel scroll events
  useEffect(() => {
    if (!airConCarouselApi) return;

    const handleCarouselChange = () => {
      const selectedIndex = airConCarouselApi.selectedScrollSnap();
      const selectedMode = airConModes[selectedIndex]?.value;
      if (selectedMode) {
        setairConMode(selectedMode);
        modifyAppliance(currentAppliance?._id, {
          mode: selectedMode,
        });
      }
    };

    airConCarouselApi.on("select", handleCarouselChange);

    // Cleanup listener
    return () => {
      airConCarouselApi.off("select", handleCarouselChange);
    };
  }, [airConCarouselApi, currentAppliance?._id, modifyAppliance, airConModes]);

  const handleButton = (id) => {
    setCurrentAppliance((prevAppliance) => {
      if (!prevAppliance) return prevAppliance;

      const newStatus = prevAppliance.status === "on" ? "off" : "on";

      if (newStatus === "on") {
        turnOnAppliance(id);
      } else {
        turnOffAppliance(id);
      }

      setGetStats((prevStats) => ({
        ...prevStats,
        active: prevStats.active + (newStatus === "on" ? 1 : -1),
      }));

      return { ...prevAppliance, status: newStatus };
    });
  };

  // Handle swing card click
  const handleSwingClick = () => {
    if (!currentAppliance) return;

    const newSwingState = !currentAppliance.swing; // Toggle swing state
    console.log(newSwingState);
    modifyAppliance(currentAppliance._id, {
      swing: newSwingState,
    });

    // Update local state
    setCurrentAppliance((prevAppliance) => ({
      ...prevAppliance,
      swing: newSwingState,
    }));
  };

  return (
    <div className="flex flex-1 gap-4 h-full flex-col xl:flex-row">
      <Card className="flex flex-col p-4 xl:w-[20%] gap-8">
        <div
          className="flex justify-start items-center gap-2 cursor-pointer"
          onClick={onClose}
        >
          <ChevronLeft className="shrink-0"></ChevronLeft>
          <div className="flex justify-center items-center xl:text-lg font-semibold text-center">
            {appliance === "Light"
              ? "Lights"
              : appliance === "AirConditioner"
              ? "Air Conditioners"
              : appliance === "Fan"
              ? "Fans"
              : null}
          </div>
        </div>
        <div className="flex-1 flex justify-start items-center flex-col w-full">
          <div className="flex xl:flex-col items-center gap-10 w-full">
            <div className="flex flex-col gap-2">
              <div className="text-3xl font-normal">
                <span
                  className={`text-5xl ${
                    getStats.active >= 1 ? "text-[#184C85]" : ""
                  }`}
                >
                  {getStats.active}
                </span>
                /{getStats.total}
              </div>
              <div className="flex flex-col items-center font-semibold">
                <span className="block">Active</span>
                <span className="block">Devices</span>
              </div>
            </div>
            <div className="flex xl:flex-col gap-4 w-full px-2">
              {getStats.appliances.map((appliance) => {
                return (
                  <Card
                    key={appliance._id}
                    className={`p-4 rounded-2xl text-balance text-center font-semibold cursor-pointer transition-all duration-150 ${
                      appliance._id === currentAppliance._id
                        ? "bg-[#C2E03A] scale-105 shadow-md"
                        : "bg-white border-[#184C85] border-4"
                    }`}
                    onClick={() => {
                      setCurrentAppliance(appliance);
                    }}
                  >
                    {appliance.name}
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </Card>
      <Card className="flex-1 flex flex-col justify-center items-center lg:p-6 p-4">
        {appliance === "Light" ? (
          <div className="flex-1 flex flex-col justify-center items-center w-full relative gap-10">
            <div className="flex-1 w-full flex justify-center items-center">
              <div className="xl:w-[30%]">
                <Carousel
                  orientation="vertical"
                  className="w-full"
                  setApi={setLightCarouselApi}
                >
                  <CarouselContent className="h-[150px]">
                    {lightModes.map(({ display, value }) => (
                      <CarouselItem
                        key={value}
                        className="flex items-center justify-center"
                      >
                        <div className="text-2xl font-semibold">{display}</div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="absolute top-2 left-1/2 transform -translate-x-1/2" />
                  <CarouselNext className="absolute bottom-2 left-1/2 transform -translate-x-1/2" />
                </Carousel>
              </div>
              <div className="relative flex-1 h-full">
                <img
                  src="src/assets/light.svg"
                  className="absolute aspect-auto w-[40%] top-[5%] right-[40%] z-10"
                ></img>
                <motion.div
                  className="absolute bg-[#fffb18] size-[30%] blur-2xl right-[45%] top-[60%] -z-0"
                  animate={{
                    scale: brightness / 100 + 0.5,
                    opacity: currentAppliance?.status === "on" ? 1 : 0,
                  }} // Adjust scale dynamically
                  transition={{ duration: 0.2 }}
                ></motion.div>
              </div>
            </div>
            <div className="w-full h-[25%] flex justify-center items-center gap-10">
              <Button
                className={`size-16 rounded-full relative p-0 ${
                  currentAppliance?.status === "on"
                    ? "bg-[#C2E03A] hover:hover:bg-[#A5C32E]"
                    : "bg-[#184C85] hover:bg-[#133A65]"
                }`}
                onClick={() => {
                  handleButton(currentAppliance._id);
                }}
              >
                <Power
                  className={`absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] !size-10 transition-opacity duration-200 invert ${
                    currentAppliance?.status === "on"
                      ? "opacity-1"
                      : "opacity-0"
                  }`}
                ></Power>
                <PowerOff
                  className={`absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] !size-10 transition-opacity duration-200 ${
                    currentAppliance?.status === "off"
                      ? "opacity-1"
                      : "opacity-0"
                  }`}
                ></PowerOff>
              </Button>
              <div className="flex-1 flex items-center gap-4">
                <SunDim className="size-12" />
                <div className="flex-1">
                  <Slider
                    defaultValue={[brightness]}
                    value={[brightness]} // Controlled value
                    max={100}
                    step={1}
                    onValueChange={(value) => {
                      setBrightness(value[0]);
                    }}
                    onValueCommit={() => {
                      modifyAppliance(currentAppliance?._id, {
                        brightness: brightness,
                      });
                    }}
                  />
                </div>
                <Sun className="size-12" />
              </div>
            </div>
          </div>
        ) : appliance === "AirConditioner" ? (
          <div className="flex-1 flex flex-col justify-center items-center w-full relative gap-6">
            <div className="flex-1 w-full flex justify-center items-start">
              <div className="xl:w-[30%] h-full flex justify-center items-center">
                <Carousel
                  orientation="vertical"
                  className="w-full"
                  setApi={setAirConCarouselApi}
                >
                  <CarouselContent className="h-[200px]">
                    {airConModes.map(({ display, value }) => (
                      <CarouselItem
                        key={value}
                        className="flex items-center justify-center"
                      >
                        <div className="text-2xl font-semibold">{display}</div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="absolute top-2 left-1/2 transform -translate-x-1/2" />
                  <CarouselNext className="absolute bottom-2 left-1/2 transform -translate-x-1/2" />
                </Carousel>
              </div>
              <div className="relative flex-1 h-full">
                <img
                  src="src/assets/airCon.svg"
                  className="absolute aspect-auto w-[70%] top-[10%] right-[10%] z-10"
                ></img>
                <motion.div
                  className="absolute bg-[#BFE6FF] size-[70%] blur-2xl right-[10%] top-[40%] -z-0"
                  animate={{
                    scale: brightness / 100 + 0.5,
                    opacity: currentAppliance?.status === "on" ? 1 : 0,
                  }} // Adjust scale dynamically
                  transition={{ duration: 0.2 }}
                ></motion.div>
              </div>
            </div>
            <div className="w-full h-[50%] flex justify-center items-center gap-10">
              <div className="flex flex-col justify-center items-center gap-4 w-[50%]">
                <Button
                  className={`size-14 rounded-full relative p-0 ${
                    currentAppliance?.status === "on"
                      ? "bg-[#C2E03A] hover:hover:bg-[#A5C32E]"
                      : "bg-[#184C85] hover:bg-[#133A65]"
                  }`}
                  onClick={() => {
                    handleButton(currentAppliance._id);
                  }}
                >
                  <Power
                    className={`absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] !size-8 transition-opacity duration-200 invert ${
                      currentAppliance?.status === "on"
                        ? "opacity-1"
                        : "opacity-0"
                    }`}
                  ></Power>
                  <PowerOff
                    className={`absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] !size-8 transition-opacity duration-200 ${
                      currentAppliance?.status === "off"
                        ? "opacity-1"
                        : "opacity-0"
                    }`}
                  ></PowerOff>
                </Button>
                <div className="flex gap-4">
                  <Card
                    className={`py-2 px-6 flex flex-col justify-center transition-all duration-200 items-center cursor-pointer ${
                      currentAppliance?.swing === true
                        ? "bg-[#C2E03A] hover:hover:bg-[#A5C32E] scale-105"
                        : "border-4 border-[#184C85]"
                    }`}
                    onClick={handleSwingClick}
                  >
                    <TbAirConditioning className="size-8" />
                    <div className="">Swing</div>
                  </Card>
                  <Card
                    className={`py-2 px-6 flex flex-col justify-center items-center                     ${
                      currentAppliance?.status === "on"
                        ? "bg-[#C2E03A] hover:hover:bg-[#A5C32E]"
                        : "bg-[#184C85] hover:bg-[#133A65]"
                    }`}
                  >
                    <Timer />
                    <div>Timer</div>
                  </Card>
                </div>
              </div>
              <div className="flex-1 flex justify-end">
                <Thermostat
                  temperature={currentAppliance?.temperature || 23}
                  onTemperatureChange={(newTemp) => {
                    modifyAppliance(currentAppliance?._id, {
                      temperature: newTemp,
                    });
                  }}
                />
              </div>
            </div>
          </div>
        ) : null}
      </Card>
    </div>
  );
};

export default ExpandedView;
