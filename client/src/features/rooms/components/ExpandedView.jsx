import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
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
import {
  ChevronLeft,
  PencilLine,
  Power,
  PowerOff,
  Sun,
  SunDim,
  Timer,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import Thermostat from "./Thermostat";
import { TbAirConditioning } from "react-icons/tb";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Settings, Plus, Trash, X } from "lucide-react"; // Import icons
import { userAuthStore } from "@/store/userAuth";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
const ExpandedView = ({ appliance, onClose }) => {
  const {
    currentRoom,
    addAppliance,
    removeAppliance,
    turnOnAppliance,
    turnOffAppliance,
    modifyAppliance,
    renameAppliance,
  } = useRoomStore();
  const { user } = userAuthStore();
  const [lightCarouselApi, setLightCarouselApi] = useState(null);
  const [airConCarouselApi, setAirConCarouselApi] = useState(null);
  const [fanCarouselApi, setFanCarouselApi] = useState(null);

  // Inside the ExpandedView component
  const [isSettingsExpanded, setIsSettingsExpanded] = useState(false);
  const [isAddExpanded, setIsAddExpanded] = useState(false);
  const [applianceNameAdd, setApplianceNameAdd] = useState(""); // State for appliance name

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
  const [fanSpeed, setFanSpeed] = useState(currentAppliance?.currentSpeed || 0);
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
  const fanModes = [
    { display: "High", value: 3 },
    { display: "Medium", value: 2 },
    { display: "Low", value: 1 },
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
        ({ value }) => value === currentAppliance.colorTemperature
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
          requester: user.username,
          colorTemperature: selectedMode,
        });
        currentAppliance.colorTemperature = selectedMode;
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
          requester: user.username,
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

  // Handle Carousel scroll events
  useEffect(() => {
    if (!fanCarouselApi) return;

    const handleCarouselChange = () => {
      const selectedIndex = fanCarouselApi.selectedScrollSnap();
      const selectedMode = fanModes[selectedIndex]?.value;
      if (selectedMode) {
        setFanSpeed(selectedMode);
        modifyAppliance(currentAppliance?._id, {
          requester: user.username,
          currentSpeed: selectedMode,
        });
      }
    };

    fanCarouselApi.on("select", handleCarouselChange);

    // Cleanup listener
    return () => {
      fanCarouselApi.off("select", handleCarouselChange);
    };
  }, [fanCarouselApi, currentAppliance?._id, modifyAppliance, fanModes]);

  const handleButton = () => {
    setCurrentAppliance((prevAppliance) => {
      if (!prevAppliance) return prevAppliance;

      const newStatus = prevAppliance.status === "on" ? "off" : "on";

      if (newStatus === "on") {
        turnOnAppliance({ requester: user.username, id: currentAppliance._id });
      } else {
        turnOffAppliance({
          requester: user.username,
          id: currentAppliance._id,
        });
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

  // Function to handle settings button click
  const handleSettingsClick = () => {
    setIsSettingsExpanded(!isSettingsExpanded);
  };

  // Function to handle add appliance
  const handleAddAppliance = async () => {
    if (!applianceNameAdd) {
      alert("Please fill in all fields.");
      return;
    }

    // Add the new appliance to the room
    await addAppliance({
      requester: user.username,
      appliance: {
        applianceType: currentAppliance.applianceType,
        name: applianceNameAdd,
      },
    });

    // Reset form fields and close the Popover
    setApplianceType("");
    setApplianceName("");
  };

  // Function to handle delete appliance
  const handleDeleteAppliance = async () => {
    // Delete appliance in database
    toast.info("Deleting appliance...");
    await removeAppliance(currentAppliance._id, user.username);
  };

  // Function to handle close expanded menu
  const handleCloseExpandedMenu = () => {
    setIsSettingsExpanded(false);
  };

  const [isEditing, setIsEditing] = useState(false); // State to track edit mode
  const [editedName, setEditedName] = useState(currentAppliance.name); // State to store edited name
  // Handle click on the PencilLine icon
  const handleEditClick = () => {
    setIsEditing(true); // Enter edit mode
    setEditedName(currentAppliance.name); // Initialize edited name with the current name
  };

  // Handle saving the edited name
  const handleSave = async () => {
    if (editedName.trim() === "") return; // Prevent saving empty names

    // Make a request to update the appliance name in the database
    const res = await renameAppliance(currentAppliance._id, {
      requester: user.username, // Assuming you have access to the user
      appliance: {
        name: editedName,
      },
    });

    if (res.success) {
      currentAppliance.name = editedName;
    }

    setIsEditing(false); // Exit edit mode
  };

  // Handle input change
  const handleInputChange = (e) => {
    setEditedName(e.target.value);
  };

  // Handle keydown events (e.g., Enter to save, Escape to cancel)
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSave(); // Save on Enter key
    } else if (e.key === "Escape") {
      setIsEditing(false); // Cancel on Escape key
    }
  };

  // Handle blur event (when the input loses focus)
  const handleBlur = () => {
    handleSave(); // Save when the input loses focus
  };

  return (
    <div className="flex flex-1 gap-4 h-full flex-col xl:flex-row">
      <Card className="flex flex-col p-4 xl:w-[20%] max-h-none">
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
        <div className="flex justify-start items-center flex-col flex-1">
          <div className="flex flex-col items-center xl:gap-6 w-full justify-center h-full">
            <div className="flex xl:flex-col gap-2">
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
              <div className="flex xl:flex-col items-center font-semibold">
                <span className="block">Active</span>
                <span className="block">Devices</span>
              </div>
            </div>
            <ScrollArea className="w-full xl:h-[250px] h-full xl:px-2">
              <div className="flex xl:flex-col xL:gap-3 gap-6 w-full px-2 py-2 justify-center xl:justify-start">
                {getStats.appliances.map((appliance) => {
                  return (
                    <Card
                      key={appliance._id}
                      className={`xl:p-4 px-10 py-4 rounded-2xl text-balance text-center font-semibold cursor-pointer transition-all duration-150 ${
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
              <ScrollBar></ScrollBar>
            </ScrollArea>
            <div className="h-[20%] flex justify-center items-end">
              {isSettingsExpanded ? (
                // Expanded Buttons
                <div className="flex flex-col gap-2 w-full">
                  {/* Add Appliance Button */}
                  <Button
                    className="flex items-center gap-2 bg-[#C2E03A] hover:bg-[#A5C32E] text-black w-full"
                    onClick={() => setIsAddExpanded(true)}
                  >
                    <Plus className="size-4" />
                    <span>Add Appliance</span>
                  </Button>
                  <Dialog open={isAddExpanded} onOpenChange={setIsAddExpanded}>
                    <DialogContent className="w-80 p-4 bg-white rounded-lg shadow-lg">
                      <h3 className="font-semibold text-lg mb-4">
                        Add New Appliance
                      </h3>
                      <div className="space-y-4">
                        {/* Appliance Type Dropdown */}
                        <div>
                          <Label htmlFor="applianceType">Appliance Type</Label>
                          <Input
                            id="applianceName"
                            placeholder={currentAppliance.applianceType}
                            disabled
                          />
                        </div>

                        {/* Appliance Name Input */}
                        <div>
                          <Label htmlFor="applianceName">Appliance Name</Label>
                          <Input
                            id="applianceName"
                            value={applianceNameAdd}
                            onChange={(e) =>
                              setApplianceNameAdd(e.target.value)
                            }
                            placeholder="Enter appliance name"
                          />
                        </div>

                        {/* Submit Button */}
                        <Button onClick={handleAddAppliance} className="w-full">
                          Add Appliance
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                  {/* Delete Appliance Button */}
                  <Button
                    className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white w-full"
                    onClick={handleDeleteAppliance}
                  >
                    <Trash className="size-4" />
                    <span>Delete Appliance</span>
                  </Button>

                  {/* Close Menu Button */}
                  <Button
                    className="flex items-center gap-2 bg-gray-500 hover:bg-gray-600 text-white w-full"
                    onClick={handleCloseExpandedMenu}
                  >
                    <X className="size-4" />
                    <span>Close</span>
                  </Button>
                </div>
              ) : (
                // Settings Button
                <Button
                  className="rounded-full size-10 bg-[#184C85] hover:bg-[#133A65] transition-all duration-200"
                  onClick={handleSettingsClick}
                >
                  <Settings className="!size-8" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </Card>
      <Card className="flex-1 flex flex-col justify-center rounded-3xl overflow-hidden">
        <CardHeader className="flex flex-row justify-between items-center bg-[#C2E03A]">
          {isEditing ? (
            // Render an input field in edit mode
            <Input
              autoFocus // Automatically focus the input when it appears
              value={editedName}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              onBlur={handleBlur}
              className="!text-2xl font-semibold focus-visible:ring-0 border-0 shadow-none px-0 py-0"
            />
          ) : (
            // Render the CardTitle in non-edit mode
            <CardTitle className="text-2xl">{currentAppliance.name}</CardTitle>
          )}
          <PencilLine
            className="size-6 cursor-pointer"
            onClick={handleEditClick} // Toggle edit mode on click
          />
        </CardHeader>
        {appliance === "Light" ? (
          <div className="flex-1 flex flex-col justify-center items-center w-full relative p-4">
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
                  className="absolute aspect-auto w-[20%] md:w-[30%] max-w-32 md:max-w-max xl:w-[40%] md:top-[20%] xl:top-[5%] xl:right-[40%] right-[20%] z-10"
                ></img>
                <motion.div
                  className="absolute bg-[#fffb18] xl:size-[30%] size-24 blur-2xl xl:right-[45%] xl:top-[60%] right-[27%] bottom-[0%] -z-0"
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
                className={`xl:size-16 size-14 rounded-full relative p-0 ${
                  currentAppliance?.status === "on"
                    ? "bg-[#C2E03A] hover:hover:bg-[#A5C32E]"
                    : "bg-[#184C85] hover:bg-[#133A65]"
                }`}
                onClick={handleButton}
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
                    max={10}
                    step={1}
                    onValueChange={(value) => {
                      setBrightness((value[0] % 10) + 1);
                    }}
                    onValueCommit={() => {
                      modifyAppliance(currentAppliance?._id, {
                        requester: user.username,
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
                      requester: user.username,
                      temperature: newTemp,
                    });
                  }}
                />
              </div>
            </div>
          </div>
        ) : appliance === "Fan" ? (
          <div className="flex-1 flex flex-col justify-center items-center w-full relative p-4">
            <div className="flex-1 w-full flex justify-center items-center">
              <div className="xl:w-[30%]">
                <Carousel
                  orientation="vertical"
                  className="w-full"
                  setApi={setFanCarouselApi}
                >
                  <CarouselContent className="h-[150px]">
                    {fanModes.map(({ display, value }) => (
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
                  src="src/assets/fan.svg"
                  className="absolute aspect-auto w-[20%] md:w-[30%] max-w-32 md:max-w-max xl:w-[60%] md:top-[20%] xl:top-[5%] right-[20%] z-10"
                ></img>
              </div>
            </div>
            <div className="w-full h-[25%] flex justify-center items-center gap-10">
              <Button
                className={`xl:size-16 size-14 rounded-full relative p-0 ${
                  currentAppliance?.status === "on"
                    ? "bg-[#C2E03A] hover:hover:bg-[#A5C32E]"
                    : "bg-[#184C85] hover:bg-[#133A65]"
                }`}
                onClick={handleButton}
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
            </div>
          </div>
        ) : null}
      </Card>
    </div>
  );
};

export default ExpandedView;
