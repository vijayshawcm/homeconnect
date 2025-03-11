import { create } from "zustand";
import { useHomeStore } from "./home";

export const useRoomStore = create((set, get) => ({
  currentRoom: null,
  setCurrentRoom: async (room) => {
    set({ currentRoom: room });
  },
  updateRoom: async () => {
    const { currentRoom } = get();
    if (!currentRoom) return;
    try {
      const res = await fetch(`/server/rooms/roomId/${currentRoom._id}`);
      const data = await res.json();
      if (data.success) {
        set({ currentRoom: data.data });
        // Also update home if needed
        const homeStore = useHomeStore.getState();
        if (homeStore.currentHome?._id === data.data.home) {
          await homeStore.updateHome();
        }
      }
    } catch (error) {
      console.error("Failed to update room data:", error);
    }
  },
  turnOnAll: async (type) => {
    const { currentRoom, updateRoom } = get();
    if (!currentRoom) return;

    try {
      // Get all appliances of the specified type
      const appliancesToUpdate = currentRoom.appliances.filter(
        (appliance) => appliance.applianceType === type
      );

      if (appliancesToUpdate.length === 0) return;
      await Promise.all(
        appliancesToUpdate.map(async (appliance) => {
          await fetch(`/server/appliances/turnOn/${appliance._id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
          });
        })
      );
      // Refresh the room data after updating
      await updateRoom();
    } catch (error) {
      console.error(`Failed to turn on all ${type}s:`, error);
    }
  },
  turnOffAll: async (type) => {
    const { currentRoom, updateRoom } = get();
    if (!currentRoom) return;

    try {
      // Get all appliances of the specified type
      const appliancesToUpdate = currentRoom.appliances.filter(
        (appliance) => appliance.applianceType === type
      );

      if (appliancesToUpdate.length === 0) return;
      await Promise.all(
        appliancesToUpdate.map(async (appliance) => {
          await fetch(`/server/appliances/turnOff/${appliance._id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
          });
        })
      );
      // Refresh the room data after updating
      await updateRoom();
    } catch (error) {
      console.error(`Failed to turn on all ${type}s:`, error);
    }
  },
}));
