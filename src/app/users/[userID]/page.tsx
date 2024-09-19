import { User } from "@/app/models/User";

export default async function UserDetails ({params}:{params: {userID: string}}) {
    console.log('Loading');
    console.log(params.userID);
    const fetchUsers = async () => {
        const res = await fetch(`http://localhost:3000/api/users/${params.userID}`);
        const jsonRes = await res.json();
        const user: User = await jsonRes.user;

        console.log(user);

        return user;
    }

    const user = await fetchUsers();

    console.log(user);

    return (
        <div>
            <h1>This users are mine</h1>
                <div>
                    <p>Email: {user.email}</p>
                    <p>Last Login: {new Date(user.lastLogin).toLocaleString()}</p>
                    <p>Streak: {user.streak}</p>
                </div>
        </div>
    )
}