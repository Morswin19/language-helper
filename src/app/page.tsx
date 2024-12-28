import Link from "next/link";

import { texts } from "@/constants/texts";
import { Box } from "@mui/material";

export default async function Home() {
	return (
		<Box className="min-h-screen items-center justify-items-center gap-16 p-8 pb-20 sm:p-20">
			<Link href="/users" className="m-4 rounded-md bg-black p-4 text-white">
				{texts.users}
			</Link>
		</Box>
	);
}
