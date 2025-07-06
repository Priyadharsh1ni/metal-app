import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useDispatch, useSelector } from 'react-redux';
import { action } from '../redux/action';

const Login = () => {
    const [form, setForm] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const dispatch = useDispatch()
    const token = useSelector((s) => s.token)

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setError('');
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        await dispatch(action.login({email: form.email, password: form.password}))
        if(token){
             window.location.href = '/dashboard';
        }
    };

        useEffect(() =>{
            if(token){
                localStorage.setItem('token', token)
                window.location.href = '/dashboard';
            }
        },[token])

    return (
        <Box style={{ maxWidth: 400, margin: '40px auto', padding: 24, border: '1px solid #ccc', borderRadius: 8, textAlign: 'center' }}>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: 16 }}>
                    <TextField
                        type="email"
                        name="email"
                        label="Email"
                        value={form.email}
                        onChange={handleChange}
                        style={{ width: '100%' }}
                        required
                    />
                </div>
                <div style={{ marginBottom: 16 }}>
                    <TextField
                        type="password"
                        name="password"
                        label="Password"
                        value={form.password}
                        onChange={handleChange}
                        style={{ width: '100%' }}
                        required
                    />
                </div>
                {error && <div style={{ color: 'red', marginBottom: 16 }}>{error}</div>}
                <button type="submit" style={{ width: '100%', padding: 10, backgroundColor: "black", color: "white" }}>Login</button>
                 <div style={{ marginTop: 16 }}>
                    Don't have an account?
                    <a href="/register"> Register for free</a>
                </div>
            </form>
        </Box>

    );
};

export default Login;

