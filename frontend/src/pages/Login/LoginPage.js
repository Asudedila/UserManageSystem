import React, { useState } from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

export default function LoginPage({setIsAuthenticated}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('/auth/login', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      
      if (response.ok) {
        const data = await response.json();
        if(!!data.token){
        const authResponse = await fetch(`/auth/authorities?username=${username}`, {
          headers: {
            'Authorization': `Bearer ${data.token}`
          }
        });
        if (authResponse.ok) {
          const authorities = await authResponse.json();
          var  user = { username: username
                        ,token:data.token
                        ,authorities:JSON.stringify(authorities) };
          localStorage.setItem("user",  JSON.stringify(user));
        }
        navigate('/home'); 
        setIsAuthenticated(true);}
        
        else{
          setError(data.message);
        }
      
    }} catch (error) {
      setError(' error .');
    }
  };

  return (
      <div className="card">
        <h2>Login </h2>
        <form onSubmit={handleLogin}>
          <div className="p-field">
            <label htmlFor="username">Username</label>
            <InputText  id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
          </div>
          <div className="p-field">
            <label htmlFor="password">Password</label>
            <Password id="password" value={password} onChange={(e) => setPassword(e.target.value)}  toggleMask  required />
          </div>
          {error && <p className="error">{error}</p>}
          <Button type="submit" className="button_login" label="Login" />
          <p1>Don't have an account? </p1>
          <Button  className="link" label="Sign Up" link onClick={() => navigate("/register")} />
        </form>
        
      </div>
  );
}
