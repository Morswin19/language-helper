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
import { texts } from "@/constants/texts";
import { useEffect } from "react";
import { SignedIn, UserButton, useUser } from "@clerk/nextjs";

export const Header = () => {
	const { storeWords, getWords } = useWordStore();
	const { user } = useUser();
	const userId = user?.id;
	const userName = user?.firstName;
	console.log("userId", userId);

	useEffect(() => {
		if (!storeWords.length && userId) {
			getWords(userId);
		}
		console.log("storeWords", storeWords);
	}, [userId]);

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static">
				<Toolbar>
					<Box className="flex grow gap-2">
						<Link href={`/users/${userId}/words`}>
							<Button variant="outlined" color="secondary">
								<TocIcon />
								<Typography variant="subtitle2" className="hidden md:block">
									{texts.header.words}:
								</Typography>{" "}
								<Typography variant="subtitle2">{storeWords.length}</Typography>
							</Button>
						</Link>
						<Link href={`/users/${userId}/repeats`}>
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
						<Link href={`/users/${userId}/form`}>
							<Button variant="outlined" color="secondary">
								<AddIcon />{" "}
								<Typography variant="subtitle2" className="hidden md:block">
									{texts.header.add}
								</Typography>
							</Button>
						</Link>
					</Box>
					<Box className="flex items-center justify-items-end gap-2">
						{userName && (
							<Typography className="hidden capitalize md:block">
								{texts.header.hi} {userName}
							</Typography>
						)}
						<SignedIn>
							<UserButton />
						</SignedIn>
						<IconButton color="inherit" aria-label="menu">
							<PowerSettingsNewIcon />
						</IconButton>
					</Box>
				</Toolbar>
			</AppBar>
		</Box>
	);
};
