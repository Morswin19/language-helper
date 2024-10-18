import Link from "next/link";

export default async function Home() {
	return (
		<div className="min-h-screen items-center justify-items-center gap-16 p-8 pb-20 sm:p-20">
			<Link href="/users" className="m-4 rounded-md bg-black p-4 text-white">
				Users
			</Link>
		</div>
	);
}
