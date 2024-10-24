import { create } from "zustand";
import { Word } from "../models/Word";

interface WordStore {
	storeWords: Word[];
	setStoreWords: (words: Word[]) => void;
	// addWord: (word: WordRow) => void;
	// updateWord: (wordId: string, date: Date) => void;
	// deleteWord: (wordId: string) => void;
	// calculateWordStats: (wordId: string) => {
}

export const useWordStore = create<WordStore>((set) => ({
	storeWords: [],
	setStoreWords: (storeWords) => set({ storeWords }),
}));
