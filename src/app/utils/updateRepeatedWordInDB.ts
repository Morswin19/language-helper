import { Word } from "../models/Word";
import { patchRepeatedWord } from "../requests/patchRepeatedWord";
import { UpdatedWord } from "../types/addWordFormData";
import { getNextRepeatDate } from "./getNextRepeatDate";

export const updateRepeatedWordInDB = (repeatStatus: string, updatedWord: Word) => {
	const newWord: UpdatedWord = {
		lastRepeatDate: new Date(),
		numberOfRepeats: updatedWord.numberOfRepeats + 1,
		goodRepeatsInRow:
			repeatStatus === "GOOD" ? updatedWord.goodRepeatsInRow + 1 : updatedWord.goodRepeatsInRow,
		numberOfBadRepeats:
			repeatStatus === "BAD" ? updatedWord.numberOfBadRepeats + 1 : updatedWord.numberOfBadRepeats,
		numberOfMediumRepeats:
			repeatStatus === "MEDIUM"
				? updatedWord.numberOfMediumRepeats + 1
				: updatedWord.numberOfMediumRepeats,
		numberOfGoodRepeats:
			repeatStatus === "GOOD"
				? updatedWord.numberOfGoodRepeats + 1
				: updatedWord.numberOfGoodRepeats,
		nextRepeatDate: getNextRepeatDate(
			updatedWord.numberOfRepeats + 1,
			repeatStatus === "GOOD"
				? updatedWord.numberOfGoodRepeats + 1
				: updatedWord.numberOfGoodRepeats,
			repeatStatus === "BAD" ? updatedWord.numberOfBadRepeats + 1 : updatedWord.numberOfBadRepeats,
		),
	};

	patchRepeatedWord(updatedWord._id, newWord);
	return;
};
