import { create } from "zustand";
import { User } from "../models/User";
import { getUser } from "../services/getUser";

interface UserStore {
	storeUserId: string;
	// getUserInfo: (userId: string) => Promise<void>;
	setUser: (userId: string) => void;
}

export const useUserStore = create<UserStore>((set, get) => ({
	storeUserId: "",
	// getUserInfo: async (userId: string) => {
	// 	const response = await getUser(userId);
	// 	set({ storeUserId: response });
	// },
	setUser: (storeUserId) => set({ storeUserId }),
}));
