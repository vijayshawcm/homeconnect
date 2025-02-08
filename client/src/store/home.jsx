import { create } from "zustand";

export const useHomeStore = create((set) => ({
  homes: [],
  setRooms: (homes) => ({ homes }),
  fetchHomes: async () => {
    const res = await fetch(`/server/homes`);
    const data = res.json();
    if (!data.success) return { success: false, message: data.message };
    set({ rooms: data.data });
  },
}));
