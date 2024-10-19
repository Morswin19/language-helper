import * as React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { getUserWords } from "@/app/requests/getUserWords";
import { WordRow } from "@/app/types/addWordFormData";
import { Box } from "@mui/material";

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

export default async function UserWords({ params }: { params: { userID: string } }) {
	let rows: WordRow[] = [];
	const words = await getUserWords(params.userID);

	words.forEach((word) => {
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
				// pageSizeOptions={[5, 10]}
				checkboxSelection
				sx={{ border: 0 }}
			/>
		</Box>
	);
}
