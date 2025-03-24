import { useEffect } from "react";
import { create } from "zustand";
import { userAuthStore } from "./userAuthStore";
import { useHomeStore } from "./useHomeStore"; // Import the home store

export const userPermsStore = create((set) => ({
  perms: [],
  isOwner: true,
  setPerms: (perms) => set({ perms }),
}));

export const usePermissions = () => {
  const currentHome = useHomeStore((state) => state.currentHome);
  const currentUser = userAuthStore.getState().user;

  useEffect(() => {
    if (currentHome && currentUser) {
      const userDweller = currentHome.dwellers.find(
        (dweller) => dweller.user.username === currentUser.username
      );

      const isOwner =
        !userDweller && currentHome.owner.username === currentUser.username;
      const perms = userDweller ? userDweller.accessLevel || {} : {};

      userPermsStore.getState().setPerms(perms, isOwner);
    }
  }, [currentHome, currentUser]);

  return userPermsStore((state) => ({
    perms: state.perms,
    isOwner: state.isOwner,
  }));
};