import { Repeats } from "@/features/repeats/repeats";
import Box from "@mui/material/Box";

export default function UserRepeats() {
	return (
		<Box className="flex flex-col items-center justify-items-center p-4 pb-20 sm:p-20 md:p-8">
			<Repeats />
		</Box>
	);
}
