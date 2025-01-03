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
import { useWordStore } from "@/store/wordStore";
import { useUserStore } from "@/store/userStore";
import { texts } from "@/constants/texts";
import { useEffect } from "react";

export const Header = ({ userId }: { userId: string }) => {
	const { storeWords, getWords } = useWordStore();
	const { storeUser, getUserInfo } = useUserStore();

	if (storeUser._id === "") {
		getUserInfo(userId);
	}

	useEffect(() => {
		if (!storeWords.length) {
			getWords(userId);
		}
	}, []);

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static">
				<Toolbar>
					<Box className="flex grow gap-2">
						<Link href={`/users/${storeUser._id}/words`}>
							<Button variant="outlined" color="secondary">
								<TocIcon />
								<Typography variant="subtitle2" className="hidden md:block">
									{texts.header.words}:
								</Typography>{" "}
								<Typography variant="subtitle2">{storeWords.length}</Typography>
							</Button>
						</Link>
						<Link href={`/users/${storeUser._id}/repeats`}>
							<Button variant="outlined" color="secondary">
								<RepeatIcon />
								<Typography variant="subtitle2" className="hidden md:block">
									{texts.header.repeats}:
								</Typography>{" "}
								<Typography variant="subtitle2">
									{storeWords.filter((word) => new Date(word.nextRepeatDate) < new Date()).length}
								</Typography>
							</Button>
						</Link>
						<Link href={`/users/${storeUser._id}/form`}>
							<Button variant="outlined" color="secondary">
								<AddIcon />{" "}
								<Typography variant="subtitle2" className="hidden md:block">
									{texts.header.add}
								</Typography>
							</Button>
						</Link>
					</Box>
					<Typography className="hidden capitalize md:block">
						{texts.header.hi} {storeUser.username}
					</Typography>
					<IconButton color="inherit" aria-label="menu">
						<PowerSettingsNewIcon />
					</IconButton>
				</Toolbar>
			</AppBar>
		</Box>
	);
};
