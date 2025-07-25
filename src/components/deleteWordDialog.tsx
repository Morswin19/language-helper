import { texts } from "@/constants/texts";
import { deleteWord } from "@/services/deleteWord";
import { useNotificationStore } from "@/store/notificationStore";
import { useWordStore } from "@/store/wordStore";
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Typography,
} from "@mui/material";

type DeleteWordDialogProps = {
	deleteDialogOpen: boolean;
	setDeleteDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
	dialogActiveWord: string;
	dialogActiveWordID: string;
};

export default function DeleteWordDialog({
	deleteDialogOpen,
	setDeleteDialogOpen,
	dialogActiveWord,
	dialogActiveWordID,
}: DeleteWordDialogProps) {
	const { storeWords, setStoreWords, wordsToRepeat, setWordsToRepeat } = useWordStore();
	const { showSuccess, showError } = useNotificationStore();

	const handleDeleteDialogExitClick = () => {
		setDeleteDialogOpen(false);
	};

	const handleDialogDeleteButtonClick = (wordID: string) => {
		deleteWord(wordID)
			.then(() => {
				setDeleteDialogOpen(false);
				const updatedWords = storeWords.filter((word) => word._id !== wordID);
				const updatedWordsToRepeat = wordsToRepeat.filter((word) => word._id !== wordID);

				setStoreWords(updatedWords);
				setWordsToRepeat(updatedWordsToRepeat);
				showSuccess(`Word "${dialogActiveWord}" deleted successfully!`);
			})
			.catch((error) => showError(error));
	};

	return (
		<Dialog
			open={deleteDialogOpen}
			onClose={handleDeleteDialogExitClick}
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description"
		>
			<DialogTitle id="alert-dialog-title">{texts.words.remove}</DialogTitle>
			<DialogContent>
				<DialogContentText id="alert-dialog-description" className="text-center">
					<Typography variant="h2" component="span">
						{dialogActiveWord}
					</Typography>
				</DialogContentText>
			</DialogContent>
			<DialogActions sx={{ justifyContent: "space-between", px: 2, pb: 2 }}>
				<Button variant="contained" onClick={handleDeleteDialogExitClick}>
					{texts.no}
				</Button>
				<Button
					variant="contained"
					onClick={() => handleDialogDeleteButtonClick(dialogActiveWordID)}
					autoFocus
				>
					{texts.yes}
				</Button>
			</DialogActions>
		</Dialog>
	);
}
