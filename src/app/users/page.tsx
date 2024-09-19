import { User } from "../models/User";

export default async function Users () {
    console.log('Loading');
    const fetchUsers = async () => {
        const res = await fetch("http://localhost:3000/api/users");
        const jsonRes = await res.json();
        const users = jsonRes.users;

        console.log(users);

        return users;
    }

    const users = await fetchUsers();

    console.log(users);

    return (
        <div>
            <h1>This users are mine</h1>
            {users.map((user: User) => (
                <div key={user._id}>
                    <h2>{user.username}</h2>
                    <p>{user.email}</p>
                    <a href={`/users/${user._id}`}><button>Go to users details</button></a>
                </div>
            ))}
        </div>
    )
}