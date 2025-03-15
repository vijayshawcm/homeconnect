import { create } from 'zustand';

export const userRegistrationStore = create((set) => ({
	username: null,
	setUsername: (username) => set({ username }),
	displayName: null,
	setDisplayName: (displayName) => set({ displayName }),
	email: null,
	setEmail: (email) => set({ email }),
	phoneNum: null, // ? Do we need phone num? // re: leave it for now ig
	setPhoneNum: (phone) => set({ phone }),
	password: null,
	setPassword: (password) => set({ password }),
}));
