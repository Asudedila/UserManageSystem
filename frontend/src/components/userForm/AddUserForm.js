import React, { useState,useEffect,useRef } from 'react';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Toast } from 'primereact/toast';
import { Calendar } from 'primereact/calendar';
import { ConfirmPopup,confirmPopup} from 'primereact/confirmpopup';

export default function AddUser (props) {
    
    const { visible, onHide, onAddUser }=props;
    const [tc, setTc] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [gender, setGender] = useState(null);
    const [role, setRole] = useState('');
    const [birth_date, setBirthDate] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const toast = useRef(null);
    
    const [roles, setRoles] = useState([]);
    
    useEffect(() => {
        async function fetchRoles() {
        
        try {
            const response = await fetch("/api/role/getAllRole");
            const result = await response.json();

            const roleOptions=result.map(role=>({ label: role.name, value: role.name }));
            setRoles(roleOptions);
        }catch(error){

        } 
        }

        fetchRoles();
    }, []);

    
    const confirm = (event) => {
        
    confirmPopup({
        target: event.currentTarget,
        message: 'Are you sure you want to add?',
        icon: 'pi pi-exclamation-triangle',
        defaultFocus: 'accept',
        accept:handleAddUser,
        reject:onHide
    });
};
    
    const genderOptions = [
        { label: 'Male', value: 'MALE' },
        { label: 'Female', value: 'FEMALE' },
        { label: 'Other', value: 'OTHER' }
    ];

    const handleAddUser = () => {
        const newUser = { tc,name, surname, gender, username,password,role,birth_date };
        onAddUser(newUser);
        onHide();
    };

    return (
        <Dialog header="Add User" visible={visible} onHide={onHide} maximizable style={{ width: '50vw' }} >
            <div className="p-fluid p-formgrid p-grid">
            <   div className="p-field p-col-12 p-md-6">
                    <label htmlFor="username">Username</label>
                    <InputText id="username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Write username"  />
                </div>

                <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="password">Password</label>
                    <InputText id="password" value={password} onChange={(e) => setPassword(e.target.value)}  placeholder="Write password"  />
                </div>
                <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="tc">TC</label>
                    <InputText id="tc" value={tc} onChange={(e) => setTc(e.target.value)} placeholder="Write TC"  />
                </div>
                <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="birth_date">Birth Date</label>
                    < Calendar value={birth_date} onChange={(e) => setBirthDate(e.value)} dateFormat="yy/mm/dd" placeholder="Choose Birth Date" />
                </div>
                <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="name">Name</label>
                    <InputText id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Write name"  />
                </div>

                <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="surname">Surname</label>
                    <InputText id="surname" value={surname} onChange={(e) => setSurname(e.target.value)}  placeholder="Write surname"  />
                </div>

                <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="gender">Gender</label>
                    <Dropdown id="gender" value={gender} options={genderOptions} onChange={(e) => setGender(e.value)} placeholder="Select a Gender" />
                </div>

                <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="role">Role</label>
                    <Dropdown id="role" value={role} options={roles} onChange={(e) => setRole(e.target.value)} placeholder="Select a Role" />
                </div>

                <Toast ref={toast} />
                <ConfirmPopup  />
                <div className="p-field p-col-12">
                    <Button label="Add User" icon="pi pi-check" className="add-user-button" onClick={confirm} />
                </div>
            </div>
        </Dialog>
    );
};

