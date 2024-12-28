import { User } from "../models/User";

export const getUsers = async (): Promise<User[]> => {
	const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
	const res = await fetch(`${baseUrl}/api/users`, {
		// next: { revalidate: 5 },
		cache: "no-store",
	});
	const jsonRes = await res.json();
	return jsonRes.users;
};
