export type WordFormData = {
	userId?: string | undefined;
	partOfSpeech?: string | undefined;
	sourceLanguage?: string | undefined;
	targetLanguage?: string | undefined;
	notes?: string | undefined;
	sourceWord: string;
	targetWord: string;
};

export type WordRow = {
	id: string;
	sourceWord: string;
	targetWord: string;
	sourceLanguage: string;
	targetLanguage: string;
	partOfSpeech: string;
	numberOfRepeats: number;
	numberOfBadRepeats: number;
	numberOfMediumRepeats: number;
	numberOfGoodRepeats: number;
	streak: number;
	percentOfGoodRepeats: number;
	lastRepeatDate: Date | null;
	nextRepeatDate: Date;
	notes: string;
};

export interface WordData {
	_id: string;
	userId: string;
	sourceLanguage: string;
	targetLanguage: string;
	sourceWord: string;
	targetWord: string;
	partOfSpeech: string;
	numberOfRepeats: number;
	numberOfBadRepeats: number;
	numberOfMediumRepeats: number;
	numberOfGoodRepeats: number;
	goodRepeatsInRow: number;
	lastRepeatDate: Date | null;
	nextRepeatDate: Date;
	notes: string;
}

export type UpdatedWord = {
	sourceWord?: string;
	targetWord?: string;
	sourceLanguage?: string;
	targetLanguage?: string;
	partOfSpeech?: string;
	numberOfRepeats?: number;
	numberOfBadRepeats?: number;
	numberOfMediumRepeats?: number;
	numberOfGoodRepeats?: number;
	goodRepeatsInRow?: number;
	lastRepeatDate?: Date | null;
	nextRepeatDate?: Date;
	notes?: string;
};
