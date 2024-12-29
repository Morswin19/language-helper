"use client";

import {
	Box,
	Select,
	Radio,
	RadioGroup,
	FormControlLabel,
	MenuItem,
	TextField,
	TextareaAutosize,
	Button,
	Typography,
} from "@mui/material";

import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { postWord } from "@/services/postWord";
import { WordFormData } from "@/types/addWordFormData";
import { wordFormSchema } from "@/features/form/formSchema";
import { useWordStore } from "@/store/wordStore";

import { texts } from "@/constants/texts";

export default function Form({ userId }: { userId: string }) {
	const {
		control,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm({
		resolver: yupResolver(wordFormSchema),
		defaultValues: {
			userId: `${userId}`,
			sourceLanguage: "PL",
			targetLanguage: "EN",
			partOfSpeech: "noun",
			sourceWord: "",
			targetWord: "",
			notes: "",
		},
	});

	const { addWord } = useWordStore();

	const onSubmit = async (data: WordFormData) => {
		const result = await postWord(data);
		if (result.success) {
			console.log("Word posted successfully:");
			const newWord = result.data;
			const nextDate = new Date();
			nextDate.setDate(nextDate.getDate() + 1);
			newWord.word.nextRepeatDate = nextDate;
			newWord.word.lastRepeatDate = new Date();
			addWord(newWord.word);
			reset({
				sourceWord: "",
				targetWord: "",
				notes: "",
				userId: `${userId}`,
			});
		} else {
			console.error("Failed to post word:", result.error);
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Box className="flex flex-col gap-4">
				<Box>
					<Typography>{texts.source}</Typography>
					<Controller
						name="sourceLanguage"
						control={control}
						render={({ field }) => (
							<RadioGroup {...field} row>
								<FormControlLabel value="PL" control={<Radio />} label="PL" />
								<FormControlLabel value="EN" control={<Radio />} label="EN" />
								<FormControlLabel value="ES" control={<Radio />} label="ES" />
								<FormControlLabel value="CAT" control={<Radio />} label="CAT" />
							</RadioGroup>
						)}
					/>
				</Box>
				<Controller
					name="sourceWord"
					control={control}
					render={({ field }) => (
						<TextField
							className="m-0"
							{...field}
							fullWidth
							label={texts.form.sourcePlaceholder}
							variant="outlined"
							margin="none"
							error={!!errors.sourceWord}
							helperText={errors.sourceWord?.message}
						/>
					)}
				/>
				<Box>
					<Typography>{texts.target}</Typography>
					<Controller
						name="targetLanguage"
						control={control}
						render={({ field }) => (
							<RadioGroup {...field} row>
								<FormControlLabel value="PL" control={<Radio />} label="PL" />
								<FormControlLabel value="EN" control={<Radio />} label="EN" />
								<FormControlLabel value="ES" control={<Radio />} label="ES" />
								<FormControlLabel value="CAT" control={<Radio />} label="CAT" />
							</RadioGroup>
						)}
					/>
				</Box>
				<Controller
					name="targetWord"
					control={control}
					render={({ field }) => (
						<TextField
							{...field}
							fullWidth
							label={texts.form.targetPlaceholder}
							variant="outlined"
							margin="none"
							error={!!errors.targetWord}
							helperText={errors.targetWord?.message}
						/>
					)}
				/>
				<Box>
					<Typography>{texts.part}</Typography>
					<Controller
						name="partOfSpeech"
						control={control}
						render={({ field }) => (
							<Select {...field} className="w-48">
								<MenuItem value="noun">{texts.form.noun}</MenuItem>
								<MenuItem value="pronoun">{texts.form.pronoun}</MenuItem>
								<MenuItem value="verb">{texts.form.verb}</MenuItem>
								<MenuItem value="adverb">{texts.form.adverb}</MenuItem>
								<MenuItem value="adjective">{texts.form.adjective}</MenuItem>
								<MenuItem value="sentence">{texts.form.sentence}</MenuItem>
							</Select>
						)}
					/>
				</Box>
				<Controller
					name="notes"
					control={control}
					render={({ field }) => (
						<TextareaAutosize
							{...field}
							aria-label="notes"
							minRows={3}
							placeholder={texts.form.notesPlaceholder}
							className="focus-2 w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
						/>
					)}
				/>
				<Button variant="contained" type="submit">
					{texts.form.submit}
				</Button>
			</Box>
		</form>
	);
}
