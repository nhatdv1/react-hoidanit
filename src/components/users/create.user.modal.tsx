import { Modal, Input, notification,  Form, InputNumber, Select } from 'antd';

const { Option } = Select;

interface IProps {
    access_token: string;
    getData: any;
    isCreateModalOpen?: boolean;
    setIsCreateModalOpen: (v: boolean) => void;
}

const CreateUserModal = (props: IProps) => {
    const { access_token, getData, isCreateModalOpen, setIsCreateModalOpen } = props;

    const [form] = Form.useForm();

    const onFinish = async (values: any) => {
        console.log('Success:', values);
        const { name, email, password, age, gender, address, role} = values;
        const data = {name, email, password, age, gender, address, role};
        const newUser = await fetch('http://localhost:8000/api/v1/users', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${access_token}`
            }
        })

        const dataUser = await newUser.json();
        if (dataUser?.data) {
            setIsCreateModalOpen(false);
            notification.success({
                message: 'Success',
                description: `Add new user ${email} success`,
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
      };


    const handleCancel = () => {
        form.resetFields();
        setIsCreateModalOpen(false);
    }

    return (
        <Modal
            title="Add new user"
            closable={true}
            open={isCreateModalOpen}
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
                style={{marginBottom: 5}}
                label="Name"
                name="name"
                rules={[{ required: true, message: 'Please input your name!' }]}
                >
                <Input />
                </Form.Item>

                <Form.Item
                style={{marginBottom: 5}}
                label="Email"
                name="email"
                rules={[{ required: true, message: 'Please input your email!' }]}
                >
                <Input />
                </Form.Item>

                <Form.Item
                style={{marginBottom: 5}}
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
                >
                <Input.Password />
                </Form.Item>

                <Form.Item
                style={{marginBottom: 5}}
                label="Age"
                name="age"
                rules={[{ required: true, message: 'Please input your age!' }]}
                >
                <InputNumber style={{width:"100%"}} />
                </Form.Item>

                <Form.Item
                style={{marginBottom: 5}}
                label="Address"
                name="address"
                rules={[{ required: true, message: 'Please input your address!' }]}
                >
                <Input />
                </Form.Item>

                <Form.Item 
                label="Gender" style={{marginBottom: 5}}
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

export default CreateUserModal;