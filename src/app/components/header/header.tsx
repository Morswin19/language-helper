"use client";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import AddIcon from "@mui/icons-material/Add";
import RepeatIcon from "@mui/icons-material/Repeat";
import TocIcon from "@mui/icons-material/Toc";
import Link from "next/link";
import Typography from "@mui/material/Typography";
import { useWordStore } from "@/app/store/store";
import { useUserStore } from "@/app/store/userStore";
import { User } from "@/app/models/User";

export const Header = ({ user }: { user: User }) => {
	const { storeWords } = useWordStore();
	const { storeUser, setUser } = useUserStore();

	if (storeUser._id === "") {
		setUser(user);
	}

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static">
				<Toolbar>
					<Box className="flex grow gap-2">
						<Link href={`/users/${user._id}/words`}>
							<Button variant="outlined" color="secondary">
								<TocIcon />
								<Typography variant="subtitle2" className="hidden md:block">
									Your Words:
								</Typography>{" "}
								<Typography variant="subtitle2">{storeWords.length}</Typography>
							</Button>
						</Link>
						<Link href={`/users/${user._id}/repeats`}>
							<Button variant="outlined" color="secondary">
								<RepeatIcon />
								<Typography variant="subtitle2" className="hidden md:block">
									Repeats for today:
								</Typography>{" "}
								<Typography variant="subtitle2">
									{storeWords.filter((word) => new Date(word.nextRepeatDate) < new Date()).length}
								</Typography>
							</Button>
						</Link>
						<Link href={`/users/${user._id}/form`}>
							<Button variant="outlined" color="secondary">
								<AddIcon />{" "}
								<Typography variant="subtitle2" className="hidden md:block">
									Add word
								</Typography>
							</Button>
						</Link>
					</Box>
					<Typography className="hidden md:block">Hello {storeUser.username}</Typography>
					<IconButton color="inherit" aria-label="menu">
						<PowerSettingsNewIcon />
					</IconButton>
				</Toolbar>
			</AppBar>
		</Box>
	);
};
