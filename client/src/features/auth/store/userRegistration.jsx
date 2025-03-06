import { create } from 'zustand';

export const userRegistrationStore = create((set) => ({
	username: null,
	setUsername: (username) => set({ username }),
	fullName: null,
	setFullName: (fullName) => set({ fullName }),
	email: null,
	setEmail: (email) => set({ email }),
	phoneNum: null, // ? Do we need phone num? // re: leave it for now ig
	setPhoneNum: (phone) => set({ phone }),
	password: null,
	setPassword: (password) => set({ password }),
}));
