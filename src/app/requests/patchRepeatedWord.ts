import { UpdatedWord } from "../types/addWordFormData";

export const patchRepeatedWord = async (wordID: string, updatedData: UpdatedWord) => {
	const updatedWord = await fetch(`http://localhost:3000/api/word/${wordID}`, {
		method: "PATCH",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(updatedData),
	});
};
