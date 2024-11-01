"use client";

import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import { useWordStore } from "@/app/store/store";
import { WordRow } from "@/app/types/addWordFormData";
import { Word } from "@/app/models/Word";

const columns: GridColDef[] = [
	{ field: "sourceWord", headerName: "Source Word", width: 130 },
	{ field: "targetWord", headerName: "Target Word", width: 130 },
	{ field: "sourceLanguage", headerName: "Source Language", width: 50 },
	{ field: "targetLanguage", headerName: "Target Language", width: 50 },
	{
		field: "numberOfRepeats",
		headerName: "Repeats",
		type: "number",
		width: 50,
	},
	{
		field: "numberOfGoodRepeats",
		headerName: "Good",
		type: "number",
		width: 50,
	},
	{
		field: "numberOfMediumRepeats",
		headerName: "Medium",
		type: "number",
		width: 50,
	},
	{
		field: "numberOfBadRepeats",
		headerName: "Bad",
		type: "number",
		width: 50,
	},
	{
		field: "lastRepeatDate",
		headerName: "last repeat",
		type: "date",
		width: 110,
	},
	{
		field: "nextRepeatDate",
		headerName: "next repeat",
		type: "date",
		width: 110,
	},
	{ field: "partOfSpeech", headerName: "Part Of Speech", width: 100 },
	{ field: "notes", headerName: "Notes", width: 100 },
];

const paginationModel = { page: 0, pageSize: 100 };

export default function WordsGrid({ words }: { words: Word[] }) {
	const rows: WordRow[] = [];

	const { storeWords, setStoreWords } = useWordStore();

	if (storeWords.length === 0) {
		setStoreWords(words);
	}

	storeWords.forEach((word) => {
		rows.push({
			id: word._id,
			sourceWord: word.sourceWord,
			targetWord: word.targetWord,
			sourceLanguage: word.sourceLanguage,
			targetLanguage: word.targetLanguage,
			numberOfRepeats: word.numberOfRepeats,
			numberOfGoodRepeats: word.numberOfGoodRepeats,
			numberOfMediumRepeats: word.numberOfMediumRepeats,
			numberOfBadRepeats: word.numberOfBadRepeats,
			lastRepeatDate: new Date(word.lastRepeatDate),
			nextRepeatDate: new Date(word.nextRepeatDate),
			partOfSpeech: word.partOfSpeech,
			notes: word.notes,
		});
	});

	return (
		<Box className="container mx-auto my-4 flex justify-center gap-4 border-8 border-cyan-100 px-4">
			<DataGrid
				rows={rows}
				columns={columns}
				initialState={{ pagination: { paginationModel } }}
				checkboxSelection
				sx={{ border: 0 }}
			/>
		</Box>
	);
}
