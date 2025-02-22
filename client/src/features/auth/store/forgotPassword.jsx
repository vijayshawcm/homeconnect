import { create } from 'zustand';

export const forgotPasswordStore = create((set) => ({
	email: null,
	setEmail: (email) => set({ email: email }),
}));
