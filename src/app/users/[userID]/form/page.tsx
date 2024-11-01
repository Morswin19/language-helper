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

import { postWord } from "@/app/requests/postWord";
import { WordFormData } from "@/app/types/addWordFormData";
import { wordFormSchema } from "./formSchema";

export default function UserForm({ params }: { params: { userID: string } }) {
	const {
		control,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm({
		resolver: yupResolver(wordFormSchema),
		defaultValues: {
			userId: `${params.userID}`,
			partOfSpeech: "noun",
			sourceLanguage: "PL",
			targetLanguage: "EN",
			sourceWord: "",
			targetWord: "",
			notes: "",
		},
	});

	const onSubmit = async (data: WordFormData) => {
		const result = await postWord(data);
		if (result.success) {
			console.log("Word posted successfully:");
			reset({
				sourceWord: "",
				targetWord: "",
				notes: "",
			});
		} else {
			console.error("Failed to post word:", result.error);
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Box className="flex flex-col gap-4">
				<Box>
					<Typography>word language</Typography>
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
							label="Add word"
							variant="outlined"
							margin="none"
							error={!!errors.sourceWord}
							helperText={errors.sourceWord?.message}
						/>
					)}
				/>
				<Box>
					<Typography>translation language</Typography>
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
							label="Add translation"
							variant="outlined"
							margin="none"
							error={!!errors.targetWord}
							helperText={errors.targetWord?.message}
						/>
					)}
				/>
				<Box>
					<Typography>Part of speech</Typography>
					<Controller
						name="partOfSpeech"
						control={control}
						render={({ field }) => (
							<Select {...field} className="w-48">
								<MenuItem value="noun">Noun</MenuItem>
								<MenuItem value="pronoun">Pronoun</MenuItem>
								<MenuItem value="verb">Verb</MenuItem>
								<MenuItem value="adjective">Adjective</MenuItem>
								<MenuItem value="sentence">Sentence</MenuItem>
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
							placeholder="Enter your notes here..."
							className="focus-2 w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
						/>
					)}
				/>
				<Button variant="contained" type="submit">
					Zapisz
				</Button>
			</Box>
		</form>
	);
}
