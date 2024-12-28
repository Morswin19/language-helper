"use client";

import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Box, IconButton } from "@mui/material";
import { useWordStore } from "@/store/wordStore";
import { WordRow } from "@/types/addWordFormData";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { useState } from "react";
import DeleteWordDialog from "./deleteWordDialog";

const paginationModel = { page: 0, pageSize: 100 };

export default function WordsGrid() {
	const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
	const [dialogActiveWord, setDialogActiveWord] = useState("");
	const [dialogActiveWordID, setDialogActiveWordID] = useState("");

	const { storeWords, setStoreWords } = useWordStore();

	const rows: WordRow[] = [];

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
			field: "streak",
			headerName: "Streak",
			type: "number",
			width: 50,
		},
		{
			field: "percentOfGoodRepeats",
			headerName: "%",
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
		{
			field: "actions",
			headerName: "Delete",
			width: 70,
			renderCell: (params) => (
				<IconButton
					onClick={() => handleDeleteClickInWordsTable(params.row.id, params.row.sourceWord)}
					color="error"
				>
					<HighlightOffIcon />
				</IconButton>
			),
		},
	];

	const handleDeleteClickInWordsTable = (wordID: string, sourceWord: string) => {
		setDeleteDialogOpen(true);
		setDialogActiveWordID(wordID);
		setDialogActiveWord(sourceWord);
	};

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
			streak: word.goodRepeatsInRow,
			percentOfGoodRepeats: word.numberOfRepeats
				? Math.ceil((word.numberOfGoodRepeats * 100) / word.numberOfRepeats)
				: 0,
			lastRepeatDate: new Date(word.lastRepeatDate),
			nextRepeatDate: new Date(word.nextRepeatDate),
			partOfSpeech: word.partOfSpeech,
			notes: word.notes,
		});
	});

	return (
		<>
			<Box className="container mx-auto my-4 flex justify-center px-4">
				<DataGrid
					rows={rows}
					columns={columns}
					initialState={{ pagination: { paginationModel } }}
					checkboxSelection
					sx={{ border: 0 }}
				/>
			</Box>
			<DeleteWordDialog
				deleteDialogOpen={deleteDialogOpen}
				setDeleteDialogOpen={setDeleteDialogOpen}
				dialogActiveWord={dialogActiveWord}
				dialogActiveWordID={dialogActiveWordID}
			/>
		</>
	);
}
