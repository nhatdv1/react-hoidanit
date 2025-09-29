import { useState } from 'react';
import { Modal, Input, notification } from 'antd';


interface IProps {
    access_token: string;
    getData: any;
    isCreateModalOpen?: boolean;
    setIsCreateModalOpen: (v: boolean) => void;
}

const CreateUserModal = (props: IProps) => {
    const { access_token, getData, isCreateModalOpen, setIsCreateModalOpen } = props;

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const [address, setAddress] = useState('');
    const [role, setRole] = useState('');

    const handleOk = async () => {
        const data = {
            name, email, password, age, gender, address, role
        }

        const newUser = await fetch('http://localhost:8000/api/v1/users', {
            method: 'POST',
            body: JSON.stringify({ ...data }),
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
        setIsCreateModalOpen(false);
        setName('');
        setEmail('');
        setPassword('');
        setAge('');
        setGender('');
        setAddress('');
        setRole('');
    }

    return (
        <Modal
            title="Add new user"
            closable={true}
            open={isCreateModalOpen}
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
    );
}

export default CreateUserModal;