import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Login from './login';
import Dashboard from './dashboard';
import Register from './register';

function CommonLayout() {
  return (
    <>
      <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/dashboard" element={<Dashboard />} />
        <Route exact path='/register' element={<Register />} />
      </Routes>
    </>
  )
}

export default CommonLayout