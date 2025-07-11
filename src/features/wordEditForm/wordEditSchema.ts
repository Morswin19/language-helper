import * as yup from "yup";

export const wordEditSchema = yup
	.object({
		sourceWord: yup.string().required("Source word is required"),
		sourceLanguage: yup.string().required("Source language is required"),
		targetWord: yup.string().required("Translation is required"),
		targetLanguage: yup.string().required("Target language is required"),
		partOfSpeech: yup.string().required("Part of speech is required"),
		notes: yup.string(),
		numberOfRepeats: yup.number(),
		numberOfGoodRepeats: yup.number(),
		numberOfMediumRepeats: yup.number(),
		numberOfBadRepeats: yup.number(),
		goodRepeatsInRow: yup.number(),
		nextRepeatDate: yup.date().nullable().required("Choose next repeat date"),
	})
	.required();
