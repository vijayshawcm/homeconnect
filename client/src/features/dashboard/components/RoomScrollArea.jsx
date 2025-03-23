import RoomCards from "./RoomCards";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useSidebar } from "@/components/ui/sidebar";
import clsx from "clsx";
import { Card } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select } from "@radix-ui/react-select";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { useHomeStore } from "@/store/home";
import { userAuthStore } from "@/store/userAuth";

const RoomScrollArea = ({ rooms }) => {
  const { open, isMobile } = useSidebar();
  const { currentHome, addRoom } = useHomeStore();
  const { user } = userAuthStore();
  // Adjust gap based on sidebar state and screen size
  const gapClass = clsx({
    "gap-4": isMobile, // Smaller gap for mobile
    "gap-10": !isMobile && open, // Medium gap when sidebar is open
    "gap-12": !isMobile && !open, // Default gap when sidebar is closed
  });

  const [roomType, setRoomType] = useState(""); // State for appliance type
  const [roomName, setRoomName] = useState(""); // State for appliance name
  const [displayRooms, setDisplayRooms] = useState( // State for room display

  )

  // Handle form submission
  const handleAddRoom = () => {
    if (!roomType || !roomName) {
      alert("Please fill in all fields.");
      return;
    }
    console.log(roomType);

    // Add the new appliance to the room
    addRoom(user.username,
      {
      roomType: roomType,
      name: roomName,
    });

    // Reset form fields and close the Popover
    setRoomType("");
    setRoomName("");
  };

  return (
    <div className="flex">
      <ScrollArea className="w-[78%] whitespace-nowrap">
        <div
          className={`w-full flex ${gapClass} py-4 shrink-0 pl-4 transition-all duration-500 mb-4`}
        >
          {currentHome.rooms.map((room) => (
            <RoomCards key={room.name} room={room} />
          ))}
        </div>
        <ScrollBar orientation="horizontal" className="px-5" />
      </ScrollArea>
      <div className="border-2 border-[#184C85] rounded-full"></div>
      <div className="flex-1 flex justify-center items-center pb-4 px-4">
        <Dialog>
          <DialogTrigger asChild>
            <Card className="bg-[#C2E03A] lg:w-72 h-40 w-60 rounded-3xl shadow-md relative transition-all duration-300 ease-in-out hover:scale-[1.03] active:scale-95 select-none touch-none hover:shadow-xl border-0 hover:border hover:border-black flex justify-center items-center cursor-pointer">
              <Plus className="size-12 lg:size-16"></Plus>
            </Card>
          </DialogTrigger>
          <DialogContent className="w-[25%] px-4 py-10 bg-white !rounded-3xl shadow-lg">
            <h3 className="font-semibold text-2xl mb-4 text-center">Add New Room</h3>
            <div className="space-y-4">
              {/* Appliance Type Dropdown */}
              <div>
                <Label htmlFor="roomType">Room Type</Label>
                <Select
                  value={roomType}
                  onValueChange={(value) => {
                    setRoomType(value);
                  }}
                >
                  <SelectTrigger className="w-full rounded-3xl">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bedroom">Bedroom</SelectItem>
                    <SelectItem value="living_room">Living Room</SelectItem>
                    <SelectItem value="kitchen">Kitchen</SelectItem>
                    <SelectItem value="bathroom">Bathroom</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Room Name Input */}
              <div>
                <Label htmlFor="roomName">Room Name</Label>
                <Input
                  id="roomName"
                  value={roomName}
                  onChange={(e) => {
                    setRoomName(e.target.value);
                  }}
                  placeholder="Enter room name"
                  className = "rounded-3xl"
                />
              </div>

              {/* Submit Button */}
              <div className="w-full flex justify-center items-center">
                <Button
                  onClick={handleAddRoom}
                  className="w-[50%] rounded-full bg-[#C2E03A] text-black font-semibold hover:bg-[#A8C82A]"
                >
                  Add Room
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default RoomScrollArea;
