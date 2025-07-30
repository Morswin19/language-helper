import { SignUp } from "@clerk/nextjs";
import { Box } from "@mui/material";

export default function SignUpPage() {
	return (
		<Box className="flex h-screen w-full items-center justify-center">
			<SignUp />
		</Box>
	);
}
