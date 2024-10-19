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
} from "@mui/material";

import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { postWord } from "@/app/requests/postWord";
import { FormData } from "@/app/types/addWordFormData";
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

	const onSubmit = async (data: FormData) => {
		const result = await postWord(data);
		if (result.success) {
			console.log("Word posted successfully:", result.data);
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
			<Box className="flex flex-wrap justify-items-center gap-2 p-8 pb-20 sm:gap-16 sm:p-20">
				<Box>
					<Controller
						name="partOfSpeech"
						control={control}
						render={({ field }) => (
							<Select {...field} fullWidth>
								<MenuItem value="noun">Noun</MenuItem>
								<MenuItem value="pronoun">Pronoun</MenuItem>
								<MenuItem value="verb">Verb</MenuItem>
								<MenuItem value="adjective">Adjective</MenuItem>
								<MenuItem value="sentence">Sentence</MenuItem>
							</Select>
						)}
					/>
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
					<Controller
						name="sourceWord"
						control={control}
						render={({ field }) => (
							<TextField
								{...field}
								fullWidth
								label="Dodaj słowo"
								variant="outlined"
								margin="normal"
								error={!!errors.sourceWord}
								helperText={errors.sourceWord?.message}
							/>
						)}
					/>
				</Box>
				<Box>
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
					<Controller
						name="targetWord"
						control={control}
						render={({ field }) => (
							<TextField
								{...field}
								fullWidth
								label="Dodaj tłumaczenie"
								variant="outlined"
								margin="normal"
								error={!!errors.targetWord}
								helperText={errors.targetWord?.message}
							/>
						)}
					/>
				</Box>
				<Box>
					<Controller
						name="notes"
						control={control}
						render={({ field }) => (
							<TextareaAutosize
								{...field}
								aria-label="notes"
								minRows={3}
								placeholder="Enter your notes here..."
								className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
							/>
						)}
					/>
					<Button variant="contained" type="submit">
						Zapisz
					</Button>
				</Box>
			</Box>
		</form>
	);
}
