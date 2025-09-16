import { useEffect, useState } from 'react';
import '../../styles/users.css';

interface User {
    id: string;
    name: string;
    email: string;
    role: string;
}

const UserTable = () => {

    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        console.log('UserTable component mounted');

        getData();
    }, []);

    const getData = async () => {
        const res = await fetch('http://localhost:8000/api/v1/auth/login', {
            method: "POST",
            body: JSON.stringify({
                username: "admin@gmail.com",
                password: "123456"
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })

        const data = await res.json();

        const access_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0b2tlbiBsb2dpbiIsImlzcyI6ImZyb20gc2VydmVyIiwiX2lkIjoiNjhjODNiZmMyOTQ3MzI2YzdjOWIyMjZiIiwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJhZGRyZXNzIjoiVmlldE5hbSIsImlzVmVyaWZ5Ijp0cnVlLCJuYW1lIjoiSSdtIGFkbWluIiwidHlwZSI6IlNZU1RFTSIsInJvbGUiOiJBRE1JTiIsImdlbmRlciI6Ik1BTEUiLCJhZ2UiOjY5LCJpYXQiOjE3NTc5OTY0ODcsImV4cCI6MTg0NDM5NjQ4N30.KOX4G3Q7tWsyaLIyLZXxWweJcsLboQfXFBze94ydmtI";
        const resUser = await fetch('http://localhost:8000/api/v1/users/all', {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${access_token}`
            }
        })

        const dataUser = await resUser.json();
        setUsers(dataUser.data.result);
        console.log(dataUser);
    }

    return (
        <div>
            <h2>Table Users</h2>

            <table>
                <thead>
                    <tr>
                        <th>Email</th>
                        <th>Name</th>
                        <th>Role</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map(user => {
                            return (
                                <tr key={user.id}>
                                    <td>{user.email}</td>
                                    <td>{user.name}</td>
                                    <td>{user.role}</td>
                                </tr>
                            );
                        })
                    }

                </tbody>
            </table>
        </div>
    );
}

export default UserTable;