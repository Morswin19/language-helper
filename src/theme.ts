"use client";
import { extendTheme } from "@mui/material/styles";

const theme = extendTheme({
	typography: {
		fontFamily: "var(--font-roboto)",
	},
	colorSchemes: {
		light: {
			palette: {
				primary: {
					main: "#131313",
					light: "#353535",
					dark: "#1A1A1A",
					contrastText: "#FFFFFF",
				},
				secondary: {
					main: "#DDDDDD",
					light: "#FFFFFF",
					dark: "#BBBBBB",
					contrastText: "#000000",
				},
			},
		},
	},
});

export default theme;
