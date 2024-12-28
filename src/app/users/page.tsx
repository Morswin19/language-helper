import UsersCards from "../../components/userCards/usersCards";
import { getUsers } from "../../services/getUsers";

import { texts } from "@/constants/texts";

export default async function Users() {
	const users = await getUsers();

	return (
		<div className="min-h-screen items-center justify-items-center gap-16 p-8 pb-20 sm:p-20">
			<h1>{texts.login.choose}</h1>
			<UsersCards users={users} />
		</div>
	);
}
