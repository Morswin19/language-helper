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
					main: "#00A8CC",
					light: "#33B9D6",
					dark: "#007D99",
					contrastText: "#FFFFFF",
				},
				// @ts-expect-error i have not already add tertiary option to types
				tertiary: {
					main: "#C3D350",
					light: "#D4E074",
					dark: "#A4B43C",
					contrastText: "#1E2749",
				},
				quartenary: {
					main: "#E6D5C3",
					light: "#FFEEDB",
					dark: "#C3B4A0",
					contrastText: "#1E2749",
				},
				common: {
					black: "#000000",
					white: "#FFFFFF",
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
