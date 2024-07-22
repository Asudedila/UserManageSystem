import React, { useState,useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Users from './pages/User/UsersPage';
import Roles from './pages/Role/RolesPage';
import Home from './pages/HomePage'; 
import Sidebar from './components/SideBar';
import Login from './pages/Login/LoginPage';
import Register from './pages/Register/RegistrationPage';

export default function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
   
    const user = localStorage.getItem('user');
   
    if(user){
      const parsedUser = JSON.parse(user);
      setIsAuthenticated(!!parsedUser.token);
    }
    
  }, []);
  

  return (
    <Router>
      <div style={{ display: 'flex' }}>
        {isAuthenticated && <Sidebar setIsAuthenticated ={setIsAuthenticated}/>}
        <div style={{ flex: 1, paddingLeft: '250px' }}> 
          <Routes>
            <Route path="/" element={ <Login setIsAuthenticated ={setIsAuthenticated}/>} />
            <Route path="/register" element={ <Register />} />
            <Route path="/home" element={ <Home />  }/>
            <Route path="/users" element={<Users /> } />
            <Route path="/roles" element={<Roles /> } />
          </Routes>
        </div>
      </div>
    </Router>
  );
}











