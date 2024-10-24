"use client";

import { Word } from "@/app/models/Word";
import { handleRepeatDataInDatabase } from "@/app/utils/handleRepeats";
import { Box, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";

export const Repeats = ({ words }: { words: Word[] }) => {
	const [showTranslation, setShowTranslation] = useState<boolean>(false);
	const [wordsToRepeat, setWordsToRepeat] = useState<Word[]>(words);

	const handleShowTranslation = () => setShowTranslation((prev) => !prev);

	const handleRepeatWord = (
		repeatStatus: string,
		numberOfRepeats: number,
		numberOfStatusRepeats: number,
		wordID: string,
	) => {
		handleRepeatDataInDatabase(repeatStatus, numberOfRepeats, numberOfStatusRepeats, wordID);
		handleShowTranslation();
		setWordsToRepeat((prevWords) => prevWords.slice(1));
	};

	useEffect(() => {
		setWordsToRepeat([...words].sort(() => Math.random() - 0.5));
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
								onClick={() =>
									handleRepeatWord(
										"BAD",
										wordsToRepeat[0].numberOfRepeats,
										wordsToRepeat[0].numberOfBadRepeats,
										wordsToRepeat[0]._id,
									)
								}
							>
								BAD
							</Button>
							<Button
								variant="contained"
								onClick={() =>
									handleRepeatWord(
										"MEDIUM",
										wordsToRepeat[0].numberOfRepeats,
										wordsToRepeat[0].numberOfMediumRepeats,
										wordsToRepeat[0]._id,
									)
								}
							>
								MID
							</Button>
							<Button
								variant="contained"
								onClick={() =>
									handleRepeatWord(
										"GOOD",
										wordsToRepeat[0].numberOfRepeats,
										wordsToRepeat[0].numberOfGoodRepeats,
										wordsToRepeat[0]._id,
									)
								}
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
				</>
			) : (
				<Typography>Nothing to repeat</Typography>
			)}
		</>
	);
};
