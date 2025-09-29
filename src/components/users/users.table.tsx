import { useEffect, useState } from 'react';
import type { TableProps } from 'antd';

import { Table, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import CreateUserModal from './create.user.modal';
import UpdateUserModal from './update.user.modal';



interface User {
    _id: string;
    name: string;
    email: string;
    role: string;
}


const UserTable = () => {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [listUsers, setListUsers] = useState<User[]>([]);

    const access_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0b2tlbiBsb2dpbiIsImlzcyI6ImZyb20gc2VydmVyIiwiX2lkIjoiNjhjODNiZmMyOTQ3MzI2YzdjOWIyMjZiIiwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJhZGRyZXNzIjoiVmlldE5hbSIsImlzVmVyaWZ5Ijp0cnVlLCJuYW1lIjoiSSdtIGFkbWluIiwidHlwZSI6IlNZU1RFTSIsInJvbGUiOiJBRE1JTiIsImdlbmRlciI6Ik1BTEUiLCJhZ2UiOjY5LCJpYXQiOjE3NTc5OTY0ODcsImV4cCI6MTg0NDM5NjQ4N30.KOX4G3Q7tWsyaLIyLZXxWweJcsLboQfXFBze94ydmtI";

    useEffect(() => {

        getData();
    }, []);

    const getData = async () => {
        const resUser = await fetch('http://localhost:8000/api/v1/users/all', {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${access_token}`
            }
        })

        const dataUser = await resUser.json();

        setListUsers(dataUser.data.result);
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
        {
            title: 'Actions',
            render: (value, record) => {
                return (
                    <div><button onClick={() => {
                        console.log("=>>>> check record", record);
                        setIsUpdateModalOpen(true);
                    }}> Edit</button ></div >
                );
            }
        },
    ];


    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2>Table Users</h2>
                <div>
                    <Button type="primary"
                        icon={<PlusOutlined />}
                        onClick={() => setIsCreateModalOpen(true)}
                    >Add new</Button>
                </div>
            </div>

            <Table<User>
                columns={columns}
                dataSource={listUsers}
                rowKey={record => record._id}
            />

            <CreateUserModal
                access_token={access_token}
                getData={getData}
                isCreateModalOpen={isCreateModalOpen}
                setIsCreateModalOpen={setIsCreateModalOpen}
            />

            <UpdateUserModal
                access_token={access_token}
                getData={getData}
                isUpdateModalOpen={isUpdateModalOpen}
                setIsUpdateModalOpen={setIsUpdateModalOpen}
            />
        </div >
    );
}

export default UserTable;