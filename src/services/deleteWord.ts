export const deleteWord = async (wordID: string) => {
	const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

	await fetch(`${baseUrl}/api/word/${wordID}`, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
		},
	});
};
