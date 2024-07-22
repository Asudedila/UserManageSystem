import React, { useState,useEffect } from 'react';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown'; 
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import { Calendar } from 'primereact/calendar';

export default function RegistrationPage(){


    const [tc, setTc] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [gender, setGender] = useState(null);
    const [role, setRole] = useState(''); 
    const [password, setPassword] = useState(''); 
    const [username, setUsername] = useState('');
    const [birth_date, setBirthDate] = useState('');
    const [roles, setRoles] = useState([]);
    const navigate = useNavigate();
    const [error, setError] = useState('');

    useEffect(() => {
        async function fetchRoles() {
        
        try {
            const response = await fetch("/api/role/getAllRole");
            const result = await response.json();

            const roleOptions=result.map(role=>({ label: role.name, value: role.name }));
            setRoles(roleOptions);
        }catch(error){

        } 
        }

        fetchRoles();
    }, []);

    const genderOptions = [
        { label: 'Male', value: 'MALE' },
        { label: 'Female', value: 'FEMALE' },
        { label: 'Other', value: 'OTHER' }
    ];

    const handleRegisterUser = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const response = await fetch("/auth/register", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({name,surname,tc,role,gender,username,password,birth_date}),
            });
            if (response.ok) {
                const data = await response.json();
                if(data.message==="User Already Exist"){
                    setError(data.message);
                }else navigate('/');
            }
        } catch (error) {
            console.error('Error adding user:', error);
        }
    };

    return(
        <div className="card">
            <h2>Registration  </h2> 
            <form onSubmit={handleRegisterUser}>
                <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="username">Username</label>
                    <InputText id="username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Write username"  />
                </div>

                <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="password">Password</label>
                    <InputText id="password" value={password} onChange={(e) => setPassword(e.target.value)}  placeholder="Write password"  />
                </div>
                <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="tc">TC</label>
                    <InputText id="tc" value={tc} onChange={(e) => setTc(e.target.value)} placeholder="Write TC"  />
                </div>

                <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="name">Name</label>
                    <InputText id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Write name"  />
                </div>

                <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="surname">Surname</label>
                    <InputText id="surname" value={surname} onChange={(e) => setSurname(e.target.value)}  placeholder="Write surname"  />
                </div>

                <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="birth_date">Birth Date</label>
                    < Calendar value={birth_date} onChange={(e) => setBirthDate(e.value)} dateFormat="yy/mm/dd" />
                </div>
               
                <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="gender">Gender</label>
                    <Dropdown id="gender" value={gender} options={genderOptions} onChange={(e) => setGender(e.value)} placeholder="Select a Gender" />
                </div>

                <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="role">Role</label>
                    <Dropdown id="role" value={role} options={roles} onChange={(e) => setRole(e.target.value)} placeholder="Select a Role" />
                </div>
                
                    {error && <p className="error">{error}</p>}
                     <Button link  type="submit" className="button_login" label="Sign Up" z/>
                     <p1>Already have an account? </p1>
                     <Button link className="link" label="Log in" onClick={() => navigate("/")} />
                </form>
                </div>


    );
}