import { patchRepeatedWord } from "../requests/patchRepeatedWord";

export const handleRepeatDataInDatabase = (
	repeatStatus: string,
	numberOfRepeats: number,
	numberOfStatusRepeats: number,
	wordID: string,
) => {
	let updatedWord = {};
	if (repeatStatus === "BAD") {
		updatedWord = {
			numberOfRepeats: numberOfRepeats + 1,
			numberOfBadRepeats: numberOfStatusRepeats + 1,
			lastRepeatDate: new Date(),
		};
	} else if (repeatStatus === "MEDIUM") {
		updatedWord = {
			numberOfRepeats: numberOfRepeats + 1,
			numberOfMediumRepeats: numberOfStatusRepeats + 1,
			lastRepeatDate: new Date(),
		};
	} else if (repeatStatus === "GOOD") {
		updatedWord = {
			numberOfRepeats: numberOfRepeats + 1,
			numberOfGoodRepeats: numberOfStatusRepeats + 1,
			lastRepeatDate: new Date(),
		};
	}
	patchRepeatedWord(wordID, updatedWord);
};
