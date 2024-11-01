"use client";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
	typography: {
		fontFamily: "var(--font-roboto)",
	},
	palette: {
		primary: {
			main: "#000000",
			light: "#DDDDDD",
			dark: "#333333",
			contrastText: "#FFFFFF",
		},
		secondary: {
			main: "#FFFFFF",
			light: "#DDDDDD",
			dark: "#333333",
			contrastText: "#000000",
		},
	},
});

export default theme;
