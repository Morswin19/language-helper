import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Typography from "@mui/material/Typography";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { LANGUAGES } from "@/constants/languageData";
import { RepeatsLanguages } from "@/features/repeats/types";
import { Dispatch, SetStateAction } from "react";

export const RepeatsOptionsAccordion = ({
	setRepeatsLanguages,
	repeatsLanguages,
}: {
	setRepeatsLanguages: Dispatch<SetStateAction<RepeatsLanguages>>;
	repeatsLanguages: RepeatsLanguages;
}) => {
	return (
		<Accordion className="mb-4 border-b border-solid border-[--mui-palette-primary-main] !shadow-none focus-within:bg-[--mui-palette-primary-lighter]">
			<AccordionSummary
				expandIcon={<ArrowDownwardIcon />}
				aria-controls="panel1-content"
				id="panel1-header"
			>
				<Typography component="span">Show Language Options</Typography>
			</AccordionSummary>
			<AccordionDetails className="flex flex-col gap-4 !px-4">
				<FormControl>
					<FormLabel id="demo-radio-buttons-group-label">Source word language</FormLabel>
					<RadioGroup
						defaultValue="ALL"
						name="radio-buttons-group"
						onChange={(e) => setRepeatsLanguages({ ...repeatsLanguages, source: e.target.value })}
						row
					>
						<FormControlLabel value="ALL" control={<Radio />} label="ALL" />
						{LANGUAGES.map((item) => (
							<>
								<FormControlLabel value={item.symbol} control={<Radio />} label={item.symbol} />
							</>
						))}
					</RadioGroup>
				</FormControl>
				<FormControl>
					<FormLabel id="demo-radio-buttons-group-label">Target word language</FormLabel>
					<RadioGroup
						defaultValue="ALL"
						name="radio-buttons-group"
						onChange={(e) => setRepeatsLanguages({ ...repeatsLanguages, target: e.target.value })}
						row
					>
						<FormControlLabel value="ALL" control={<Radio />} label="ALL" />

						{LANGUAGES.map((item) => (
							<>
								<FormControlLabel value={item.symbol} control={<Radio />} label={item.symbol} />
							</>
						))}
					</RadioGroup>
				</FormControl>
			</AccordionDetails>
		</Accordion>
	);
};
