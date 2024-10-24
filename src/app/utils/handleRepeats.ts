import { patchRepeatedWord } from "../requests/patchRepeatedWord";
import { UpdatedWord } from "../types/addWordFormData";
import { getNextRepeatDate } from "./getNextRepeatDate";

export const handleRepeatDataInDatabase = (
	repeatStatus: string,
	numberOfRepeats: number,
	numberOfStatusRepeats: number,
	wordID: string,
) => {
	let updatedWord: UpdatedWord = {};
	if (repeatStatus === "BAD") {
		updatedWord = {
			numberOfBadRepeats: numberOfStatusRepeats + 1,
		};
	} else if (repeatStatus === "MEDIUM") {
		updatedWord = {
			numberOfMediumRepeats: numberOfStatusRepeats + 1,
		};
	} else if (repeatStatus === "GOOD") {
		updatedWord = {
			numberOfGoodRepeats: numberOfStatusRepeats + 1,
		};
	}
	updatedWord.numberOfRepeats = numberOfRepeats + 1;
	updatedWord.lastRepeatDate = new Date();

	patchRepeatedWord(wordID, updatedWord);
};
