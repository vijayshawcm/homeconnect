import { create } from "zustand";

export const userAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,

  // Fetch user session
  fetchLogin: async () => {
    const response = await fetch("server/auth/loginStatus", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    if (response.ok) {
      const userInfo = await response.json();
      set({ user: userInfo, isAuthenticated: true });
      console.log("User is currently logged in");
    } else {
      set({ user: null, isAuthenticated: false });
    }
  },

  logoutUser: async () => {
    const response = await fetch("server/auth/logout", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    set({ user: null, isAuthenticated: false });
  }

}));

// Fetch user login on app load
await userAuthStore.getState().fetchLogin();
