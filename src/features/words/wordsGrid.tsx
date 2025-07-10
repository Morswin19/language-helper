"use client";

import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Box, IconButton } from "@mui/material";
import { useWordStore } from "@/store/wordStore";
import { WordRow } from "@/types/addWordFormData";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { useState } from "react";
import DeleteWordDialog from "../../components/deleteWordDialog";
import { texts } from "@/constants/texts";

const paginationModel = { page: 0, pageSize: 100 };

export default function WordsGrid() {
	const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
	const [dialogActiveWord, setDialogActiveWord] = useState("");
	const [dialogActiveWordID, setDialogActiveWordID] = useState("");

	const { storeWords, setStoreWords } = useWordStore();

	const rows: WordRow[] = [];

	const columns: GridColDef[] = [
		{ field: "sourceWord", headerName: texts.source, width: 130 },
		{ field: "targetWord", headerName: texts.target, width: 130 },
		{ field: "sourceLanguage", headerName: texts.words.sourceLang, width: 50 },
		{ field: "targetLanguage", headerName: texts.words.targetLang, width: 50 },
		{
			field: "numberOfRepeats",
			headerName: texts.repeats.title,
			type: "number",
			width: 50,
		},
		{
			field: "numberOfGoodRepeats",
			headerName: texts.good,
			type: "number",
			width: 50,
		},
		{
			field: "numberOfMediumRepeats",
			headerName: texts.medium,
			type: "number",
			width: 50,
		},
		{
			field: "numberOfBadRepeats",
			headerName: texts.bad,
			type: "number",
			width: 50,
		},
		{
			field: "streak",
			headerName: texts.streak,
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
			headerName: texts.last,
			type: "date",
			width: 110,
		},
		{
			field: "nextRepeatDate",
			headerName: texts.words.next,
			type: "date",
			width: 110,
		},
		{ field: "partOfSpeech", headerName: texts.part, width: 100 },
		{ field: "notes", headerName: texts.words.notes, width: 100 },
		{
			field: "actions",
			headerName: texts.words.delete,
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
