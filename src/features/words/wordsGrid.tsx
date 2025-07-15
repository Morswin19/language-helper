"use client";

import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import { useWordStore } from "@/store/wordStore";
import { WordRow } from "@/types/addWordFormData";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";
import DeleteWordDialog from "../../components/deleteWordDialog";
import { texts } from "@/constants/texts";
import { Drawer } from "@mui/material";
import WordEditForm from "@/features/wordEditForm/WordEditForm";
import { Word } from "@/models/Word";

const paginationModel = { page: 0, pageSize: 100 };

export default function WordsGrid() {
	const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
	const [dialogActiveWord, setDialogActiveWord] = useState("");
	const [dialogActiveWordID, setDialogActiveWordID] = useState("");
	const [editActiveWord, setEditActiveWord] = useState<Word>();
	const [openDrawer, setOpenDrawer] = useState(false);

	const { storeWords } = useWordStore();

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
			field: "actions-edit",
			headerName: texts.words.edit,
			width: 70,
			renderCell: (params) => (
				<IconButton onClick={() => handleEditClickInWordsTable(params.row.id)} color="warning">
					<EditIcon />
				</IconButton>
			),
		},
		{
			field: "actions-delete",
			headerName: texts.words.delete,
			width: 70,
			renderCell: (params) => (
				<IconButton
					onClick={() => handleDeleteClickInWordsTable(params.row.id, params.row.sourceWord)}
					color="error"
					className="cursor-pointer"
				>
					<HighlightOffIcon />
				</IconButton>
			),
		},
	];

	const handleEditClickInWordsTable = (id: string) => {
		setOpenDrawer(true);
		setEditActiveWord(storeWords.filter((w) => w._id === id)[0]);
	};

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
					sx={{ border: 0 }}
				/>
			</Box>
			<DeleteWordDialog
				deleteDialogOpen={deleteDialogOpen}
				setDeleteDialogOpen={setDeleteDialogOpen}
				dialogActiveWord={dialogActiveWord}
				dialogActiveWordID={dialogActiveWordID}
			/>
			<Drawer anchor="right" open={openDrawer} onClose={() => setOpenDrawer(false)}>
				{editActiveWord && <WordEditForm word={editActiveWord} setOpenDrawer={setOpenDrawer} />}
			</Drawer>
		</>
	);
}
