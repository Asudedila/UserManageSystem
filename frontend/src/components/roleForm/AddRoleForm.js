import React, { useState } from 'react';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';

export default function AddRole (props) {
    const { visible, onHide, onAddRole}=props;
    const [name, setName] = useState('');


    const handleAddRole = () => {
        const newUser = { name };
        onAddRole(newUser);
        onHide();
    };

    return (
        <Dialog header="Add Role" visible={visible} onHide={onHide} maximizable style={{ width: '50vw' }} >
            <div className="p-fluid p-formgrid p-grid">
                <div >
                    <label htmlFor="name">Name</label>
                    <InputText id="name" value={name} onChange={(e) => setName(e.target.value)}  />
                </div>
               
                <div className="p-field p-col-12">
                    <Button label="Add Role" icon="pi pi-check" className="p-button-success" onClick={handleAddRole} />
                </div>
            </div>
        </Dialog>
    );
};

