"use client";

import { useRouter } from "next/navigation";
import { User } from "@/app/models/User";
import theme from "@/theme";
import { Button, Card, CardActions, CardContent, Typography, useTheme } from "@mui/material";

export default function UsersCards({ users }: { users: User[] }) {
	const router = useRouter();

	const handleClick = (userId: string) => {
		router.push(`/users/${userId}`);
	};

	return users.map((user: User) => (
		<>
			<Card key={user._id} sx={{ width: 275, bgcolor: theme.palette.primary.dark, m: 2 }}>
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
						GO
					</Button>
				</CardActions>
			</Card>
		</>
	));
}
