"use client";

import { useRouter } from "next/navigation";
import { User } from "@/models/User";
import theme from "@/theme";
import { Button, Card, CardActions, CardContent, Typography } from "@mui/material";
import { Fragment } from "react";
import { texts } from "@/constants/texts";

export default function UsersCards({ users }: { users: User[] }) {
	const router = useRouter();

	const handleClick = (userId: string) => {
		router.push(`/users/${userId}`);
	};

	return users.map((user: User) => (
		<Fragment key={user._id}>
			<Card sx={{ width: 275, bgcolor: theme.palette.primary.dark, m: 2 }}>
				<CardContent>
					<Typography sx={{ color: theme.palette.primary.contrastText, mb: 1.5 }}>
						{user.username}
					</Typography>
					<Typography sx={{ color: theme.palette.primary.contrastText, mb: 1.5 }}>
						{user.email}
					</Typography>
				</CardContent>
				<CardActions>
					<Button
						onClick={() => handleClick(user._id)}
						sx={{
							color: theme.palette.primary.contrastText,
							mb: 1.5,
							bgcolor: theme.palette.primary.main,
						}}
						size="small"
					>
						{texts.login.go}
					</Button>
				</CardActions>
			</Card>
		</Fragment>
	));
}
