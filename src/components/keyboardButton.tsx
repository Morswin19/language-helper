import Button from "@mui/material/Button";

interface KeyboardButtonProps {
	text: string;
	keyboardKey: string;
	onClick: () => void;
}

export const KeyboardButton = ({ text, keyboardKey, onClick }: KeyboardButtonProps) => {
	return (
		<Button
			className="relative w-24"
			variant="contained"
			onClick={onClick}
			sx={{
				"&::after": {
					content: `"${keyboardKey}"`,
					marginRight: 1,
					fontSize: "0.7em",
					position: "absolute",
					bottom: 0,
					right: 0,
					display: { xs: "none", md: "block" },
				},
			}}
		>
			{text}
		</Button>
	);
};
