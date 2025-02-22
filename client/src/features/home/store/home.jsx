import { create } from "zustand";

export const useHomeStore = create((set)=>({
  homes: [],
  setHome: (homes) => ({homes}),
  
}))