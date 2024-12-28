import { create } from "zustand";
import { Word } from "../models/Word";
import { getNextRepeatDate } from "../utils/getNextRepeatDate";
import { getUserWords } from "../requests/getUserWords";

interface WordStore {
	storeWords: Word[];
	setStoreWords: (words: Word[]) => void;
	getWords: (userId: string) => Promise<void>;
	getWord: (wordId: string) => Word;
	updateWord: (repeatStatus: string, updatedWord: Word) => void;
	addWord: (word: Word) => void;
}

export const useWordStore = create<WordStore>((set, get) => ({
	storeWords: [],
	setStoreWords: (storeWords) => set({ storeWords }),
	getWords: async (userId: string) => {
		const response = await getUserWords(userId);
		console.log(response);
		set({ storeWords: response });
	},
	getWord: (wordId) => get().storeWords.filter((word) => word._id === wordId)[0],
	updateWord: (repeatStatus: string, updatedWord: Word) => {
		set((state) => ({
			storeWords: state.storeWords.map((word) => {
				if (word._id === updatedWord._id) {
					word.lastRepeatDate = new Date();
					word.numberOfRepeats += 1;
					word.goodRepeatsInRow = repeatStatus === "GOOD" ? word.goodRepeatsInRow + 1 : 0;
					word.numberOfBadRepeats =
						repeatStatus === "BAD" ? word.numberOfBadRepeats + 1 : word.numberOfBadRepeats;
					word.numberOfMediumRepeats =
						repeatStatus === "MEDIUM" ? word.numberOfMediumRepeats + 1 : word.numberOfMediumRepeats;
					word.numberOfGoodRepeats =
						repeatStatus === "GOOD" ? word.numberOfGoodRepeats + 1 : word.numberOfGoodRepeats;
					word.nextRepeatDate = getNextRepeatDate(
						word.numberOfRepeats,
						word.numberOfGoodRepeats,
						word.numberOfBadRepeats,
					);
				}
				return word;
			}),
		}));
	},
	addWord: (word) => {
		set((state) => ({
			storeWords: [...state.storeWords, word],
		}));
	},
}));
