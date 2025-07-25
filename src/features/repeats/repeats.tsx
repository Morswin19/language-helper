"use client";

import { useWordStore } from "@/store/wordStore";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { RepeatedWordInfo } from "./repeatedWordInfo";
import { texts } from "@/constants/texts";
import { KeyboardButton } from "@/components/keyboardButton";
import { RepeatedWordAdditionalSettings } from "@/features/repeats/repeatedWordAdditionalSettings";
import { useNotificationStore } from "@/store/notificationStore";
import { patchWord } from "@/services/patchWord";
import { getWordAfterRepeat } from "@/utils/getWordAfterRepeat";

export const Repeats = () => {
	const { getWord, wordsToRepeat, updateRepeatedWord } = useWordStore();
	const { showError } = useNotificationStore();

	const [openDrawer, setOpenDrawer] = useState(false);

	const [showTranslation, setShowTranslation] = useState<boolean>(false);

	const handleShowTranslation = () => setShowTranslation((prev) => !prev);

	const handleRepeatWord = async (repeatStatus: string, wordID: string) => {
		try {
			const updatedWord = getWord(wordID);

			const newWord = getWordAfterRepeat(repeatStatus, updatedWord);

			const { success, word, error } = await patchWord(updatedWord._id, newWord);

			if (success && word) {
				updateRepeatedWord(repeatStatus, word);
			}

			if (error) {
				console.log("error when updating word", error);
				showError("Error updating word. Please try again.");
			}
		} catch (error) {
			console.error("Error updating word:", error);
			showError("Error updating word. Please try again.");
		}

		handleShowTranslation();
	};

	useEffect(() => {
		if (openDrawer) return;
		const handleKeyPress = (event: KeyboardEvent) => {
			if (event.key === "Enter" && !showTranslation && wordsToRepeat.length > 0) {
				handleShowTranslation();
			}
			if (event.key === "1" && showTranslation) {
				handleRepeatWord("BAD", wordsToRepeat[0]._id);
			}
			if (event.key === "2" && showTranslation) {
				handleRepeatWord("MEDIUM", wordsToRepeat[0]._id);
			}
			if (event.key === "3" && showTranslation) {
				handleRepeatWord("GOOD", wordsToRepeat[0]._id);
			}
		};

		window.addEventListener("keydown", handleKeyPress);

		return () => {
			window.removeEventListener("keydown", handleKeyPress);
		};
	}, [showTranslation, wordsToRepeat.length, openDrawer]);

	return (
		<>
			{wordsToRepeat.length > 0 ? (
				<>
					<Chip className="self-end" label={wordsToRepeat[0].partOfSpeech} color="primary" />
					<Box>
						<Typography align="center" variant="h6">
							{wordsToRepeat[0].sourceWord}
						</Typography>
						<Typography align="center" className="text-center" variant="h6">
							{showTranslation && wordsToRepeat[0].targetWord}
						</Typography>
					</Box>
					<Box className="mb-4 mt-2 flex gap-4">
						{showTranslation ? (
							<>
								<KeyboardButton
									text={texts.bad}
									keyboardKey="1"
									onClick={() => handleRepeatWord("BAD", wordsToRepeat[0]._id)}
								/>
								<KeyboardButton
									text={texts.medium}
									keyboardKey="2"
									onClick={() => handleRepeatWord("MEDIUM", wordsToRepeat[0]._id)}
								/>
								<KeyboardButton
									text={texts.good}
									keyboardKey="3"
									onClick={() => handleRepeatWord("GOOD", wordsToRepeat[0]._id)}
								/>
							</>
						) : (
							<KeyboardButton
								text={texts.repeats.show}
								keyboardKey="⏎"
								onClick={handleShowTranslation}
							/>
						)}
					</Box>
					<RepeatedWordInfo word={wordsToRepeat[0]} />
					{showTranslation && (
						<RepeatedWordAdditionalSettings
							word={wordsToRepeat[0]}
							openDrawer={openDrawer}
							setOpenDrawer={setOpenDrawer}
						/>
					)}
				</>
			) : (
				<Typography>{texts.repeats.nothing}</Typography>
			)}
		</>
	);
};
