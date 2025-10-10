import { useEffect, useState } from 'react';
import { Modal, Input, notification } from 'antd';
import { IUser } from './users.table';


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

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const [address, setAddress] = useState('');
    const [role, setRole] = useState('');

    useEffect(() => {
        //update sau khi gen dom
        if (dataUpdate) {
            setName(dataUpdate.name);
            setEmail(dataUpdate.email);
            setPassword(dataUpdate.password);
            setAge(dataUpdate.age);
            setGender(dataUpdate.gender);
            setAddress(dataUpdate.address);
            setRole(dataUpdate.role);
        }
    }, [dataUpdate])

    const handleOk = async () => {
        const data = {
            _id: dataUpdate?._id,
            name, email, password, age, gender, address, role
        }

        const userUpdated = await fetch('http://localhost:8000/api/v1/users', {
            method: 'PATCH',
            body: JSON.stringify({ ...data }),
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
    };


    const handleCancel = () => {
        setIsUpdateModalOpen(false);
        setDataUpdate
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
            title="Update user"
            closable={true}
            open={isUpdateModalOpen}
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
                    disabled
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

export default UpdateUserModal;