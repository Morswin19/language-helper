"use client";

import { useWordStore } from "@/store/wordStore";
import { Box, Button, Chip, Typography } from "@mui/material";
import { useState } from "react";
import { RepeatedWordInfo } from "./repeatedWordInfo";
import { texts } from "@/constants/texts";

export const Repeats = () => {
	const { getWord, wordsToRepeat, updateWord } = useWordStore();

	const [showTranslation, setShowTranslation] = useState<boolean>(false);

	const handleShowTranslation = () => setShowTranslation((prev) => !prev);

	const handleRepeatWord = (repeatStatus: string, wordID: string) => {
		const updatedWord = getWord(wordID);
		updateWord(repeatStatus, updatedWord);
		handleShowTranslation();
	};

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
								<Button
									variant="contained"
									onClick={() => handleRepeatWord("BAD", wordsToRepeat[0]._id)}
								>
									{texts.bad}
								</Button>
								<Button
									variant="contained"
									onClick={() => handleRepeatWord("MEDIUM", wordsToRepeat[0]._id)}
								>
									{texts.medium}
								</Button>
								<Button
									variant="contained"
									onClick={() => handleRepeatWord("GOOD", wordsToRepeat[0]._id)}
								>
									{texts.good}
								</Button>
							</>
						) : (
							<Button variant="contained" onClick={handleShowTranslation}>
								{texts.repeats.show}
							</Button>
						)}
					</Box>
					<RepeatedWordInfo word={wordsToRepeat[0]} />
				</>
			) : (
				<Typography>{texts.repeats.nothing}</Typography>
			)}
		</>
	);
};
