import { Word } from "@/models/Word";
import { Box, Typography } from "@mui/material";
import React from "react";

import { texts } from "@/constants/texts";

export const RepeatedWordInfo = ({ word }: { word: Word }) => {
	return (
		<>
			<Box className="flex w-full gap-2">
				<Typography align="right" className="w-1/2">
					{texts.repeats.title}:
				</Typography>
				<Typography>{word.numberOfRepeats}</Typography>
			</Box>
			<Box className="flex w-full gap-2">
				<Typography align="right" className="w-1/2">
					{texts.repeats.good}:
				</Typography>
				<Typography>{word.numberOfGoodRepeats}</Typography>
			</Box>
			<Box className="flex w-full gap-2">
				<Typography align="right" className="w-1/2">
					{texts.repeats.medium}:
				</Typography>
				<Typography>{word.numberOfMediumRepeats}</Typography>
			</Box>
			<Box className="flex w-full gap-2">
				<Typography align="right" className="w-1/2">
					{texts.repeats.bad}:
				</Typography>
				<Typography>{word.numberOfBadRepeats}</Typography>
			</Box>
			<Box className="flex w-full gap-2">
				<Typography align="right" className="w-1/2">
					{texts.repeats.streak}:
				</Typography>
				<Typography>{word.goodRepeatsInRow}</Typography>
			</Box>
			<Box className="flex w-full gap-2">
				<Typography align="right" className="w-1/2">
					{texts.repeats.last}:
				</Typography>
				<Typography>{String(new Date(word.lastRepeatDate).toLocaleDateString("en-GB"))}</Typography>
			</Box>
			<Box className="flex w-full gap-2">
				<Typography align="right" className="w-1/2">
					{texts.repeats.percent}:
				</Typography>
				<Typography>
					{word.numberOfRepeats
						? Math.ceil(
								(word.numberOfGoodRepeats * 100) /
									(word.numberOfBadRepeats + word.numberOfGoodRepeats),
							) + "%"
						: 0}
				</Typography>
			</Box>
			<Typography align="center" className="w-1/2">
				{word.notes}
			</Typography>
		</>
	);
};
