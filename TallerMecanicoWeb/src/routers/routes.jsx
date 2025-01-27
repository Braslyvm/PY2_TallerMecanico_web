import React from 'react';
import {Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Registro from '../pages/Register';
import RegistroRP from '../pages/Registro_repuesto';
import Mecanicos from '../pages/Mecanicos';
import Reparaciones from '../pages/Reparaciones';
import HistorialReparacion from '../pages/HistorialReparacion';
import Diagnostico from '../pages/Diagnostico';

export function MyRoutes() {
  return (
    <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/Login" element={<Login />} />
    <Route path="/Registro" element={<Registro />} />
    <Route path="/Registro_repuesto" element={<RegistroRP />} />
    <Route path="/Mecanicos" element={<Mecanicos />} />
    <Route path="/Reparaciones" element={<Reparaciones />} />
    <Route path="/HReparaciones" element={<HistorialReparacion />} />
    <Route path="/Diagnostico" element={<Diagnostico />} />
    </Routes>
  );
}
