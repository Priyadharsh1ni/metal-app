import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { action } from "../redux/action";

const Register = () => {
    const [form, setForm] = useState({ username: "", email: "",password: "" });
    const [error, setError] = useState("");
    const dispatch = useDispatch()
    const message = useSelector((s) => s.message)
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
           dispatch(action.register(form));
        } catch (err) {
            setError(err.message);
        }
    };

    useEffect(() =>{
        if(message === "User registered successfully"){
            window.location.href = '/login';
        }
    },[message])

    return (
        <Box style={{ maxWidth: 400, margin: '40px auto', padding: 24, border: '1px solid #ccc', borderRadius: 8, textAlign: 'center' }}>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: 16 }}>
                    <TextField
                        type="username"
                        name="username"
                        label="username"
                        value={form.username}
                        onChange={handleChange}
                        style={{ width: '100%' }}
                        required
                    />
                </div>
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
                <button type="submit" style={{ width: '100%', padding: 10, backgroundColor: "black", color: "white" }}>Register</button>
            </form>
        </Box>
    );
};

export default Register;