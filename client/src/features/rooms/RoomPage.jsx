import { useHomeStore } from "@/store/home";
import { useRoomStore } from "@/store/room";
import { useEffect, useState } from "react";
import LightCard from "./components/LightCard";
import AirConCard from "./components/AirConCard";
import { Card, CardHeader } from "@/components/ui/card";
import { AddApplianceCard } from "./components/AddApplianceCard";
import FanCard from "./components/FanCard";
import { ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useSidebar } from "@/components/ui/sidebar";
import ExpandedView from "./components/ExpandedView";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { userAuthStore } from "@/store/userAuth";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { LampCeiling, AirVent, Fan } from "lucide-react";

const RoomPage = () => {
  const [currentExpanded, setExpanded] = useState(null);
  const [hovered, setHovered] = useState(null);
  const { currentRoom, addAppliance, getCurrentUsag} = useRoomStore();
  const { user } = userAuthStore();
  const { isMobile } = useSidebar();
  const [isPopoverOpen, setIsPopoverOpen] = useState(false); // State for Popover
  const [applianceType, setApplianceType] = useState(""); // State for appliance type
  const [applianceName, setApplianceName] = useState(""); // State for appliance name
  // State to store chart data
  const [chartData, setChartData] = useState([]);

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

  // Track the current room ID
  const [currentRoomId, setCurrentRoomId] = useState(currentRoom?._id);

  // Reset expanded view only when the room ID changes (not when the room is updated)
  useEffect(() => {
    if (currentRoom?._id !== currentRoomId) {
      setCurrentRoomId(currentRoom?._id); // Update the tracked room ID
      setExpanded(null); // Reset expanded view
    }
  }, [currentRoom?._id, currentRoomId, getCurrentUsage]); // Trigger only when the room ID changes

  useEffect(() => {
    const fetchUsage = async () => {
      try {
        // Fetch current usage for all appliance types
        const lightUsage = await getCurrentUsage("Light");
        const fanUsage = await getCurrentUsage("Fan");
        const airConUsage = await getCurrentUsage("AirConditioner");

        // Format the data for the chart
        const chartData = [
          {
            light: lightUsage || 0, // Use 0 if no data is returned
            fan: fanUsage || 0,
            airConditioner: airConUsage || 0,
          },
        ];
        setChartData(chartData);
      } catch (error) {
        console.error("Failed to fetch usage data:", error);
        return []; // Return an empty array if there's an error
      }
    };
    fetchUsage();
  }, [getCurrentUsage, currentRoom?.appliances]);

  const lightStats = getApplianceStats("Light");
  const fansStats = getApplianceStats("Fan");
  const airConStats = getApplianceStats("AirConditioner");

  const chartConfig = {
    light: {
      label: "Lights",
      color: "#C2E03A",
    },
    fan: {
      label: "Fan",
      color: "#184C85",
    },
    airConditioner: {
      label: "AirConditioner",
      color: "#0D1B2A",
    },
  };

  // Handle form submission
  const handleAddAppliance = () => {
    if (!applianceType || !applianceName) {
      alert("Please fill in all fields.");
      return;
    }

    // Add the new appliance to the room
    addAppliance({
      requester: user.username,
      appliance: {
        applianceType: applianceType,
        name: applianceName,
      }
    });

    // Reset form fields and close the Popover
    setApplianceType("");
    setApplianceName("");
  };

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
      component: (
        <Dialog>
          <DialogTrigger asChild>
            <div className="flex-1 flex justify-center items-center h-full">
              <AddApplianceCard key={"add"} />
            </div>
          </DialogTrigger>
          <DialogContent className="w-80 p-4 bg-white rounded-lg shadow-lg">
            <h3 className="font-semibold text-lg mb-4">Add New Appliance</h3>
            <div className="space-y-4">
              {/* Appliance Type Dropdown */}
              <div>
                <Label htmlFor="applianceType">Appliance Type</Label>
                <Select
                  value={applianceType}
                  onValueChange={(value) => setApplianceType(value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Light">Light</SelectItem>
                    <SelectItem value="AirConditioner">
                      Air Conditioner
                    </SelectItem>
                    <SelectItem value="Fan">Fan</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Appliance Name Input */}
              <div>
                <Label htmlFor="applianceName">Appliance Name</Label>
                <Input
                  id="applianceName"
                  value={applianceName}
                  onChange={(e) => setApplianceName(e.target.value)}
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
      ),
    },
  ];

  return (
    <motion.div
      className="xl:p-4 flex-1 flex xl:gap-4 gap-2 p-4 flex-col xl:flex-row"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      key={currentRoom.name}
    >
      <motion.div
        className="flex-1 flex justify-center items-center relative z-50"
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
                  scale: hovered === key ? 1.03 : 1, // Disable hover effect when Popover is open
                  opacity: hovered && hovered !== key ? 0.6 : 1, // Disable hover effect when Popover is open
                  filter:
                    hovered && hovered !== key ? "blur(2px)" : "blur(0px)",
                  boxShadow: "0px 0px 8px rgb(255,255,255)",
                }}
                transition={{ type: "spring", stiffness: 250, damping: 20 }}
                onHoverStart={() => setHovered(key)} // Disable hover effect when Popover is open
                onHoverEnd={() => setHovered(null)} // Disable hover effect when Popover is open
                onClick={(e) => {
                  if (key === "add") {
                    return; // Prevent setting expanded view
                  }
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
        <Card className="w-full rounded-3xl font-semibold text-2xl flex flex-col cursor-pointer">
          <CardHeader>Current Usage (KWh)</CardHeader>
          <ChartContainer config={chartConfig} className="flex-1">
            <BarChart accessibilityLayer data={chartData}>
              <ChartTooltip
                content={<ChartTooltipContent hideLabel className="w-44" />}
              />
              <ChartLegend content={<ChartLegendContent />} />
              <Bar dataKey="light" fill="var(--color-light)" radius={4} />
              <Bar dataKey="fan" fill="var(--color-fan)" radius={4} />
              <Bar
                dataKey="airConditioner"
                fill="var(--color-airConditioner)"
                radius={4}
              />
            </BarChart>
          </ChartContainer>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default RoomPage;
