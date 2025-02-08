import { create } from "zustand";

export const useRoomStore = create((set) => ({
  rooms: [],
  setRooms: (rooms) => ({ rooms }),
  fetchRoomsByHome: async (id) => {
    const res = await fetch(`/server/rooms/${id}`);
    const data = res.json();
    if (!data.success) return { success: false, message: data.message };
    set({ rooms: data.data });
  },
}));
