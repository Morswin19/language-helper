import DeleteWordDialog from "@/components/deleteWordDialog";
import { KeyboardButton } from "@/components/keyboardButton";
import { texts } from "@/constants/texts";
import { Word } from "@/models/Word";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import WordEditForm from "@/features/wordEditForm/WordEditForm";

export const RepeatedWordAdditionalSettings = ({ word }: { word: Word }) => {
	const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
	const [dialogActiveWord, setDialogActiveWord] = useState("");
	const [dialogActiveWordID, setDialogActiveWordID] = useState("");
	const [openDrawer, setOpenDrawer] = useState(false);

	const toggleDrawer = (newOpen: boolean) => () => {
		setOpenDrawer(newOpen);
	};

	const handleEditWordClick = () => {
		setOpenDrawer(true);
	};

	const handleDeleteWordClick = (wordID: string, sourceWord: string) => {
		setDeleteDialogOpen(true);
		setDialogActiveWordID(wordID);
		setDialogActiveWord(sourceWord);
	};

	useEffect(() => {
		const handleKeyPress = (event: KeyboardEvent) => {
			if (event.key === "E" || event.key === "e") {
				handleEditWordClick();
			}
			if (event.key === "X" || event.key === "x") {
				handleDeleteWordClick(word._id, word.sourceWord);
			}
		};

		window.addEventListener("keydown", handleKeyPress);

		return () => {
			window.removeEventListener("keydown", handleKeyPress);
		};
	}, []);

	return (
		<>
			<Box className="mb-4 mt-4 flex gap-4 border-solid">
				<KeyboardButton
					text={texts.words.edit}
					keyboardKey="E"
					onClick={() => handleEditWordClick()}
				/>
				<KeyboardButton
					text={texts.words.delete}
					keyboardKey="X"
					onClick={() => handleDeleteWordClick(word._id, word.sourceWord)}
				/>
			</Box>
			<DeleteWordDialog
				deleteDialogOpen={deleteDialogOpen}
				setDeleteDialogOpen={setDeleteDialogOpen}
				dialogActiveWord={dialogActiveWord}
				dialogActiveWordID={dialogActiveWordID}
			/>
			<Button onClick={toggleDrawer(true)}>Open drawer</Button>
			<Drawer anchor="right" open={openDrawer} onClose={toggleDrawer(false)}>
				<WordEditForm word={word} />
			</Drawer>
		</>
	);
};
