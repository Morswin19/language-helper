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
					main: "#273469",
					light: "#5c6fa0",
					dark: "#1a2447",
					contrastText: "#FFFFFF",
				},
				secondary: {
					main: "#F68E5F",
					light: "#F9A882",
					dark: "#D4713F",
					contrastText: "#FFFFFF",
				},
				// @ts-expect-error i have not already add tertiary option to types
				tertiary: {
					main: "#C3D350",
					light: "#D4E074",
					dark: "#A4B43C",
					contrastText: "#FFFFFF",
				},
				info: {
					main: "#63ADF2",
					light: "#79B8F2",
					dark: "#4F90D9",
					contrastText: "#FFFFFF",
				},
				text: {
					primary: "#1E2749",
					secondary: "#273469",
				},
			},
		},
	},
});

export default theme;
