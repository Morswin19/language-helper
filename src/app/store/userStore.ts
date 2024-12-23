import { create } from "zustand";
import { User } from "../models/User";

interface UserStore {
	storeUser: User;
	setUser: (user: User) => void;
}

export const useUserStore = create<UserStore>((set) => ({
	storeUser: {
		_id: "",
		username: "",
		email: "",
		password: "",
		lastLogin: new Date(),
		streak: 0,
	} as User,
	setUser: (storeUser) => set({ storeUser }),
}));
