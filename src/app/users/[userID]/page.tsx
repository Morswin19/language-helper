import { getUser } from "@/app/requests/getUser";
import { getUserWords } from "@/app/requests/getUserWords";

export default async function UserDetails({ params }: { params: { userID: string } }) {
	const user = await getUser(params.userID);
	const words = await getUserWords(params.userID);

	return (
		<div className="min-h-screen items-center justify-items-center gap-16 p-8 pb-20 sm:p-20">
			<h1>Hello {user.username}</h1>
			<div>
				<p>Last Login: {new Date(user.lastLogin).toLocaleString()}</p>
				<p>Streak: {user.streak}</p>
			</div>
		</div>
	);
}
