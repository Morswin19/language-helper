import { Word } from "@/models/Word";
import { UpdatedWord } from "@/types/addWordFormData";
import { getNextRepeatDate } from "@/utils/getNextRepeatDate";

export const getWordAfterRepeat = (repeatStatus: string, updatedWord: Word) => {
	const newWord: UpdatedWord = {
		lastRepeatDate: new Date(),
		numberOfRepeats: updatedWord.numberOfRepeats + 1,
		goodRepeatsInRow:
			repeatStatus === "GOOD"
				? updatedWord.goodRepeatsInRow + 1
				: (updatedWord.goodRepeatsInRow = 0),
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
			repeatStatus === "GOOD" ? updatedWord.goodRepeatsInRow + 1 : 0,
		),
	};

	return newWord;
};
