import * as React from "react";
import { Box } from "@mui/material";
import { Header } from "@/app/components/header/header";
import { getUser } from "@/app/requests/getUser";
import { getUserWords } from "@/app/requests/getUserWords";

export default async function UserLayout({
	children,
	params,
}: {
	children: React.ReactNode;
	params: { userID: string };
}) {
	const user = await getUser(params.userID);
	const words = await getUserWords(params.userID);

	return (
		<>
			<Header user={user} words={words} />
			<Box className="p-4 md:p-20">{children}</Box>
		</>
	);
}
