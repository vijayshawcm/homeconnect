import { create } from "zustand";
import { useHomeStore } from "./home";
import { persist } from "zustand/middleware";
import { toast } from "sonner";

export const useRoomStore = create(
  persist((set, get) => ({
    currentRoom: null,
    isLoading: true,
    currentAppliance: null,
    setCurrentApplianceStore: async (appliance) => {
      set({ currentAppliance: appliance });
    },
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
    renameRoom: async (body) => {
      toast.info("Renaming room...");
      try {
        const res = await fetch(`/server/rooms/${body.room.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        const data = await res.json();
        if (data.success) {
          const homeStore = useHomeStore.getState();
          await homeStore.updateHome();
          toast.success("Room renamed successfully.");
        } else {
          toast.error("Failed to rename room, " + data.message);
        }
      } catch (error) {
        toast.error("Failed to rename room.");
        console.error("Failed to rename room:", error);
      }
    },
    deleteRoom: async (body) => {
      toast.info("Deleting room...");
      try {
        const res = await fetch(`/server/rooms/${body.room.id}`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        const data = await res.json();
        if (data.success) {
          const homeStore = useHomeStore.getState();
          await homeStore.updateHome();
          toast.success("Room deleted successfully.");
        } else {
          toast.error("Failed to deleted room, " + data.message);
        }
      } catch (error) {
        toast.error("Failed to delete room.");
        console.error("Failed to delete room:", error);
      }
    },
    addAppliance: async (body) => {
      const { currentRoom, updateRoom } = get();
      if (!currentRoom) return;
      toast.info("Adding appliance...");
      try {
        const res = await fetch(`/server/appliances/${currentRoom._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        const data = await res.json();
        if (data.success) {
          await updateRoom();
          // Also update home if needed
          const homeStore = useHomeStore.getState();
          if (homeStore.currentHome?._id === data.data.home) {
            await homeStore.updateHome();
          }

          toast.success("Appliance added successfully.");
        } else {
          toast.error("Failed to add appliance, " + data.message);
        }
      } catch (error) {
        toast.error("Failed to add appliance.");
        console.error("Failed to add appliance:", error);
      }
    },
    removeAppliance: async (id, requester) => {
      const { updateRoom } = get();
      toast.info("Deleting appliance...");
      const res = await fetch(`/server/appliances/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ requester }),
      });

      if (res.ok) {
        toast.success("Appliance deleted successfully.");
      } else {
        toast.error(
          "Something went wrong while trying to delete appliance, please try again"
        );
      }

      await updateRoom();

      return res;
    },
    turnOnAll: async (body) => {
      const { currentRoom, updateRoom } = get();
      if (!currentRoom) return;
      console.log(body.type);

      toast.info("Turning on appliances...");
      try {
        // Get all appliances of the specified type
        const appliancesToUpdate = currentRoom.appliances.filter(
          (appliance) => appliance.applianceType === body.type
        );

        if (appliancesToUpdate.length === 0) return;
        await Promise.all(
          appliancesToUpdate.map(async (appliance) => {
            await fetch(`/server/appliances/turnOn/${appliance._id}`, {
              method: "PATCH",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ requester: body.requester }),
            });
          })
        );

        toast.success("Appliances turned on successfully");
        // Refresh the room data after updating
        await updateRoom();
      } catch (error) {
        toast.error("Failed to turn on appliances.");
        console.error(`Failed to turn on all ${body.type}s:`, error);
      }
    },
    turnOffAll: async (body) => {
      const { currentRoom, updateRoom } = get();
      if (!currentRoom) return;

      toast.info("Turning off appliances...");
      try {
        // Get all appliances of the specified type
        const appliancesToUpdate = currentRoom.appliances.filter(
          (appliance) => appliance.applianceType === body.type
        );

        if (appliancesToUpdate.length === 0) return;
        await Promise.all(
          appliancesToUpdate.map(async (appliance) => {
            await fetch(`/server/appliances/turnOff/${appliance._id}`, {
              method: "PATCH",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ requester: body.requester }),
            });
          })
        );
        toast.success("Appliances turned off successfully.");
        // Refresh the room data after updating
        await updateRoom();
      } catch (error) {
        toast.error("Failed to turn off appliances.");
        console.error(`Failed to turn off all ${body.type}s:`, error);
      }
    },
    turnOnAppliance: async (body) => {
      try {
        const { updateRoom } = get();
        toast.info("Turning on appliance...");
        const appliance = await fetch(`/server/appliances/turnOn/${body.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ requester: body.requester }),
        });

        const res = await appliance.json();

        if (res.success) {
          toast.info("Appliance turned on successfully.");
        } else {
          toast.error("Appliance could not be turned on, " + res.message);
        }

        await updateRoom();
      } catch (error) {
        console.error(`Failed to turn on`, error);
      }
    },
    turnOffAppliance: async (body) => {
      try {
        const { updateRoom } = get();
        toast.info("Turning off appliance...");
        const appliance = await fetch(`/server/appliances/turnOff/${body.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ requester: body.requester }),
        });

        const res = await appliance.json();

        if (res.success) {
          toast.info("Appliance turned off successfully.");
        } else {
          toast.error("Appliance could not be turned off, " + res.message);
        }

        await updateRoom();
      } catch (error) {
        console.error(`Failed to turn off`, error);
      }
    },
    modifyAppliance: async (id, updates) => {
      try {
        const { updateRoom } = get();

        toast.info("Saving appliance modifications...");
        // Send the updates to the server
        const response = await fetch(`/server/appliances/adjust/${id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updates),
        });

        if (!response.ok) {
          toast.error("Failed saving appliance modification.");
          throw new Error("Failed to update appliance");
        }

        const data = await response.json();
        toast.success("Appliance modifications saved successfully.");
        console.log("Appliance updated:", data);

        // Refresh the room data after updating
        await updateRoom();
      } catch (error) {
        console.error("Failed to modify appliance:", error);
      }
    },
    renameAppliance: async (id, updates) => {
      try {
        const { updateRoom } = get();

        // Send the updates to the server
        const response = await fetch(`/server/appliances/rename/${id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updates),
        });

        if (!response.ok) {
          throw new Error("Failed to update appliance");
        }

        const data = await response.json();
        console.log("Appliance renamed:", data);

        // Refresh the room data after updating
        await updateRoom();
        return data;
      } catch (error) {
        console.error("Failed to modify appliance:", error);
      }
    },
    createSchedule: async (id, schedule, username) => {
      try {
        const { updateRoom } = get();

        toast.info("Creating appliance schedule...");
        // Send the updates to the server
        const response = await fetch(`/server/appliances/schedules/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            requester: username,
            schedule
          }),
        });

        if (!response.ok) {
          toast.error("Failed while creating appliance schedule.");
          throw new Error("Failed to schedule appliance");
        }

        const data = await response.json();
        toast.success("Appliance schedule created successfully.");
        console.log("Appliance updated:", data);

        // Refresh the room data after updating
        await updateRoom();
      } catch (error) {
        console.error("Failed to modify appliance:", error);
      }
    },
    getCurrentUsage: async (type) => {
      const { currentRoom } = get();
      if (!currentRoom) return;

      try {
        const res = await fetch(
          `/server/energy/totalTypeCurrentUsage/${currentRoom._id}/${type}`
        );
        const data = await res.json();
        return data.data;
      } catch (error) {
        console.error(`Failed to turn on all ${type}s:`, error);
      }
    },
  })),
  {
    name: "room-storage", // Unique name for localStorage key
    getStorage: () => localStorage, // Use localStorage as the storage mechanism
  }
);
