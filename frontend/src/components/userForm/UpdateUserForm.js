import React, { useState, useEffect, useRef } from 'react';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { ConfirmDialog } from 'primereact/confirmdialog';
import { Dropdown } from 'primereact/dropdown';
import { Toast } from 'primereact/toast';
import { Calendar } from 'primereact/calendar';

export default function UpdateUserForm(props) {
    const { visible, onHide, onUpdateUser, selectedUser } = props;
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [gender, setGender] = useState('');
    const [role, setRole] = useState('');
    const [id, setId] = useState('');
    const toast = useRef(null);
    const [roles, setRoles] = useState([]);
    const [birth_date, setBirthDate] = useState('');
    const [hasSuperAdminManageAuthority, setHasSuperAdminManageAuthority] = useState(false);
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);

    useEffect(() => {
        const user = localStorage.getItem('user');
        const parsedUser = JSON.parse(user);
        if (parsedUser.authorities) {
            setHasSuperAdminManageAuthority(parsedUser.authorities.includes('SUPERADMIN_MANAGE'));
        }
        if (selectedUser) {
            setName(selectedUser.name);
            setSurname(selectedUser.surname);
            setGender(selectedUser.gender);
            setRole(selectedUser.role.name);
            setId(selectedUser.id);
            setBirthDate(new Date(selectedUser.birth_date));
        }
    }, [selectedUser]);

    useEffect(() => {
        async function fetchRoles() {
            try {
                const response = await fetch("/api/role/getAllRole");
                const result = await response.json();
                const roleOptions = result.map(role => ({ label: role.name, value: role.name }));
                setRoles(roleOptions);
            } catch (error) {
                console.error(error);
            }
        }
        fetchRoles();
    }, []);

    const genderOptions = [
        { label: 'Male', value: 'MALE' },
        { label: 'Female', value: 'FEMALE' },
        { label: 'Other', value: 'OTHER' }
    ];

    const confirmUpdate = () => {
        setShowConfirmDialog(true);
    };

    const handleUpdateUser = () => {
        const updatedUser = {
            name: name,
            surname: surname,
            gender: gender,
            role: role,
            birth_date: birth_date.toISOString().split('T')[0]
        };
        onUpdateUser(updatedUser, id);
        onHide();
        setShowConfirmDialog(false);
    };

    return (
        <Dialog header="Update User" visible={visible} onHide={onHide} maximizable style={{ width: '50vw' }}>
            <div className="p-fluid p-formgrid p-grid">
                <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="birth_date">Birth Date</label>
                    <Calendar id="birth_date" value={birth_date} onChange={(e) => setBirthDate(e.value)} dateFormat="yy/mm/dd" />
                </div>
                <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="name">Name</label>
                    <InputText id="name" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="surname">Surname</label>
                    <InputText id="surname" value={surname} onChange={(e) => setSurname(e.target.value)} />
                </div>
                <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="gender">Gender</label>
                    <Dropdown id="gender" value={gender} options={genderOptions} onChange={(e) => setGender(e.value)} placeholder="Select Gender" />
                </div>
                {hasSuperAdminManageAuthority && (
                    <div className="p-field p-col-12 p-md-6">
                        <label htmlFor="role">Role</label>
                        <Dropdown id="role" value={role} options={roles} onChange={(e) => setRole(e.value)} placeholder="Select Role" />
                    </div>
                )}
                <Toast ref={toast} />
                <ConfirmDialog 
                    visible={showConfirmDialog} 
                    onHide={() => setShowConfirmDialog(false)} 
                    message="Are you sure you want to update?"
                    header="Confirmation" 
                    icon="pi pi-exclamation-triangle" 
                    accept={handleUpdateUser} 
                    reject={() => setShowConfirmDialog(false)} 
                />
                <div className="p-field p-col-12">
                    <Button label="Update User" icon="pi pi-check" className="add-user-button" onClick={confirmUpdate} />
                </div>
            </div>
        </Dialog>
    );
};
