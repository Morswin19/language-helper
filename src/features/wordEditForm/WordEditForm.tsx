import { yupResolver } from "@hookform/resolvers/yup";
import { wordEditSchema } from "@/features/wordEditForm/wordEditSchema";
import { useForm, Controller } from "react-hook-form";
import { useWordStore } from "@/store/wordStore";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import MenuItem from "@mui/material/MenuItem";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Select from "@mui/material/Select";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { texts } from "@/constants/texts";
import { UpdatedWord, WordData } from "@/types/addWordFormData";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import * as React from "react";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

export default function WordEditForm({
	word,
	setOpenDrawer,
}: {
	word: WordData;
	setOpenDrawer: (open: boolean) => void;
}) {
	const { updateEditedWord } = useWordStore();
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(wordEditSchema),
		defaultValues: {
			sourceLanguage: word.sourceLanguage,
			targetLanguage: word.targetLanguage,
			partOfSpeech: word.partOfSpeech,
			sourceWord: word.sourceWord,
			targetWord: word.targetWord,
			notes: word.notes,
			numberOfRepeats: word.numberOfRepeats,
			numberOfGoodRepeats: word.numberOfGoodRepeats,
			numberOfMediumRepeats: word.numberOfMediumRepeats,
			numberOfBadRepeats: word.numberOfBadRepeats,
			goodRepeatsInRow: word.goodRepeatsInRow,
			nextRepeatDate: word.nextRepeatDate || null,
		},
	});

	const onSubmit = async (data: UpdatedWord) => {
		const updatedWord: WordData = {
			...word,
			...data,
		};

		updateEditedWord(updatedWord);
		setOpenDrawer(false);
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Box className="flex w-[310px] flex-col gap-4 p-4 md:w-[500px]">
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
							label={texts.form.editSourcePlaceholder}
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
							label={texts.form.editTargetPlaceholder}
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
				<Controller
					name="numberOfRepeats"
					control={control}
					render={({ field }) => (
						<TextField
							className="m-0"
							{...field}
							fullWidth
							label={texts.form.numberOfRepeatsPlaceholder}
							variant="outlined"
							margin="none"
							error={!!errors.numberOfRepeats}
							helperText={errors.numberOfRepeats?.message}
						/>
					)}
				/>
				<Controller
					name="numberOfGoodRepeats"
					control={control}
					render={({ field }) => (
						<TextField
							className="m-0"
							{...field}
							fullWidth
							label={texts.form.numberOfGoodRepeatsPlaceholder}
							variant="outlined"
							margin="none"
							error={!!errors.numberOfGoodRepeats}
							helperText={errors.numberOfGoodRepeats?.message}
						/>
					)}
				/>
				<Controller
					name="numberOfMediumRepeats"
					control={control}
					render={({ field }) => (
						<TextField
							className="m-0"
							{...field}
							fullWidth
							label={texts.form.numberOfMediumRepeatsPlaceholder}
							variant="outlined"
							margin="none"
							error={!!errors.numberOfMediumRepeats}
							helperText={errors.numberOfMediumRepeats?.message}
						/>
					)}
				/>
				<Controller
					name="numberOfBadRepeats"
					control={control}
					render={({ field }) => (
						<TextField
							className="m-0"
							{...field}
							fullWidth
							label={texts.form.numberOfBadRepeatsPlaceholder}
							variant="outlined"
							margin="none"
							error={!!errors.numberOfBadRepeats}
							helperText={errors.numberOfBadRepeats?.message}
						/>
					)}
				/>
				<Controller
					name="goodRepeatsInRow"
					control={control}
					render={({ field }) => (
						<TextField
							className="m-0"
							{...field}
							fullWidth
							label={texts.form.goodRepeatsInRowPlaceholder}
							variant="outlined"
							margin="none"
							error={!!errors.goodRepeatsInRow}
							helperText={errors.goodRepeatsInRow?.message}
						/>
					)}
				/>

				<LocalizationProvider dateAdapter={AdapterDayjs}>
					<Controller
						name="nextRepeatDate"
						control={control}
						render={({ field: { value, onChange, ...field } }) => (
							<DatePicker
								{...field}
								value={value ? dayjs(value) : null}
								onChange={(newValue) => onChange(newValue ? newValue.toDate() : null)}
								label={texts.form.nextRepeatDatePlaceholder}
								slotProps={{
									textField: {
										fullWidth: true,
										variant: "outlined",
										error: !!errors.nextRepeatDate,
										helperText: errors.nextRepeatDate?.message,
									},
								}}
							/>
						)}
					/>
				</LocalizationProvider>
				<Button variant="contained" type="submit">
					{texts.form.submit}
				</Button>
			</Box>
		</form>
	);
}
