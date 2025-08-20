"use client";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import RepeatIcon from "@mui/icons-material/Repeat";
import TocIcon from "@mui/icons-material/Toc";
import Link from "next/link";
import Typography from "@mui/material/Typography";
import { useWordStore } from "@/store/wordStore";
import { texts } from "@/constants/texts";
import { useEffect } from "react";
import {
	SignedIn,
	SignedOut,
	SignInButton,
	SignUpButton,
	UserButton,
	useUser,
} from "@clerk/nextjs";

export const Header = () => {
	const { storeWords, getWords, clearWords } = useWordStore();
	const { user, isSignedIn } = useUser();
	const userName = user?.firstName;

	useEffect(() => {
		if (!storeWords.length && user?.id && isSignedIn) {
			getWords(user.id);
		} else if (!isSignedIn) {
			clearWords();
		}
	}, [isSignedIn, user?.id, storeWords.length, getWords, clearWords]);

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static">
				<Toolbar>
					{!!user?.id ? (
						<Box className="flex grow gap-2">
							<Link href={`/words`}>
								<Button
									variant="contained"
									sx={{
										color: "var(--mui-palette-tertiary-contrastText)",
										bgcolor: "var(--mui-palette-tertiary-main)",
									}}
								>
									<TocIcon />
									<Typography variant="subtitle2" className="hidden md:block">
										{texts.header.words}:
									</Typography>{" "}
									<Typography variant="subtitle2">{storeWords.length}</Typography>
								</Button>
							</Link>
							<Link href={`/repeats`}>
								<Button
									variant="contained"
									sx={{
										color: "var(--mui-palette-tertiary-contrastText)",
										bgcolor: "var(--mui-palette-tertiary-main)",
									}}
								>
									<RepeatIcon />
									<Typography variant="subtitle2" className="hidden md:block">
										{texts.header.repeats}:
									</Typography>{" "}
									<Typography variant="subtitle2">
										{storeWords.filter((word) => new Date(word.nextRepeatDate) < new Date()).length}
									</Typography>
								</Button>
							</Link>
							<Link href={`/form`}>
								<Button
									variant="contained"
									sx={{
										color: "var(--mui-palette-tertiary-contrastText)",
										bgcolor: "var(--mui-palette-tertiary-main)",
									}}
								>
									<AddIcon />{" "}
									<Typography variant="subtitle2" className="hidden md:block">
										{texts.header.add}
									</Typography>
								</Button>
							</Link>
						</Box>
					) : (
						<Box className="grow"></Box>
					)}

					<Box className="flex items-center justify-items-end gap-2">
						{userName && (
							<Typography className="hidden capitalize md:block">
								{texts.header.hi} {userName}
							</Typography>
						)}
						<SignedIn>
							<UserButton />
						</SignedIn>
						<SignedOut>
							<SignInButton>
								<Button variant="contained" color="warning" className="!rounded-md">
									{texts.auth.signIn}
								</Button>
							</SignInButton>
							<SignUpButton>
								<Button variant="contained" color="warning" className="!rounded-md">
									{texts.auth.signUp}
								</Button>
							</SignUpButton>
						</SignedOut>
					</Box>
				</Toolbar>
			</AppBar>
		</Box>
	);
};
