import { WordFormData } from "../types/addWordFormData";

export const postWord = async (
	wordData: WordFormData,
): Promise<{ success: boolean; data?: any; error?: string }> => {
	const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

	try {
		const response = await fetch(`${baseUrl}/api/words`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(wordData),
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const data = await response.json();
		return { success: true, data };
	} catch (error) {
		console.error("Error posting word:", error);
		return {
			success: false,
			error: error instanceof Error ? error.message : "An error occurred while posting the word",
		};
	}
};
