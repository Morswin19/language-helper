import { create } from "zustand";
import { Word } from "../models/Word";
import { getUserWords } from "../services/getUserWords";

interface WordStore {
	storeWords: Word[];
	setStoreWords: (words: Word[]) => void;
	wordsToRepeat: Word[];
	setWordsToRepeat: (words: Word[]) => void;
	getWords: (userId: string) => Promise<void>;
	getWord: (wordId: string) => Word;
	updateRepeatedWord: (updatedWord: Word) => Promise<void>;
	updateEditedWord: (updatedWord: Word) => Promise<void>;
	addWord: (word: Word) => void;
	clearWords: () => void;
}

export const useWordStore = create<WordStore>((set, get) => ({
	storeWords: [],
	wordsToRepeat: [],
	setStoreWords: (storeWords) => set({ storeWords }),
	setWordsToRepeat: (wordsToRepeat) => set({ wordsToRepeat }),
	getWords: async (userId: string) => {
		const response = await getUserWords(userId);
		const repeatBorderDate = new Date();
		repeatBorderDate.setDate(repeatBorderDate.getDate() + 1);
		repeatBorderDate.setHours(0, 0, 0, 0);
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
	updateRepeatedWord: async (word: Word) => {
		set((state) => ({
			storeWords: state.storeWords.map((storeWord) => {
				if (storeWord._id === word._id && word) {
					return word;
				}
				return storeWord;
			}),
			wordsToRepeat: state.wordsToRepeat.filter((wordToRepeat) => wordToRepeat._id !== word._id),
		}));
	},
	updateEditedWord: async (updatedWord: Word) => {
		// Update the store with the response from backend
		set((state) => ({
			// update store words if the word exist there
			storeWords: state.storeWords.map((storeWord) => {
				if (storeWord._id === updatedWord._id) {
					return updatedWord;
				}
				return storeWord;
			}),
			// Also update wordsToRepeat if the word exists there
			wordsToRepeat: state.wordsToRepeat.map((repeatWord) => {
				if (repeatWord._id === updatedWord._id) {
					return updatedWord;
				}
				return repeatWord;
			}),
		}));
	},
	addWord: async (word) => {
		set((state) => ({
			storeWords: [...state.storeWords, word],
		}));
	},
	clearWords: () => set({ storeWords: [], wordsToRepeat: [] }),
}));
