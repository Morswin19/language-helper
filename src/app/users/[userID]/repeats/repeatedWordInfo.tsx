import { Word } from "@/app/models/Word";
import { Box, Typography } from "@mui/material";
import React from "react";

export const RepeatedWordInfo = ({ word }: { word: Word }) => {
	return (
		<>
			<Box className="flex w-full gap-2">
				<Typography align="right" className="w-1/2">
					Repeats:
				</Typography>
				<Typography>{word.numberOfRepeats}</Typography>
			</Box>
			<Box className="flex w-full gap-2">
				<Typography align="right" className="w-1/2">
					Good:
				</Typography>
				<Typography>{word.numberOfGoodRepeats}</Typography>
			</Box>
			<Box className="flex w-full gap-2">
				<Typography align="right" className="w-1/2">
					Medium:
				</Typography>
				<Typography>{word.numberOfMediumRepeats}</Typography>
			</Box>
			<Box className="flex w-full gap-2">
				<Typography align="right" className="w-1/2">
					Bad:
				</Typography>
				<Typography>{word.numberOfBadRepeats}</Typography>
			</Box>
			<Box className="flex w-full gap-2">
				<Typography align="right" className="w-1/2">
					Streak:
				</Typography>
				<Typography>{word.goodRepeatsInRow}</Typography>
			</Box>
			<Box className="flex w-full gap-2">
				<Typography align="right" className="w-1/2">
					Last Repeat:
				</Typography>
				<Typography>{String(new Date(word.lastRepeatDate).toLocaleDateString("en-GB"))}</Typography>
			</Box>
			<Box className="flex w-full gap-2">
				<Typography align="right" className="w-1/2">
					Percent of good repeats:
				</Typography>
				<Typography>
					{word.numberOfRepeats
						? (word.numberOfGoodRepeats * 100) /
							(word.numberOfBadRepeats + word.numberOfGoodRepeats)
						: 0}
				</Typography>
			</Box>
			<Typography align="center" className="w-1/2">
				{word.notes}
			</Typography>
		</>
	);
};
