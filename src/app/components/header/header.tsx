import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import AddIcon from "@mui/icons-material/Add";
import RepeatIcon from "@mui/icons-material/Repeat";
import TocIcon from "@mui/icons-material/Toc";
import { getUserWords } from "@/app/requests/getUserWords";
import { getUser } from "@/app/requests/getUser";
import Link from "next/link";
import Typography from "@mui/material/Typography";

export const Header = async ({ userID }: { userID: string }) => {
	const words = await getUserWords(userID);
	const user = await getUser(userID);

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static">
				<Toolbar>
					<Box className="flex grow gap-2">
						<Link href={`/users/${userID}/words`}>
							<Button variant="outlined" color="secondary">
								<TocIcon />
								<Typography variant="subtitle2" className="hidden md:block">
									Your Words:
								</Typography>{" "}
								<Typography variant="subtitle2">{words.length}</Typography>
							</Button>
						</Link>
						<Link href={`/users/${userID}/repeats`}>
							<Button variant="outlined" color="secondary">
								<RepeatIcon />
								<Typography variant="subtitle2" className="hidden md:block">
									Repeats for today:
								</Typography>{" "}
								<Typography variant="subtitle2">
									{words.filter((word) => new Date(word.nextRepeatDate) < new Date()).length}
								</Typography>
							</Button>
						</Link>
						<Link href={`/users/${userID}/form`}>
							<Button variant="outlined" color="secondary">
								<AddIcon />{" "}
								<Typography variant="subtitle2" className="hidden md:block">
									Add word
								</Typography>
							</Button>
						</Link>
					</Box>
					<Typography className="hidden md:block">Hello {user.username}</Typography>
					<IconButton color="inherit" aria-label="menu">
						<PowerSettingsNewIcon />
					</IconButton>
				</Toolbar>
			</AppBar>
		</Box>
	);
};
