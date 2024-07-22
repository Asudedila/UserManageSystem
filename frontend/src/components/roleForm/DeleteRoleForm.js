import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';

export default function DeleteRoleForm (props) {

    const { visible, onHide, onDeleteRole ,selectedRole}=props;
    const [id, setId] = useState('');

    useEffect(() => {
        setId(selectedRole.id)
        
    }, [selectedRole.id]);

    
    const handleDeleteRole = () => {
        onDeleteRole(id);
        onHide();
    };

    return (
        
        <Dialog header="Delete User" visible={visible} onHide={onHide} maximizable style={{ width: '50vw' }} >
              
            <div className="p-fluid p-formgrid p-grid">
            <p>Are you sure you want to delete {selectedRole.name}? </p>
                <div >
                    <Button onClick={onHide} label="Reject" className="p-button-danger p-mr-2" icon="pi pi-times"  />
                    <Button onClick={handleDeleteRole} label="Accept" className="p-button-success" icon="pi pi-check"  />
                </div>
            </div>
        </Dialog>
    );
};

