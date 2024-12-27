import UsersCards from "../components/userCards/usersCards";
import { getUsers } from "../requests/getUsers";

import { texts } from "@/app/constants/texts";

export default async function Users() {
	const users = await getUsers();

	return (
		<div className="min-h-screen items-center justify-items-center gap-16 p-8 pb-20 sm:p-20">
			<h1>Who you are?</h1>
			<UsersCards users={users} />
		</div>
	);
}
