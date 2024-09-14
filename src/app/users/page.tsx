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
            {users.map((user: any) => (
                <div key={user._id}>
                    <h2>{user.name}</h2>
                    <p>{user.description}</p>
                    <p>{user.price}</p>
                </div>
            ))}
        </div>
    )
}