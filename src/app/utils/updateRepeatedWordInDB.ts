import { Word } from "../models/Word";
import { patchRepeatedWord } from "../requests/patchRepeatedWord";
import { UpdatedWord } from "../types/addWordFormData";
import { getNextRepeatDate } from "./getNextRepeatDate";

export const updateRepeatedWordInDB = (repeatStatus: string, updatedWord: Word) => {
	let newWord: UpdatedWord = {};
	newWord.lastRepeatDate = new Date();
	newWord.numberOfRepeats = updatedWord.numberOfRepeats + 1;
	newWord.goodRepeatsInRow =
		repeatStatus === "GOOD" ? updatedWord.goodRepeatsInRow + 1 : updatedWord.goodRepeatsInRow;
	newWord.numberOfBadRepeats =
		repeatStatus === "BAD" ? updatedWord.numberOfBadRepeats + 1 : updatedWord.numberOfBadRepeats;
	newWord.numberOfMediumRepeats =
		repeatStatus === "MEDIUM"
			? updatedWord.numberOfMediumRepeats + 1
			: updatedWord.numberOfMediumRepeats;
	newWord.numberOfGoodRepeats =
		repeatStatus === "GOOD" ? updatedWord.numberOfGoodRepeats + 1 : updatedWord.numberOfGoodRepeats;
	(newWord.nextRepeatDate = getNextRepeatDate(
		newWord.numberOfRepeats,
		newWord.numberOfGoodRepeats,
		newWord.numberOfBadRepeats,
	)),
		patchRepeatedWord(updatedWord._id, newWord);
	return;
};
