import type { Metadata } from "next";
import "./globals.css";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { Roboto } from "next/font/google";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../theme";
import * as React from "react";
import NotificationContainer from "@/components/notificationContainer";
import { ClerkProvider } from "@clerk/nextjs";
import { Header } from "@/components/header/header";
import { Box } from "@mui/material";

const roboto = Roboto({
	weight: ["300", "400", "500", "700"],
	subsets: ["latin"],
	display: "swap",
	variable: "--font-roboto",
});

export const metadata: Metadata = {
	title: "Language Helper",
	description: "App to develop your language skills",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
			<html lang="en">
				<body className={roboto.variable}>
					<AppRouterCacheProvider options={{ key: `css` }}>
						<ThemeProvider theme={theme}>
							<Header />
							<Box>{children}</Box>
							<NotificationContainer />
						</ThemeProvider>
					</AppRouterCacheProvider>
				</body>
			</html>
		</ClerkProvider>
	);
}
