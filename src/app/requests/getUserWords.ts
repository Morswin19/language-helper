import { Word } from "../models/Word";

export const getUserWords = async (userId: string): Promise<Word[]> => {
	const res = await fetch(`http://localhost:3000/api/words/${userId}`, {
		next: { revalidate: 5 },
	});
	const jsonRes = await res.json();
	return jsonRes.words;
};
