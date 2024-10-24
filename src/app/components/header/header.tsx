import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import { getUserWords } from "@/app/requests/getUserWords";

export const Header = async ({ userID }: { userID: string }) => {
	const words = await getUserWords(userID);

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static">
				<Toolbar>
					<Typography variant="body2" component="div" sx={{ mr: 2 }}>
						Your Words: {words.length}
					</Typography>
					<Typography variant="body2" component="div" sx={{ flexGrow: 1 }}>
						Repeats for today:{" "}
						{words.filter((word) => new Date(word.nextRepeatDate) > new Date()).length}
					</Typography>
					<Button color="inherit">Login</Button>
					<IconButton color="inherit" aria-label="menu">
						<PowerSettingsNewIcon />
					</IconButton>
				</Toolbar>
			</AppBar>
		</Box>
	);
};
