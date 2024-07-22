import React, { useEffect, useState } from 'react';
import { Button } from 'primereact/button';
import DataTableComponent from '../../components/table/DataTableComponents';
import AddRole from '../../components/roleForm/AddRoleForm';
import UpdateRoleForm from '../../components/roleForm/UpdateRoleForm';
import { Messages } from 'primereact/messages';
import DeleteRoleForm from '../../components/roleForm/DeleteRoleForm';


export default function Roles() {
  const [roles, setRoles] = useState([]);
  const [isLoading,setIsLoading]=useState(false);
  const [showAddRoleDialog, setShowAddRoleDialog] = useState(false);
  const [showUpdateRoleDialog, setShowUpdateRoleDialog] = useState(false)
  const [showDeleteRoleDialog, setShowDeleteRoleDialog] = useState(false);;
  const [selectedRole, setSelectedRole] = useState(false);

  const user = localStorage.getItem('user');
  const parsedUser = JSON.parse(user);
  const token=parsedUser.token;

  useEffect(() => {
    async function fetchRoles() {
      setIsLoading(true);
      
      try {
        const response = await fetch("/api/role/getAllRole");
        const result = await response.json();
        setRoles(result);
      } 
       finally {
        setIsLoading(false);
      }
    }

    fetchRoles();
  }, []);

  
const handleUpdateRole = async (updateRole,id) => {
  try {
       const response =await fetch('/api/role/updateRole?roleId='+id, {method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(updateRole),
          
      });
      if (response.ok) {
        window.location.reload(); 
    }
      
      
  } catch (error) {
      console.error('Error updating user:', error);
  }
};
const handleDeleteRole = async (id) => {
  try {
      let response = await fetch('/api/role/deleteRole?roleId='+id, { method: 'POST',headers:{'Authorization': `Bearer ${token}`} });
      if (response.ok) {
         window.location.reload(); 
      }else{
        <Messages ref={'Message Content'} />
      }
  } catch (error) {
      console.error('Error deleting role:', error);
  }
};

  const handleAddRole = async (newRole) => {
    try {
        const response = await fetch("/api/role/addRole", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(newRole),
        });
        if (response.ok) {
          window.location.reload(); 
        }
    } catch (error) {
        console.error('Error adding user:', error);
    }
};
const handleRowSelect=(rowData)=>{
  setSelectedRole(rowData);
}

  if(isLoading) return <div>Loading..</div>

  const columns = [
   { field: 'name', header: 'Name' }
 ];
  return(
    <div>
      <Button label="Add Role"tooltip="Rol ekleyin." icon="pi pi-plus"disabled={selectedRole}  className="add-user-button" onClick={() => setShowAddRoleDialog(true)} />
      <Button label="Delete Role" disabled={!selectedRole} tooltip=" Silmek için rol seçin." tooltipOptions={{ showDelay: 500, hideDelay: 500 ,position: 'bottom' }}    icon="pi pi-user-minus"  className="add-user-button" onClick={() => setShowDeleteRoleDialog(true)} />
      <Button label="Update Role" disabled={!selectedRole} icon="pi pi-minus" className="add-user-button" onClick={() => setShowUpdateRoleDialog(true)} />
      
      <DataTableComponent data={roles} columns={columns} title="Roles"  onRowSelect={handleRowSelect}/>

      <AddRole visible={showAddRoleDialog} onHide={() => setShowAddRoleDialog(false)} onAddRole={handleAddRole}/>
      <DeleteRoleForm  visible={showDeleteRoleDialog} onHide={() => setShowDeleteRoleDialog(false)} onDeleteRole={handleDeleteRole} selectedRole={selectedRole}/>
      <UpdateRoleForm visible={showUpdateRoleDialog} onHide={() => setShowUpdateRoleDialog(false)} onUpdateRole={handleUpdateRole} selectedRole={selectedRole}/>
    </div>
  );

}