import { Word } from "@/models/Word";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { texts } from "@/constants/texts";

export const RepeatedWordInfo = ({ word }: { word: Word }) => {
	const showWordRepeatsPercent = word.numberOfRepeats && word.numberOfGoodRepeats > 0;

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
					{texts.good}:
				</Typography>
				<Typography>{word.numberOfGoodRepeats}</Typography>
			</Box>
			<Box className="flex w-full gap-2">
				<Typography align="right" className="w-1/2">
					{texts.medium}:
				</Typography>
				<Typography>{word.numberOfMediumRepeats}</Typography>
			</Box>
			<Box className="flex w-full gap-2">
				<Typography align="right" className="w-1/2">
					{texts.bad}:
				</Typography>
				<Typography>{word.numberOfBadRepeats}</Typography>
			</Box>
			<Box className="flex w-full gap-2">
				<Typography align="right" className="w-1/2">
					{texts.streak}:
				</Typography>
				<Typography>{word.goodRepeatsInRow}</Typography>
			</Box>
			<Box className="flex w-full gap-2">
				<Typography align="right" className="w-1/2">
					{texts.last}:
				</Typography>
				<Typography>{String(new Date(word.lastRepeatDate).toLocaleDateString("en-GB"))}</Typography>
			</Box>
			<Box className="flex w-full gap-2">
				<Typography align="right" className="w-1/2">
					{texts.percent}:
				</Typography>
				<Typography>
					{showWordRepeatsPercent
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
