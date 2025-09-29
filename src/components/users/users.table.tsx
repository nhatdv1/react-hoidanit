import { useEffect, useState } from 'react';
import type { TableProps } from 'antd';

import { Table, Button, Modal, Input, notification } from 'antd';
import { PlusOutlined } from '@ant-design/icons';



interface User {
    _id: string;
    name: string;
    email: string;
    role: string;
}


const UserTable = () => {
    const [listUsers, setListUsers] = useState<User[]>([]);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const [address, setAddress] = useState('');
    const [role, setRole] = useState('');
    const access_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0b2tlbiBsb2dpbiIsImlzcyI6ImZyb20gc2VydmVyIiwiX2lkIjoiNjhjODNiZmMyOTQ3MzI2YzdjOWIyMjZiIiwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJhZGRyZXNzIjoiVmlldE5hbSIsImlzVmVyaWZ5Ijp0cnVlLCJuYW1lIjoiSSdtIGFkbWluIiwidHlwZSI6IlNZU1RFTSIsInJvbGUiOiJBRE1JTiIsImdlbmRlciI6Ik1BTEUiLCJhZ2UiOjY5LCJpYXQiOjE3NTc5OTY0ODcsImV4cCI6MTg0NDM5NjQ4N30.KOX4G3Q7tWsyaLIyLZXxWweJcsLboQfXFBze94ydmtI";

    useEffect(() => {
        console.log('UserTable component mounted');

        getData();
    }, []);

    const handleOk = async () => {
        const data = {
            name, email, password, age, gender, address, role
        }
        console.log("=>>>> check data", data);

        const newUser = await fetch('http://localhost:8000/api/v1/users', {
            method: 'POST',
            body: JSON.stringify({ ...data }),
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${access_token}`
            }
        })

        const dataUser = await newUser.json();
        console.log(">>> check data user", dataUser);
        if (dataUser?.data) {
            setIsModalOpen(false);
            notification.success({
                message: 'Success',
                description: `Add new user ${email} success`,
                placement: 'topRight'
            })
            await getData();
        } else {
            notification.error({
                message: 'Error',
                description: dataUser.message,
                placement: 'topRight'
            })
        }
    };


    const getData = async () => {
        const data = {
            name, email, password, age, gender, address, role
        }
        console.log("=>>>> check data", data);

        const resUser = await fetch('http://localhost:8000/api/v1/users/all', {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${access_token}`
            }
        })

        const dataUser = await resUser.json();

        setListUsers(dataUser.data.result);
    }

    const handleCancel = () => {
        setIsModalOpen(false);
        setName('');
        setEmail('');
        setPassword('');
        setAge('');
        setGender('');
        setAddress('');
        setRole('');
    }

    const columns: TableProps<User>['columns'] = [
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'name',
            render: (value, record) => {
                return (<a>{record.email}</a>);
            }
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
        },
    ];


    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2>Table Users</h2>
                <div>
                    <Button type="primary"
                        icon={<PlusOutlined />}
                        onClick={() => setIsModalOpen(true)}
                    >Add new</Button>
                </div>
            </div>

            <Modal
                title="Add new user"
                closable={true}
                open={isModalOpen}
                onOk={handleOk}
                onCancel={() => handleCancel()}
                maskClosable={false}
            >
                <div>
                    <label htmlFor="">Name:</label>
                    <Input placeholder="Name"
                        value={name}
                        onChange={(event) => setName(event.target.value)} />
                </div>

                <div>
                    <label htmlFor="">Email:</label>
                    <Input placeholder="Email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)} />
                </div>
                <div>
                    <label htmlFor="">Password:</label>
                    <Input placeholder="Password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)} />
                </div>
                <div>
                    <label htmlFor="">Age:</label>
                    <Input placeholder="Age"
                        value={age}
                        onChange={(event) => setAge(event.target.value)} />
                </div>
                <div>
                    <label htmlFor="">Gender:</label>
                    <Input placeholder="Gender"
                        value={gender}
                        onChange={(event) => setGender(event.target.value)} />
                </div>
                <div>
                    <label htmlFor="">Address:</label>
                    <Input placeholder="Address"
                        value={address}
                        onChange={(event) => setAddress(event.target.value)} />
                </div>
                <div>
                    <label htmlFor="">Role:</label>
                    <Input placeholder="Role"
                        value={role}
                        onChange={(event) => setRole(event.target.value)} />
                </div>

            </Modal>



            <Table<User>
                columns={columns}
                dataSource={listUsers}
                rowKey={record => record._id}
            />
        </div >
    );
}

export default UserTable;