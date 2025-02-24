import { create } from "zustand";

export const userRegistrationStore = create((set)=>({
  username: null,
  setUsername: (name) => set({ username: name }),
  email: null,
  setEmail: (email) => set({ email: email }),
  phoneNum: null, // ? Do we need phone num?
  setPhoneNum: (num) => set({ phoneNum: num }),
  password: null,
  setPassword: (pw) => set({ password: pw }),
}))