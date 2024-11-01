import * as React from "react";
import Link from "next/link";
import { Box } from "@mui/material";
import { Header } from "@/app/components/header/header";

export default function UserLayout({
	children,
	params,
}: {
	children: React.ReactNode;
	params: { userID: string };
}) {
	return (
		<>
			<Header userID={params.userID} />
			<Box className="p-4 md:p-20">{children}</Box>
		</>
	);
}
