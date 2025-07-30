"use client";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
	typography: {
		fontFamily: "var(--font-roboto)",
	},
	palette: {
		primary: {
			main: "#131313",
			light: "#1A1A1A",
			dark: "#353535",
			contrastText: "#FFFFFF",
		},
		secondary: {
			main: "#FFFFFF",
			light: "#DDDDDD",
			dark: "#353535",
			contrastText: "#000000",
		},
	},
});

export default theme;
