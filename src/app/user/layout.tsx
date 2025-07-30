import * as React from "react";
import Box from "@mui/material/Box";
import { Header } from "@/components/header/header";

export default async function UserLayout({
	children,
	// params,
}: {
	children: React.ReactNode;
	// params: { userID: string };
}) {
	return (
		<>
			<Header />
			<Box className="p-4 md:p-20">{children}</Box>
		</>
	);
}
