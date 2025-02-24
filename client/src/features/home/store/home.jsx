import { create } from "zustand";

export const useHomeStore = create((set) => ({
  homes: [],
  currentHome: null,
  setCurrentHome: async (id) => {
    const res = await fetch(`/server/homes/${id}`);
    const data = await res.json();
    if (!data.success) {
      return { success: false, message: data.message };
    }
    set({ currentHome: data.data });
  },
  fetchHomeByUserId: async (id) => {
    const res = await fetch(`/server/homes/forUser/${id}`);
    const data = await res.json();
    if (!data.success) {
      return { success: false, message: data.message };
    }
    set({ homes: data.data });
  },
  addDweller: async (userId) => {
    const res = await fetch(`server/homes/${currentHome._id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId }),
    });
    const data = await res.json();
    if (!data.success) return { success: false, message: data.message };
    set((state) => ({
      homes: state.homes.map((home) =>
        home._id === currentHome._id ? data.data : home
      ),
      currentHome: state.currentHome ? data.data : state.currentHome,
    }));
    return { success: true, message: "Dweller Added" };
  },
}));
