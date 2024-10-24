import { getUserWords } from "@/app/requests/getUserWords";
import { Box } from "@mui/material";
import { Repeats } from "./repeats";

export default async function UserRepeats({ params }: { params: { userID: string } }) {
	const words = await getUserWords(params.userID);

	return (
		<Box className="min-h-screen items-center justify-items-center gap-16 p-8 pb-20 sm:p-20">
			<Repeats words={words} />
		</Box>
	);
}
