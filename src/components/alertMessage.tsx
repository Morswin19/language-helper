import * as React from "react";
import Alert from "@mui/material/Alert";

export default function AlertMessage({
	severity,
	text,
}: {
	severity: "success" | "error" | "info" | "warning";
	text: string;
}) {
	return <Alert severity={severity}>{text}</Alert>;
}
