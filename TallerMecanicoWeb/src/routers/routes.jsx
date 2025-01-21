import React from 'react';
import {Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Registro from '../pages/Register';

export function MyRoutes() {
  return (
    <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/Login" element={<Login />} />
    <Route path="/Registro" element={<Registro />} />
    </Routes>
  );
}
