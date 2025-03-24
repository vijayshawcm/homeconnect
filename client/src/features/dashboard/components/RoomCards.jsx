import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { useRoomStore } from "@/store/room";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { BsFillLightningChargeFill } from "react-icons/bs";
import { useHomeStore } from "@/store/home";
import { Edit, Trash2 } from "lucide-react";
import { userAuthStore } from "@/store/userAuth";

const RoomCards = ({ room, onConfirmDelete, title, message }) => {
  const { currentHome } = useHomeStore();
  const { user } = userAuthStore();
  const { currentRoom, setCurrentRoom, renameRoom } = useRoomStore();
  const formattedName = room.name.replace(/\s+/g, "");
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [newRoomName, setNewRoomName] = useState(room.name);
  const [isUpdating, setIsUpdating] = useState(false);
  const [editError, setEditError] = useState("");
  const [isEditRoomFocused, setIsEditRoomFocused] = useState(false);
  const totalEnergy = currentHome.energyProfile.currentUsage;
  const roomEnergy = room.energyProfile.currentUsage;
  const energyPercentage =
    totalEnergy > 0 ? ((roomEnergy / totalEnergy) * 100).toFixed(0) : 0;

  const handleEditRoom = async () => {
    if (!newRoomName.trim()) {
      setEditError("Room name cannot be empty");
      return;
    }

    if (newRoomName === room.name) {
      setIsEditDialogOpen(false);
      return;
    }

    setIsUpdating(true);
    try {
      // api call
      await renameRoom({
        requester: user.username,
        room: {
          id: currentRoom._id,
          name: newRoomName,
        },
      });
      setIsUpdating(false);
      setIsEditDialogOpen(false);
    } catch (error) {
      console.error("Error updating room:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDeleteRoom = async () => {
    setIsDeleting(true);
    try {
      // api call
      await new Promise((resolve) => setTimeout(resolve, 800));
      setIsDeleteDialogOpen(false);
    } catch (error) {
      console.error("Error deleting room:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleConfirmDelete = () => {
    onConfirmDelete(room);
    setIsDeleteDialogOpen(false);
  };

  return (
    <div className="relative group">
      <Card
        className="bg-[#C2E03A] lg:w-72 lg:h-40 w-60 rounded-3xl shadow-md relative transition-all duration-300 ease-in-out hover:scale-[1.03] active:scale-95 select-none touch-none hover:shadow-xl border-0 hover:border hover:border-black overflow-hidden"
        key={`${room._id}`}
      >
        <div className="gap-2">
          {/* Edit Button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              setNewRoomName(room.name);
              setEditError("");
              setCurrentRoom(room);
              setIsEditDialogOpen(true);
            }}
            className="absolute top-2 right-10 md:opacity-0 group-hover:md:opacity-100 
            transition-opacity p-2 bg-background hover:bg-blue-50 rounded-full 
            shadow-sm z-10"
          >
            <Edit className="h-4 w-4 text-blue-600" />
          </button>
          {/* Delete Button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              setCurrentRoom(room);
              setIsDeleteDialogOpen(true);
            }}
            className="absolute top-2 right-2 md:opacity-0 group-hover:md:opacity-100 
            transition-opacity p-2 bg-background hover:bg-red-50 rounded-full 
            shadow-sm z-10"
          >
            <Trash2 className="h-4 w-4 text-red-600" />
          </button>
        </div>
        <Link to={`/${formattedName}`} onClick={() => setCurrentRoom(room)}>
          <CardHeader className=" text-xl font-semibold">
            {room.name}
          </CardHeader>
          <CardContent className="text-4xl font-medium">
            {room.type === "" ? null : (
              <img
                src={`src/assets/${room.type}.svg`}
                className="absolute object-fit top-0 right-[5%] select-none"
              />
            )}
            <div className="flex items-center">
              <BsFillLightningChargeFill />
              {energyPercentage + "%"}
            </div>
          </CardContent>
        </Link>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Room</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="roomName" className="text-right">
                Name
              </label>
              <Input
                id="roomName"
                value={newRoomName}
                onChange={(e) => {
                  setNewRoomName(e.target.value);
                  if (e.target.value) setEditError("");
                }}
                onFocus={() => setIsEditRoomFocused(true)}
                onBlur={() => setIsEditRoomFocused(false)}
                className={`col-span-3 ${
                  editError && !isEditRoomFocused ? "border-red-500" : ""
                }`}
                autoFocus
              />
            </div>
            {editError && <p className="text-sm text-red-500">{editError}</p>}
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleEditRoom} disabled={isUpdating}>
              {isUpdating ? "Saving..." : "Save changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="w-[90%] rounded-lg">
          <DialogHeader>
            <DialogTitle>{title || "Delete Room"}</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm">
              {message || "Are you sure you want to delete this room?"}
            </p>
          </div>
          <DialogFooter className="gap-2 md:gap-0">
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteRoom}
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RoomCards;
