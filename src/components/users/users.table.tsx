import { useEffect, useState } from 'react';
import type { TableProps } from 'antd';

import { Table, Button, notification, Popconfirm } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import CreateUserModal from './create.user.modal';
import UpdateUserModal from './update.user.modal';

export interface IUser {
    _id: string;
    name: string;
    email: string;
    role: string;
    password: string;
    age: string;
    address: string;
    gender: string;
}


const UserTable = () => {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [listUsers, setListUsers] = useState<IUser[]>([]);
    const [dataUpdate, setDataUpdate] = useState<null | IUser>(null);

    const access_token = localStorage.getItem("access_token") as string;

    const [meta, setMeta] = useState({
        current: 1,
        pageSize: 5,
        pages: 0,
        total: 0
    })

    useEffect(() => {
        //chế độ dev chạy 2 lần
        getData();
    }, []);

    const confirm = async (id: String) => {
        const deleteUser = await fetch(
            `http://localhost:8000/api/v1/users/${id}`,
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${access_token}`
                },
                method: 'DELETE'
            })

        const dataUser = await deleteUser.json();
        if (dataUser?.data) {
            notification.success({
                message: dataUser?.message || 'Xóa user thành công',
            });
            await getData();
        } else {
            notification.error({
                message: JSON.stringify(dataUser?.message) || 'Error',
            });
        }
    };

    const getData = async () => {
        const resUser = await fetch(
            `http://localhost:8000/api/v1/users?current=${meta.current}&pageSize=${meta.pageSize}`,
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${access_token}`
                }
            })

        const dataUser = await resUser.json();
        if (!dataUser.data) {
            notification.error({
                message: JSON.stringify(dataUser?.message) || 'Error',
            });
        }
        setListUsers(dataUser.data.result);
        setMeta(dataUser.data.meta);
    }

    const handleOnChange = async (page: number, pageSize: number) => {


        const resUser = await fetch(
            `http://localhost:8000/api/v1/users?current=${page}&pageSize=${pageSize}`,
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${access_token}`
                }
            })

        const dataUser = await resUser.json();
        if (!dataUser.data) {
            notification.error({
                message: JSON.stringify(dataUser?.message) || 'Error',
            });
        }
        setListUsers(dataUser.data.result);
        setMeta(dataUser.data.meta);
    }

    const columns: TableProps<IUser>['columns'] = [
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
                    <div>
                        <button onClick={() => {
                            setDataUpdate(record);
                            setIsUpdateModalOpen(true);
                        }}> Edit</button >

                        <Popconfirm
                            title="Delete the user"
                            description={`Are you sure to delete user ${record.name} ?`}
                            onConfirm={() => confirm(record._id)}
                            okText="Yes"
                            cancelText="No"
                        >
                            <Button danger type="primary" style={{ marginLeft: 12 }}>Delete</Button>
                        </Popconfirm>

                    </div >
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

            <Table<IUser>
                columns={columns}
                dataSource={listUsers}
                rowKey={record => record._id}
                pagination={{
                    current: meta.current,
                    pageSize: meta.pageSize,
                    total: meta.total,
                    showTotal: (total, range) => `${range[0]} - ${range[1]} of ${total} items`,
                    onChange: (page: number, pageSize: number) => handleOnChange(page, pageSize),
                    showSizeChanger: true
                }}
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
                dataUpdate={dataUpdate}
                setDataUpdate={setDataUpdate}
            />
        </div >
    );
}

export default UserTable;