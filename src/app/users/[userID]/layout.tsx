import * as React from "react";
import Link from "next/link";
import { Box } from "@mui/material";

export default function UserLayout({
	children,
	params,
}: {
	children: React.ReactNode;
	params: { userID: string };
}) {
	return (
		<>
			<Box className="container mx-auto my-4 flex justify-center gap-4 border-8 border-cyan-100 px-4">
				<Link className="uppercase" href={`/users/${params.userID}/form`}>
					Form
				</Link>
				<Link className="uppercase" href={`/users/${params.userID}/repeats`}>
					Repeats
				</Link>
				<Link className="uppercase" href={`/users/${params.userID}/words`}>
					Words
				</Link>
			</Box>
			{children}
		</>
	);
}
