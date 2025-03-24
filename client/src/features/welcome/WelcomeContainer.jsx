import { useState, useEffect } from "react";
import { userAuthStore } from "@/store/userAuth";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useHomeStore } from "@/store/home";
import { Label } from "@radix-ui/react-label";
import { Check } from "lucide-react";
import { useNavigate } from "react-router-dom";

const WelcomeContainer = () => {
  const { user } = userAuthStore();
  const { createHome, acceptInvite } = useHomeStore();
  const [HomeSetupStep, setHomeSetupStep] = useState(0);
  const [userType, setuserType] = useState("homedweller");
  const [homeName, setHomeName] = useState("");
  const [homeCode, setHomeCode] = useState("");
  const [rooms, setRooms] = useState([]);
  const [newRoom, setNewRoom] = useState({ name: "", type: "" });
  const navigate = useNavigate();

  const userTypeOptions = [
    {
      value: "homeowner",
      label: "HOME OWNER",
      description: "You are the owner of the home.",
      image: "src/assets/homeowner.png",
    },
    {
      value: "homedweller",
      label: "HOME DWELLER",
      description: "You are a dweller of a home.",
      image: "src/assets/homedweller.png",
    },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setHomeSetupStep(1);
    }, 8000);
    return () => clearTimeout(timer);
    // setHomeSetupStep(1);
  }, [user]);

  const addRoom = () => {
    if (newRoom.name && newRoom.type) {
      setRooms([...rooms, newRoom]);
      setNewRoom({ name: "", type: newRoom.type });
    }
  };
  return (
    <motion.div className="flex items-center justify-center min-h-screen bg-cover bg-center bg-gradient-to-br from-white to-sky-100">
      {HomeSetupStep === 0 ? (
        <div className="flex flex-col justify-center items-center text-6xl gap-4 font-semibold">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="font-display font-light"
            key={HomeSetupStep} // This ensures the animation restarts when the step changes
          >
            Hello,{" "}
            <motion.span className="font-normal text-[#2BB673]">
              {user?.fullName?.split("").map((char, index) => {
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 10 }} // Start slightly below
                    animate={{ opacity: 1, x: 0 }} // Moves up (-10), then settles (0)
                    transition={{
                      delay: 2 + index * 0.1,
                      duration: 0.4,
                      ease: "easeInOut",
                    }}
                    className="inline-block"
                  >
                    {char === " " ? "\u00A0" : char}{" "}
                    {/* Keeps spaces visible */}
                  </motion.div>
                );
              })}
            </motion.span>
          </motion.span>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 1,
              delay: 3.4 + (user?.fullName?.length - 1) * 0.1,
            }}
          >
            Welcome to{" "}
            <motion.span
              className="inline-block"
              initial={{ opacity: 0, clipPath: "inset(0% 100% 0% 0%)" }}
              animate={{ opacity: 1, clipPath: "inset(0% 0% 0% 0%)" }}
              transition={{
                duration: 1.5,
                ease: "easeOut",
                delay: 4.4 + (user?.fullName?.length - 1) * 0.1,
              }}
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#2BB673] to-[#C2E03A]">
                HomeConnect
              </span>
            </motion.span>
          </motion.span>
        </div>
      ) : HomeSetupStep === 1 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="p-8 bg-white rounded-2xl shadow-xl text-center flex flex-col items-center gap-4 w-lg"
          key={HomeSetupStep} // This ensures the animation restarts when the step changes
        >
          <h2 className="text-2xl font-semibold">Let's Get Started !</h2>
          <p className="text-gray-600">
            Are you creating a new home or joining an existing one?
          </p>
          <div className="w-full flex justify-center items-center">
            <RadioGroup
              value={userType}
              onValueChange={(value) => {
                setuserType(value);
              }}
              className="flex justify-center gap-6"
            >
              {userTypeOptions.map((option) => {
                return (
                  <div key={option.value} className="relative">
                    <RadioGroupItem
                      value={option.value}
                      id={option.value}
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor={option.value}
                      className="flex flex-col items-center justify-between rounded-xl border-4 border-muted bg-popover p-4 hover:text-accent-foreground peer-data-[state=checked]:border-[#C2E03A] [&:has([data-state=checked])]:border-[#C2E03A] transition-all duration-200 w-lg h-lg hover:cursor-pointer"
                    >
                      <img
                        className="size-72 object-contain"
                        src={option.image}
                        alt={option.label}
                      />
                      <span className="font-semibold text-lg tracking-wide">
                        {option.label}
                      </span>
                      <span className="text-xs text-center text-muted-foreground">
                        {option.description}
                      </span>
                      {userType === option.value && (
                        <div className="absolute -top-1.5 -right-1.5 h-8 w-8 bg-[#C2E03A] rounded-full flex items-center justify-center shadow-sm">
                          <Check className="h-5 w-5 text-black dark:text-black" />
                        </div>
                      )}
                    </Label>
                  </div>
                );
              })}
            </RadioGroup>
          </div>
          <Button
            className="px-4 py-2"
            onClick={() => {
              setHomeSetupStep(2);
            }}
          >
            Continue
          </Button>
        </motion.div>
      ) : userType === "homeowner" && HomeSetupStep === 2 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="p-8 bg-white rounded-2xl shadow-xl text-center flex flex-col items-center gap-4"
        >
          <h2 className="text-2xl font-semibold">Let's set up your home</h2>
          <p className="text-gray-600">
            What would you like to name your home?
          </p>
          <Input
            type="text"
            placeholder="Enter home name"
            className="border rounded-lg p-2 w-full"
            onChange={(e) => {
              setHomeName(e.target.value);
            }}
          />
          <Button
            className=""
            onClick={() => {
              setHomeSetupStep(3);
            }}
          >
            Continue
          </Button>
        </motion.div>
      ) : userType === "homeowner" && HomeSetupStep === 3 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          key={HomeSetupStep} // This ensures the animation restarts when the step changes
          className="p-8 bg-white rounded-2xl shadow-xl text-center flex flex-col items-center gap-4 w-96"
        >
          <h2 className="text-2xl font-semibold">Add Rooms to Your Home</h2>
          <div className="w-full flex flex-col gap-2">
            <Input
              type="text"
              placeholder="Room Name"
              value={newRoom.name}
              onChange={(e) => setNewRoom({ ...newRoom, name: e.target.value })}
            />
            <Select
              onValueChange={(value) => setNewRoom({ ...newRoom, type: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Room Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="living_room">Living Room</SelectItem>
                <SelectItem value="kitchen">Kitchen</SelectItem>
                <SelectItem value="bedroom">Bedroom</SelectItem>
                <SelectItem value="bathroom">Bathroom</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
            <Button className="mt-2 px-4 py-2" onClick={addRoom}>
              Add Room
            </Button>
          </div>
          <div className="w-full mt-4 text-left">
            <h3 className="text-lg font-semibold">Rooms Added:</h3>
            {rooms.length > 0 ? (
              <ul className="mt-2">
                {rooms.map((room, index) => (
                  <li key={index} className="text-gray-700">
                    {room.name} - {room.type}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No rooms added yet.</p>
            )}
          </div>
          <Button
            className="mt-4 px-4 py-2"
            onClick={() => {
              console.log({ homeName, rooms, username: user.username });
              createHome({ homeName, rooms, username: user.username });
              navigate("/dashboard");
            }}
          >
            Finish Setup
          </Button>
        </motion.div>
      ) : userType === "homedweller" && HomeSetupStep === 2 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="p-8 bg-white rounded-2xl shadow-xl text-center flex flex-col items-center gap-4"
        >
          <h2 className="text-2xl font-semibold">Let's connect to your home</h2>
          <p className="text-gray-600">Please enter your home code</p>
          <Input
            type="text"
            placeholder="Enter home code"
            className="border rounded-lg p-2 w-full"
            onChange={(e) => {
              setHomeCode(e.target.value);
            }}
          />
          <Button
            className=""
            onClick={async () => {
              console.log({ username: user.username, invite: homeCode });
              try {
                await acceptInvite({
                  invite: homeCode,
                  username: user.username,
                }); // Wait for completion
                setTimeout(() => {
                  navigate("/dashboard"); // Navigate after delay
                }, 1500); // 1.5-second delay
                navigate("/dashboard"); // Navigate only after createHome finishes
              } catch (error) {
                console.error("Failed to create home:", error);
              }
            }}
          >
            Continue
          </Button>
        </motion.div>
      ) : null}
    </motion.div>
  );
};

export default WelcomeContainer;
