import { create } from "zustand";
import { Word } from "../models/Word";
import { getNextRepeatDate } from "../utils/getNextRepeatDate";
import { getUserWords } from "../services/getUserWords";
import { UpdatedWord } from "@/types/addWordFormData";
import { patchRepeatedWord } from "@/services/patchRepeatedWord";

interface WordStore {
	storeWords: Word[];
	setStoreWords: (words: Word[]) => void;
	wordsToRepeat: Word[];
	getWords: (userId: string) => Promise<void>;
	getWord: (wordId: string) => Word;
	updateWord: (repeatStatus: string, updatedWord: Word) => Promise<void>;
	addWord: (word: Word) => void;
}

export const useWordStore = create<WordStore>((set, get) => ({
	storeWords: [],
	wordsToRepeat: [],
	setStoreWords: (storeWords) => set({ storeWords }),
	getWords: async (userId: string) => {
		const response = await getUserWords(userId);
		const repeatBorderDate = new Date();
		repeatBorderDate.setDate(repeatBorderDate.getDate() + 1);
		repeatBorderDate.setHours(2, 0, 0, 0);
		set({ storeWords: response });
		const state = get();
		if (!state.wordsToRepeat.length) {
			set({
				wordsToRepeat: [...response]
					.filter((word) => new Date(word.nextRepeatDate) < repeatBorderDate)
					.sort(() => Math.random() - 0.5),
			});
		}
	},
	getWord: (wordId) => get().storeWords.filter((word) => word._id === wordId)[0],
	updateWord: async (repeatStatus: string, updatedWord: Word) => {
		const newWord: UpdatedWord = {
			lastRepeatDate: new Date(),
			numberOfRepeats: updatedWord.numberOfRepeats + 1,
			goodRepeatsInRow:
				repeatStatus === "GOOD" ? updatedWord.goodRepeatsInRow + 1 : updatedWord.goodRepeatsInRow,
			numberOfBadRepeats:
				repeatStatus === "BAD"
					? updatedWord.numberOfBadRepeats + 1
					: updatedWord.numberOfBadRepeats,
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
				repeatStatus === "BAD"
					? updatedWord.numberOfBadRepeats + 1
					: updatedWord.numberOfBadRepeats,
			),
		};

		const { success, word, error } = await patchRepeatedWord(updatedWord._id, newWord);

		set((state) => ({
			storeWords: state.storeWords.map((storeWord) => {
				if (storeWord._id === updatedWord._id && word) {
					return word;
				}
				return storeWord;
			}),
			wordsToRepeat: state.wordsToRepeat.slice(1),
		}));
	},
	addWord: (word) => {
		set((state) => ({
			storeWords: [...state.storeWords, word],
		}));
	},
}));
