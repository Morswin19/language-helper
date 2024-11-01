import { User } from "../models/User";

export const getUser = async (userId: string): Promise<User> => {
	const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
	const res = await fetch(`${baseUrl}/api/users/${userId}`, {
		next: { revalidate: 5 },
	});
	const jsonRes = await res.json();
	const user: User = await jsonRes.user;

	return user;
};
