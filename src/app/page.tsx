import Link from "next/link";

import { texts } from "@/constants/texts";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Home() {
	const { userId } = await auth();
	console.log(userId);
	if (userId != null) redirect(`/users/${userId}`);

	return (
		<Box className="align-center flex gap-8 p-8 pb-20 sm:p-20">
			<Link href="/users" className="rounded-md bg-black p-4 text-white">
				{texts.users}
			</Link>
			<SignedOut>
				<SignInButton>
					<Button
						component="div"
						variant="contained"
						className="rounded-md bg-black text-white"
					></Button>
				</SignInButton>
				<SignUpButton>
					<Button
						component="div"
						variant="contained"
						className="rounded-md bg-black text-white"
					></Button>
				</SignUpButton>
			</SignedOut>
			<SignedIn>
				<UserButton />
			</SignedIn>
		</Box>
	);
}
