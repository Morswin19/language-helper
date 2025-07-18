import Link from "next/link";

import { texts } from "@/constants/texts";
import { Box, Button } from "@mui/material";

export default async function Home() {
	return (
		<Box className="align-center flex gap-8 p-8 pb-20 sm:p-20">
			<Link href="/users" className="rounded-md bg-black p-4 text-white">
				{texts.users}
			</Link>
			<Button variant="contained" className="rounded-md bg-black text-white">
				Sing In
			</Button>
			<Button variant="contained" className="rounded-md bg-black text-white">
				Sing Up
			</Button>
		</Box>
	);
}
