import mongoose, { Document, Schema } from "mongoose";

export interface Word extends Document {
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
	lastRepeatDate: Date;
	nextRepeatDate: Date;
	notes: string;
}

const partOfSpeechValues = [
	"noun",
	"pronoun",
	"verb",
	"adjective",
	"adverb",
	"preposition",
	"conjunction",
] as const;

export const languages = ["PL", "EN", "ES", "CAT"] as const;

const wordSchema: Schema = new mongoose.Schema(
	{
		userId: {
			type: String,
			required: true,
		},
		sourceLanguage: {
			type: String,
			enum: languages,
			required: true,
		},
		targetLanguage: {
			type: String,
			enum: languages,
			required: true,
		},
		sourceWord: {
			type: String,
			required: true,
		},
		targetWord: {
			type: String,
			required: true,
		},
		partOfSpeech: {
			type: String,
			enum: partOfSpeechValues,
		},
		numberOfRepeats: {
			type: Number,
			default: 0,
		},
		numberOfBadRepeats: {
			type: Number,
			required: true,
			default: 0,
		},
		numberOfMediumRepeats: {
			type: Number,
			required: true,
			default: 0,
		},
		numberOfGoodRepeats: {
			type: Number,
			required: true,
			default: 0,
		},
		lastRepeatDate: {
			type: Date,
			default: Date.now,
		},
		nextRepeatDate: {
			type: Date,
		},
		notes: {
			type: String,
		},
	},
	{
		timestamps: true,
	},
);

const Word = mongoose.models.Word || mongoose.model<Word>("Word", wordSchema);

export default Word;
