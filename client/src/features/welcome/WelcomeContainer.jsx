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
import { useHomeStore } from "@/store/home";

const WelcomeContainer = () => {
  const { user } = userAuthStore();
  const { createHome } = useHomeStore();
  const [HomeSetupStep, setHomeSetupStep] = useState(0);
  const [homeName, setHomeName] = useState("");
  const [rooms, setRooms] = useState([]);
  const [newRoom, setNewRoom] = useState({ name: "", type: "" });

  useEffect(() => {
    const timer = setTimeout(() => {
      setHomeSetupStep(1);
    }, 7000);

    return () => clearTimeout(timer);
  }, []);

  const addRoom = () => {
    if (newRoom.name && newRoom.type) {
      setRooms([...rooms, newRoom]);
      setNewRoom({ name: "", type: newRoom.type });
    }
    console.log(newRoom.type);
  };

  return (
    <motion.div className="flex items-center justify-center min-h-screen bg-cover bg-center bg-gradient-to-br from-white to-sky-100">
      {HomeSetupStep === 0 ? (
        <div className="flex flex-col justify-center items-center text-6xl gap-4 font-semibold">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
            className="font-display font-light"
          >
            Hello,{" "}
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 2.5 }}
              className="font-normal text-[#2BB673]"
            >
              {user}
            </motion.span>
          </motion.span>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 3.5 }}
          >
            Welcome to{" "}
            <motion.span
              className="inline-block"
              initial={{ opacity: 0, clipPath: "inset(0% 100% 0% 0%)" }}
              animate={{ opacity: 1, clipPath: "inset(0% 0% 0% 0%)" }}
              transition={{ duration: 1.5, ease: "easeOut", delay: 4.5 }}
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
            value={homeName}
            onChange={(e) => setHomeName(e.target.value)}
          />
          <Button
            className="mt-4 px-4 py-2"
            onClick={() => setHomeSetupStep(2)}
          >
            Continue
          </Button>
        </motion.div>
      ) : HomeSetupStep === 2 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
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
                <SelectItem value="Living Room">Living Room</SelectItem>
                <SelectItem value="Kitchen">Kitchen</SelectItem>
                <SelectItem value="Bedroom">Bedroom</SelectItem>
                <SelectItem value="Bathroom">Bathroom</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
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
              createHome({homeName, rooms})
            }}
          >
            Finish Setup
          </Button>
        </motion.div>
      ) : null}
    </motion.div>
  );
};

export default WelcomeContainer;
