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
	},
});

export default theme;
