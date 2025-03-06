import { useRoomStore } from "@/store/room";

const RoomGrid = () => {
  const { currentRoom } = useRoomStore();
  console.log(currentRoom);
  return <div>RoomGrid</div>;
};

export default RoomGrid;
