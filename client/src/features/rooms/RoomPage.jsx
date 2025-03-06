import { useHomeStore } from "@/store/home";
import { useRoomStore } from "@/store/room";
import { useState } from "react";

const RoomPage = () => {
  const {currentExpanded, setExpanded} = useState("");
  const { currentRoom } = useRoomStore();
  return <div className="grid grid-cols-1">{currentRoom.name}</div>;
};

export default RoomPage;
