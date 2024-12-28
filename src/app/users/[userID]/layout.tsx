import * as React from "react";
import { Box } from "@mui/material";
import { Header } from "@/components/header/header";
import { getUserWords } from "@/services/getUserWords";

export default async function UserLayout({
	children,
	params,
}: {
	children: React.ReactNode;
	params: { userID: string };
}) {
	return (
		<>
			<Header userId={params.userID} />
			<Box className="p-4 md:p-20">{children}</Box>
		</>
	);
}
