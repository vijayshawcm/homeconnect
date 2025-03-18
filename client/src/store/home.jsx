import { create } from "zustand";

export const useHomeStore = create((set, get) => ({
  homes: [],
  currentHome: null,
  isLoading: false,
  setCurrentHome: async (id) => {
    set({ isLoading: false });
    const res = await fetch(`/server/homes/${id}`);
    const data = await res.json();
    if (!data.success) {
      return { success: false, message: data.message };
    }
    set({ currentHome: data.data });
    set({ isLoading: true });
  },
  createHome: async (homeData) => {
    set({ isLoading: false });
    try {
      const homeRes = await fetch("/server/homes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: homeData.homeName,
          username: homeData.username,
        }),
      });
      const data = await homeRes.json();
      if (!data.success) {
        set({ isLoading: false });
        return { success: false, message: data.message };
      }
      set({
        currentHome: data.data,
        isLoading: true,
      });
      console.log(data.data);
      return {
        success: true,
        message: "Home created successfully",
        data: data.data,
      };
    } catch (error) {
      console.error("Failed to create home:", error);
      return { success: false, message: "Failed to create home" };
    }
  },
  updateHome: async () => {
    const { currentHome } = get();
    if (!currentHome) return;

    try {
      const res = await fetch(`/server/homes/${currentHome._id}`);
      const data = await res.json();
      if (data.success) {
        set({ currentHome: data.data });
      }
    } catch (error) {
      console.error("Failed to update home data:", error);
    }
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
