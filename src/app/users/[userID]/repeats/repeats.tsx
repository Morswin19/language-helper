"use client";

import { Word } from "@/app/models/Word";
import { useWordStore } from "@/app/store/store";
import { updateRepeatedWordInDB } from "@/app/utils/updateRepeatedWordInDB";
import { Box, Button, Chip, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { RepeatedWordInfo } from "./repeatedWordInfo";

import { texts } from "@/app/constants/texts";

export const Repeats = () => {
	const { storeWords, setStoreWords, getWord, updateWord } = useWordStore();

	const [showTranslation, setShowTranslation] = useState<boolean>(false);
	const [wordsToRepeat, setWordsToRepeat] = useState<Word[]>(storeWords);

	const handleShowTranslation = () => setShowTranslation((prev) => !prev);

	const handleRepeatWord = (repeatStatus: string, wordID: string) => {
		const updatedWord = getWord(wordID);
		updateRepeatedWordInDB(repeatStatus, updatedWord);
		updateWord(repeatStatus, updatedWord);
		handleShowTranslation();
		setWordsToRepeat((prevWords) => prevWords.slice(1));
	};

	useEffect(() => {
		if (!wordsToRepeat.length) {
			const repeatBorderDate = new Date();
			repeatBorderDate.setDate(repeatBorderDate.getDate() + 1);
			repeatBorderDate.setHours(2, 0, 0, 0);

			setWordsToRepeat(
				[...storeWords]
					.filter((word) => new Date(word.nextRepeatDate) < repeatBorderDate)
					.sort(() => Math.random() - 0.5),
			);
		}
	}, [storeWords]);

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
					{showTranslation ? (
						<Box className="mb-4 flex gap-4">
							<Button
								variant="contained"
								onClick={() => handleRepeatWord("BAD", wordsToRepeat[0]._id)}
							>
								BAD
							</Button>
							<Button
								variant="contained"
								onClick={() => handleRepeatWord("MEDIUM", wordsToRepeat[0]._id)}
							>
								MID
							</Button>
							<Button
								variant="contained"
								onClick={() => handleRepeatWord("GOOD", wordsToRepeat[0]._id)}
							>
								GOOD
							</Button>
						</Box>
					) : (
						<Box className="mb-4 flex gap-2">
							<Button variant="contained" onClick={handleShowTranslation}>
								SHOW
							</Button>
						</Box>
					)}
					<RepeatedWordInfo word={wordsToRepeat[0]} />
				</>
			) : (
				<Typography>Nothing to repeat</Typography>
			)}
		</>
	);
};
