import React, { useState,useRef ,useEffect} from 'react';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { ConfirmPopup,confirmPopup} from 'primereact/confirmpopup';
import { Toast } from 'primereact/toast';

export default function UpdateRoleForm (props) {
    
    const { visible, onHide, onUpdateRole ,selectedRole}=props;
    const [name, setName] = useState('');
    const [id, setId] = useState('');
    
    const toast = useRef(null);

    
    useEffect(() => {
        setName(selectedRole.name );
        setId(selectedRole.id );
        
    }, [selectedRole]);

    const confirm1 = (event) => {
        
        confirmPopup({
            target: event.currentTarget,
            message: 'Are you sure you want to update?',
            icon: 'pi pi-exclamation-triangle',
            defaultFocus: 'accept',
            accept:handleUpdateRole,
            reject:onHide
        });
    };

    
    const handleUpdateRole = () => {
        const newRole = { name };
        onUpdateRole(newRole,id);
        onHide();
    };

    return (
        <Dialog header="Update Role" visible={visible} onHide={onHide} maximizable style={{ width: '50vw' }} >
            <div className="p-fluid p-formgrid p-grid">
                
                <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="name">Name</label>
                    <InputText id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder={selectedRole.name}  />
                </div>
                
                
              <Toast ref={toast} />
                <ConfirmPopup  />
                <div className="p-field p-col-12">
                    <Button label="Update Role" icon="pi pi-check" className="add-user-button" onClick={confirm1} />
                </div>
            </div>
        </Dialog>
    );
};

