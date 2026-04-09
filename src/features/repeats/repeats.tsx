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
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { Word } from "@/models/Word";
import { RepeatsOptionsAccordion } from "@/features/repeats/repeatsOptionsAccordion";
import { RepeatsLanguages } from "@/features/repeats/types";

export const Repeats = () => {
	const { getWord, wordsToRepeat, updateRepeatedWord } = useWordStore();
	const { showError } = useNotificationStore();
	const { isSignedIn } = useUser();
	const [repeatsLanguages, setRepeatsLanguages] = useState<RepeatsLanguages>({
		source: "ALL",
		target: "ALL",
	});

	const filteredWordsToRepeat: Word[] = wordsToRepeat
		.filter((word) =>
			repeatsLanguages.source !== "ALL" ? repeatsLanguages.source === word.sourceLanguage : true,
		)
		.filter((word) =>
			repeatsLanguages.target !== "ALL" ? repeatsLanguages.target === word.targetLanguage : true,
		);

	const [openDrawer, setOpenDrawer] = useState(false);

	const [showTranslation, setShowTranslation] = useState<boolean>(false);

	const handleShowTranslation = () => setShowTranslation((prev) => !prev);

	const handleRepeatWord = async (repeatStatus: string, wordID: string) => {
		try {
			const updatedWord = getWord(wordID);

			const newWord = getWordAfterRepeat(repeatStatus, updatedWord);

			const { success, word, error } = await patchWord(updatedWord._id, newWord);

			if (success && word) {
				updateRepeatedWord(word);
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
			if (event.code === "Space" && !showTranslation && wordsToRepeat.length > 0) {
				handleShowTranslation();
			}
			if (event.key === "1" && showTranslation) {
				handleRepeatWord("BAD", filteredWordsToRepeat[0]._id);
			}
			if (event.key === "2" && showTranslation) {
				handleRepeatWord("MEDIUM", filteredWordsToRepeat[0]._id);
			}
			if (event.key === "3" && showTranslation) {
				handleRepeatWord("GOOD", filteredWordsToRepeat[0]._id);
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
					<RepeatsOptionsAccordion
						setRepeatsLanguages={setRepeatsLanguages}
						repeatsLanguages={repeatsLanguages}
					/>

					<Typography className="!mb-2">
						{texts.header.repeats}: {filteredWordsToRepeat.length} words
					</Typography>
					{filteredWordsToRepeat.length > 0 && (
						<>
							<Chip
								className="self-end"
								label={filteredWordsToRepeat[0].partOfSpeech}
								color="primary"
							/>
							<Box>
								<Typography align="center" variant="h6">
									{filteredWordsToRepeat[0].sourceWord}
								</Typography>
								<Typography align="center" className="text-center" variant="h6">
									{showTranslation && filteredWordsToRepeat[0].targetWord}
								</Typography>
							</Box>
							<Box className="mb-4 mt-2 flex gap-4">
								{showTranslation ? (
									<>
										<KeyboardButton
											text={texts.bad}
											keyboardKey="1"
											onClick={() => handleRepeatWord("BAD", filteredWordsToRepeat[0]._id)}
										/>
										<KeyboardButton
											text={texts.medium}
											keyboardKey="2"
											onClick={() => handleRepeatWord("MEDIUM", filteredWordsToRepeat[0]._id)}
										/>
										<KeyboardButton
											text={texts.good}
											keyboardKey="3"
											onClick={() => handleRepeatWord("GOOD", filteredWordsToRepeat[0]._id)}
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
							<RepeatedWordInfo word={filteredWordsToRepeat[0]} />
							{showTranslation && (
								<RepeatedWordAdditionalSettings
									word={filteredWordsToRepeat[0]}
									openDrawer={openDrawer}
									setOpenDrawer={setOpenDrawer}
								/>
							)}
							<Link href="/calendar">RepeatsCalendar</Link>
						</>
					)}
				</>
			) : isSignedIn ? (
				<>
					<Typography>{texts.repeats.nothing}</Typography>
					<Link href="/calendar">RepeatsCalendar</Link>
				</>
			) : (
				<Typography>{texts.auth.signInRepeats}</Typography>
			)}
		</>
	);
};
