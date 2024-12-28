import { Box } from "@mui/material";
import { Repeats } from "../../../../features/repeats/repeats";

export default function UserRepeats() {
	return (
		<Box className="flex min-h-screen flex-col items-center justify-items-center p-8 pb-20 sm:p-20">
			<Repeats />
		</Box>
	);
}
