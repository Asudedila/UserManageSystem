import React, { useEffect, useState } from 'react';
import DataTableComponent from '../../components/table/DataTableComponents';
import { Button } from 'primereact/button';
import { Messages } from 'primereact/messages';
import AddUserForm from '../../components/userForm/AddUserForm';
import DeleteUserForm from '../../components/userForm/DeleteUserForm';
import UpdateUserForm from '../../components/userForm/UpdateUserForm';

export default  function Users() {
  const [users, setUsers] = useState([]);
  const [isLoading,setIsLoading]=useState(false);
  const [showAddUserDialog, setShowAddUserDialog] = useState(false);
  const [showDeleteUserDialog, setShowDeleteUserDialog] = useState(false);
  const [showUpdateUserDialog, setShowUpdateUserDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(false);

  const user = localStorage.getItem('user');
  const parsedUser = JSON.parse(user);
  const token=parsedUser.token;

  useEffect(() => {
    async function fetchUsers() {
      setIsLoading(true);
      
      try {
        const response = await fetch("/api/getAll");
        const result = await response.json();
        setUsers(result);
      } 
       finally {
        setIsLoading(false);
      }
    }

    fetchUsers();
  }, []);

  const handleAddUser = async (newUser) => {
    try {
        const response = await fetch("/api/add", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(newUser),
        });
        if (response.ok) {
          window.location.reload(); 
        }
    } catch (error) {
        console.error('Error adding user:', error);
    }
};

const handleUpdateUser = async (updateUser, id) => {
  try {
      const response = await fetch(`/api/update?userId=${id}`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(updateUser),
      });
      if (response.ok) {
          window.location.reload();
      } else {
          console.error('Error updating user:', response.statusText);
      }
  } catch (error) {
      console.error('Error updating user:', error);
  }
};

const handleDeleteUser = async (id) => {
  try {
      let response = await fetch('/api/delete?userId='+id, { method: 'POST',headers:{'Authorization': `Bearer ${token}`} });
      if (response.ok) {
         window.location.reload(); 
      }else{
        <Messages ref={'Message Content'} />
      }
  } catch (error) {
      console.error('Error deleting user:', error);
  }
};

const handleRowSelect=(rowData)=>{
  setSelectedUser(rowData);
}

 if(isLoading) return <div>Loading...</div>
 
 const columns = [
  { field: 'tc', header: 'TC' },
  { field: 'name', header: 'Name' },
  { field: 'surname', header: 'Surname' },
  { field: 'gender', header: 'Gender' },
  { field: 'birth_date', header: 'Birth Date' },
  { field: 'role.name', header: 'Role' }
];


return (

 <div >
      <Button label="Add User" tooltip="Kullanıcı ekleyin." tooltipOptions={{ showDelay: 500, hideDelay: 500 ,position: 'bottom' }}  disabled={selectedUser} icon="pi pi-user-plus" className="add-user-button" onClick={() => setShowAddUserDialog(true)} />
      <Button label="Delete User" disabled={!selectedUser} tooltip=" Silmek için kullanıcı seçin." tooltipOptions={{ showDelay: 500, hideDelay: 500 ,position: 'bottom' }}    icon="pi pi-user-minus"  className="add-user-button" onClick={() => setShowDeleteUserDialog(true)} />
      <Button label="Update User"   disabled={!selectedUser}   icon="pi pi-user-edit" className="add-user-button" onClick={() => setShowUpdateUserDialog(true)} />
      
      <DataTableComponent data={users} columns={columns} title="Users" onRowSelect={handleRowSelect} />

      <AddUserForm visible={showAddUserDialog} onHide={() => setShowAddUserDialog(false)} onAddUser={handleAddUser}/>
      <DeleteUserForm  visible={showDeleteUserDialog} onHide={() => setShowDeleteUserDialog(false)} onDeleteUser={handleDeleteUser} selectedUser={selectedUser}/>
      <UpdateUserForm  visible={showUpdateUserDialog} onHide={() => setShowUpdateUserDialog(false)} onUpdateUser={handleUpdateUser} selectedUser={selectedUser}/>

      
  </div>
);
}