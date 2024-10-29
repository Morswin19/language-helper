"use client";

import { Word } from "@/app/models/Word";
import { useWordStore } from "@/app/store/store";
import { updateRepeatedWordInDB } from "@/app/utils/updateRepeatedWordInDB";
import { Box, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";

export const Repeats = ({ words }: { words: Word[] }) => {
	const { storeWords, setStoreWords, getWord, updateWord } = useWordStore();

	if (storeWords.length === 0) {
		setStoreWords(words);
	}

	const [showTranslation, setShowTranslation] = useState<boolean>(false);
	const [wordsToRepeat, setWordsToRepeat] = useState<Word[]>(storeWords);

	const handleShowTranslation = () => setShowTranslation((prev) => !prev);

	const handleRepeatWord = (repeatStatus: string, wordID: string) => {
		let updatedWord = getWord(wordID);
		updateRepeatedWordInDB(repeatStatus, updatedWord);
		updateWord(repeatStatus, updatedWord);
		handleShowTranslation();
		setWordsToRepeat((prevWords) => prevWords.slice(1));
	};

	useEffect(() => {
		let repeatBorderDate = new Date();
		repeatBorderDate.setDate(repeatBorderDate.getDate() + 1);
		repeatBorderDate.setHours(2, 0, 0, 0);

		if (storeWords.length === 0) {
			setWordsToRepeat(
				[...words]
					.filter((word) => new Date(word.nextRepeatDate) < repeatBorderDate)
					.sort(() => Math.random() - 0.5),
			);
		} else {
			setWordsToRepeat(
				[...storeWords]
					.filter((word) => new Date(word.nextRepeatDate) < repeatBorderDate)
					.sort(() => Math.random() - 0.5),
			);
		}
	}, []);

	return (
		<>
			{wordsToRepeat.length > 0 ? (
				<>
					<Box>
						<Typography variant="h6">{wordsToRepeat[0].sourceWord}</Typography>
						<Typography variant="h6">{showTranslation && wordsToRepeat[0].targetWord}</Typography>
					</Box>
					{showTranslation ? (
						<Box className="flex gap-2">
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
						<Box className="flex gap-2">
							<Button variant="contained" onClick={handleShowTranslation}>
								SHOW
							</Button>
						</Box>
					)}
					<Typography>NumberOfRepeats: {wordsToRepeat[0].numberOfRepeats}</Typography>
					<Typography>NumberOfGoodRepeats: {wordsToRepeat[0].numberOfGoodRepeats}</Typography>
					<Typography>NumberOfMediumRepeats: {wordsToRepeat[0].numberOfMediumRepeats}</Typography>
					<Typography>NumberOfBadRepeats: {wordsToRepeat[0].numberOfBadRepeats}</Typography>
					<Typography>Streak: {wordsToRepeat[0].goodRepeatsInRow}</Typography>
					<Typography>
						LastRepeatDate: {String(new Date(wordsToRepeat[0].lastRepeatDate))}
					</Typography>
					<Typography>
						NextRepeatDate: {String(new Date(wordsToRepeat[0].nextRepeatDate))}
					</Typography>
					<Typography>
						Percent of good repeats:{" "}
						{(wordsToRepeat[0].numberOfGoodRepeats * 100) / wordsToRepeat[0].numberOfRepeats}
					</Typography>
				</>
			) : (
				<Typography>Nothing to repeat</Typography>
			)}
		</>
	);
};
