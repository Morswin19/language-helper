"use client";

import { useWordStore } from "@/store/wordStore";
import { Box, Button, Chip, Typography } from "@mui/material";
import { useEffect, useState } from "react";
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

	useEffect(() => {
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
	}, [showTranslation, wordsToRepeat.length]);

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
									className="relative w-24"
									variant="contained"
									onClick={() => handleRepeatWord("BAD", wordsToRepeat[0]._id)}
									sx={{
										"&::after": {
											content: '"1"',
											marginRight: 1,
											fontSize: "0.7em",
											position: "absolute",
											bottom: 0,
											right: 0,
											display: { xs: "none", md: "block" },
										},
									}}
								>
									{texts.bad}
								</Button>
								<Button
									className="relative w-24"
									variant="contained"
									onClick={() => handleRepeatWord("MEDIUM", wordsToRepeat[0]._id)}
									sx={{
										"&::after": {
											content: '"2"',
											marginRight: 1,
											fontSize: "0.7em",
											position: "absolute",
											bottom: 0,
											right: 0,
											display: { xs: "none", md: "block" },
										},
									}}
								>
									{texts.medium}
								</Button>
								<Button
									className="relative w-24"
									variant="contained"
									onClick={() => handleRepeatWord("GOOD", wordsToRepeat[0]._id)}
									sx={{
										"&::after": {
											content: '"3"',
											marginRight: 1,
											fontSize: "0.7em",
											position: "absolute",
											bottom: 0,
											right: 0,
											display: { xs: "none", md: "block" },
										},
									}}
								>
									{texts.good}
								</Button>
							</>
						) : (
							<Button
								className="relative w-24"
								variant="contained"
								onClick={handleShowTranslation}
								sx={{
									"&::after": {
										content: '"⏎"',
										marginRight: 1,
										fontSize: "0.7em",
										position: "absolute",
										bottom: 0,
										right: 0,
										display: { xs: "none", md: "block" },
									},
								}}
							>
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
