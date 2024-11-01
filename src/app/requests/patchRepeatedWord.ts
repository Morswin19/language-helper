import { UpdatedWord } from "../types/addWordFormData";

export const patchRepeatedWord = async (wordID: string, updatedData: UpdatedWord) => {
	const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

	const updatedWord = await fetch(`${baseUrl}/api/word/${wordID}`, {
		method: "PATCH",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(updatedData),
	});
};
