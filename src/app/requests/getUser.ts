import { User } from "../models/User";

export const getUser = async (userId: string): Promise<User> => {
	const res = await fetch(`http://localhost:3000/api/users/${userId}`, {
		next: { revalidate: 5 },
	});
	const jsonRes = await res.json();
	const user: User = await jsonRes.user;

	return user;
};
