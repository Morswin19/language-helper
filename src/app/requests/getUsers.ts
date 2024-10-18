import { User } from "../models/User";

export const getUsers = async (): Promise<User[]> => {
	const res = await fetch("http://localhost:3000/api/users", {
		next: { revalidate: 5 },
	});
	const jsonRes = await res.json();
	return jsonRes.users;
};
