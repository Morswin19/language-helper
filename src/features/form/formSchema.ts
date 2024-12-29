import * as yup from "yup";

export const wordFormSchema = yup
	.object({
		userId: yup.string(),
		partOfSpeech: yup.string(),
		sourceLanguage: yup.string(),
		targetLanguage: yup.string(),
		// TODO add texts from text.ts
		sourceWord: yup.string().required("Wpisz słowo"),
		targetWord: yup.string().required("Wpisz słowo"),
		notes: yup.string(),
	})
	.required();
