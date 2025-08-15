import Box from "@mui/material/Box";

export default async function UserLayout({ children }: { children: React.ReactNode }) {
	return <Box className="p-4 md:p-20">{children}</Box>;
}
