import { Word } from "../models/Word";

export const getUserWords = async (userId: string): Promise<Word[]> => {
	const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
	const res = await fetch(`${baseUrl}/api/words/${userId}`, {
		next: { revalidate: 5 },
	});
	const jsonRes = await res.json();
	return jsonRes.words;
};
