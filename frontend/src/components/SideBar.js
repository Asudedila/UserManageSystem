import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';

export default function Sidebar  ({setIsAuthenticated})  {

  const [hasUserManageAuthority, setHasUserManageAuthority] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('user');
    const parsedUser = JSON.parse(user);
    if (parsedUser.authorities) {

      setHasUserManageAuthority(parsedUser.authorities.includes('USER_MANAGE'));
      
    }
  }, []);
  
 

  const handlelogout=()=>{
    localStorage.clear();
    navigate('/'); 
    setIsAuthenticated(false);}
  return(
  <div className="sidebar" >
    
      <NavLink exact to="/home" className="pi pi-home"  activeClassName="active" >HOME</NavLink>
      <NavLink to="/users"className="pi pi-users" activeClassName="active" >USERS</NavLink>
      {hasUserManageAuthority   && <NavLink to="/roles" activeClassName="active">ROLES</NavLink>}
      <Button  label="Log Out" onClick={handlelogout} />
  </div>
  );
}

