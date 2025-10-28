import { Modal, Input, notification, Form, InputNumber, Select } from 'antd';
import { IUser } from './users.table';
import { useEffect } from 'react';

const { Option } = Select;

interface IProps {
    access_token: string;
    getData: any;
    isUpdateModalOpen?: boolean;
    setIsUpdateModalOpen: (v: boolean) => void;
    dataUpdate?: null | IUser;
    setDataUpdate: (v: null | IUser) => void;
}

const UpdateUserModal = (props: IProps) => {
    const { access_token, getData, isUpdateModalOpen, setIsUpdateModalOpen, dataUpdate, setDataUpdate } = props;
    console.log("=>>>> check dataUpdate", dataUpdate);


    const [form] = Form.useForm();

    const onFinish = async (values: any) => {
        console.log('Success:', values);
        const { name, email, age, gender, address, role } = values;
        if (dataUpdate) {
            const data = {
                _id: dataUpdate._id,
                name, email, age, gender, role, address
            }

            const userUpdated = await fetch('http://localhost:8000/api/v1/users', {
                method: 'PATCH',
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${access_token}`
                }
            })

            const dataUser = await userUpdated.json();
            if (dataUser?.data) {
                setIsUpdateModalOpen(false);
                notification.success({
                    message: 'Success',
                    description: `Update user ${email} success`,
                    placement: 'topRight'
                })
                handleCancel();
                await getData();
            } else {
                notification.error({
                    message: 'Error',
                    description: dataUser.message,
                    placement: 'topRight'
                })
            }
        }

    };

    useEffect(() => {
        //update sau khi gen dom
        if (dataUpdate) {
            form.setFieldsValue({
                name: dataUpdate.name,
                email: dataUpdate.email,
                age: dataUpdate.age,
                address: dataUpdate.address,
                gender: dataUpdate.gender,
                role: dataUpdate.role
            })
        }
    }, [dataUpdate])


    const handleCancel = () => {
        setIsUpdateModalOpen(false);
        form.resetFields();
        setDataUpdate(null);
    }

    return (
        <Modal
            title="Update user"
            closable={true}
            open={isUpdateModalOpen}
            onOk={() => form.submit()}
            onCancel={() => handleCancel()}
            maskClosable={false}
        >
            <Form
                name="basic"
                onFinish={onFinish}
                layout='vertical'
                form={form}
            >
                <Form.Item
                    style={{ marginBottom: 5 }}
                    label="Name"
                    name="name"
                    rules={[{ required: true, message: 'Please input your name!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    style={{ marginBottom: 5 }}
                    label="Email"
                    name="email"
                    rules={[{ required: true, message: 'Please input your email!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    style={{ marginBottom: 5 }}
                    label="Password"
                    name="password"
                    rules={[{ required: dataUpdate ? false : true, message: 'Please input your password!' }]}
                >
                    <Input.Password disabled={dataUpdate ? true : false} />
                </Form.Item>

                <Form.Item
                    style={{ marginBottom: 5 }}
                    label="Age"
                    name="age"
                    rules={[{ required: true, message: 'Please input your age!' }]}
                >
                    <InputNumber style={{ width: "100%" }} />
                </Form.Item>

                <Form.Item
                    style={{ marginBottom: 5 }}
                    label="Address"
                    name="address"
                    rules={[{ required: true, message: 'Please input your address!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Gender" style={{ marginBottom: 5 }}
                    name="gender" rules={[{ required: true, message: 'Please input your address!' }]}
                >
                    <Select placeholder="Select a option and change input text above" allowClear>
                        <Option value="MALE">male</Option>
                        <Option value="FEMALE">female</Option>
                        <Option value="OTHER">other</Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    label="Role"
                    name="role"
                    rules={[{ required: true, message: 'Please input your role!' }]}
                >
                    <Select placeholder="Select a option and change input text above" allowClear>
                        <Option value="ADMIN">Admin</Option>
                        <Option value="USER">User</Option>
                    </Select>
                </Form.Item>


            </Form>

        </Modal>
    );
}

export default UpdateUserModal;