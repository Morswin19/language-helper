import { create } from "zustand";
import { User } from "../models/User";
import { getUser } from "../services/getUser";

interface UserStore {
	storeUser: User;
	getUserInfo: (userId: string) => Promise<void>;
	setUser: (user: User) => void;
}

export const useUserStore = create<UserStore>((set, get) => ({
	storeUser: {
		_id: "",
		username: "",
		email: "",
		password: "",
		lastLogin: new Date(),
		streak: 0,
	} as User,
	getUserInfo: async (userId: string) => {
		const response = await getUser(userId);
		set({ storeUser: response });
	},
	setUser: (storeUser) => set({ storeUser }),
}));
