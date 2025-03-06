import { create } from "zustand";

export const useRoomStore = create((set) => ({
  currentRoom: null,
  setCurrentRoom: async (room) => {
    set({ currentRoom: room });
  }, 
}));
