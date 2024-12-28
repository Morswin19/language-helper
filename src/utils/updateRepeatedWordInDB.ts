import { Word } from "../models/Word";
import { patchRepeatedWord } from "@/services/patchRepeatedWord";
import { UpdatedWord } from "../types/addWordFormData";
import { getNextRepeatDate } from "./getNextRepeatDate";

export const updateRepeatedWordInDB = async (repeatStatus: string, updatedWord: Word) => {
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

	const patchWord = await patchRepeatedWord(updatedWord._id, newWord);

	if (patchWord.success) {
		console.log("success");
	}

	console.log(patchWord);
	return;
};
