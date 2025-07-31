import { auth } from "@clerk/nextjs/server";
import { Box } from "@mui/material";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default async function AuthLayout({ children }: { children: ReactNode }) {
	const { userId } = await auth();
	if (userId != null) redirect(`/users/${userId}`);
	return <Box className="flex h-screen w-full items-center justify-center">{children}</Box>;
}
