import { Word } from "../models/Word";
import { UpdatedWord } from "../types/addWordFormData";

export const patchWord = async (
	wordID: string,
	updatedData: UpdatedWord,
): Promise<{ success: boolean; word?: Word; error?: string }> => {
	const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

	try {
		const response = await fetch(`${baseUrl}/api/word/${wordID}`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(updatedData),
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const data = await response.json();
		console.log("Word updated successfully:");
		return { success: true, word: data.word };
	} catch (error) {
		return {
			success: false,
			error: error instanceof Error ? error.message : "An error occurred while updating the word",
		};
	}
};
