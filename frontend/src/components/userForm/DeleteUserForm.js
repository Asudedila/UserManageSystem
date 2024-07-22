import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';

export default function DeleteUserForm (props) {

    const { visible, onHide, onDeleteUser ,selectedUser}=props;
    const [id, setId] = useState('');

    useEffect(() => {
        setId(selectedUser.id)
        
    }, [selectedUser.id]);

    
    const handleDeleteUser = () => {
        onDeleteUser(id);
        onHide();
    };

    return (
        
        <Dialog header="Delete User" visible={visible} onHide={onHide} maximizable style={{ width: '50vw' }} >
              
            <div className="p-fluid p-formgrid p-grid">
            <p>Are you sure you want to delete {selectedUser.name}? </p>
                <div >
                    <Button onClick={onHide} label="Reject" className="p-button-danger p-mr-2" icon="pi pi-times"  />
                    <Button onClick={handleDeleteUser} label="Accept" className="p-button-success" icon="pi pi-check"  />
                </div>
            </div>
        </Dialog>
    );
};

