import { useRoomStore } from "@/store/room";

const RoomPage = () => {
  const { currentRoom } = useRoomStore();
  return <div>{currentRoom.name}</div>;
};

export default RoomPage;
