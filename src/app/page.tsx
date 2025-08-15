import Box from "@mui/material/Box";
import { texts } from "@/constants/texts";

export default async function Home() {
	return <Box className="align-center flex gap-8 p-8 pb-20 sm:p-20">{texts.user.do}</Box>;
}
