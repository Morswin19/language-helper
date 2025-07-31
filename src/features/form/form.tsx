"use client";

import Box from "@mui/material/Box";
import Select from "@mui/material/Select";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { postWord } from "@/services/postWord";
import { WordFormData } from "@/types/addWordFormData";
import { wordFormSchema } from "@/features/form/formSchema";
import { useWordStore } from "@/store/wordStore";

import { texts } from "@/constants/texts";
import { useNotificationStore } from "@/store/notificationStore";
import { useUserStore } from "@/store/userStore";
import { auth } from "@clerk/nextjs/server";
import { useUser } from "@clerk/nextjs";

export default function Form() {
	// const { userId } = useUserStore();
	const { user } = useUser();
	const userId = user?.id || "";
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
	const { showSuccess, showError } = useNotificationStore();

	const onSubmit = async (data: WordFormData) => {
		const result = await postWord(data);
		if (result.success) {
			const newWord = result.data;
			const nextDate = new Date();
			nextDate.setDate(nextDate.getDate() + 1);
			newWord.word.nextRepeatDate = nextDate;
			newWord.word.lastRepeatDate = null;
			addWord(newWord.word);
			reset({
				sourceWord: "",
				targetWord: "",
				notes: "",
				userId: `${userId}`,
			});
			showSuccess(`Word "${data.sourceWord}" → "${data.targetWord}" added successfully!`);
		} else {
			console.error("Failed to post word:", result.error);
			showError(`Failed to add word: ${result.error || "Unknown error"}`);
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Box className="m-auto flex max-w-lg flex-col gap-4">
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
