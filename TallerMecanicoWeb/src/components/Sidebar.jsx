
// Sidebar.jsx
import React from 'react';
import ReactDOM from 'react-dom';
import { Sidenav, Nav, Toggle } from 'rsuite';
import DashboardIcon from '@rsuite/icons/legacy/Dashboard';
import GroupIcon from '@rsuite/icons/legacy/Group';
import MagicIcon from '@rsuite/icons/legacy/Magic';
import HomeIcon from '@rsuite/icons/legacy/Home';
import ToolsIcon from '@rsuite/icons/Tools';
import RateIcon from '@rsuite/icons/Rate';
import CarIcon from "@rsuite/icons/legacy/Car";
import BarChartHorizontalIcon from '@rsuite/icons/BarChartHorizontal';
import GearCircleIcon from '@rsuite/icons/legacy/GearCircle';
import { FaBars } from 'react-icons/fa'; // Importa el ícono de 3 rayas
import { useNavigate } from 'react-router-dom';

const MySidebar = () => {
  const [expanded, setExpanded] = React.useState(true);
  const navigate = useNavigate(); 
  return (
    <div
      style={{
        width: expanded ? 240 : 55, 
        height: '100vh',
        backgroundColor: '#ffffff', 
        transition: 'width 0.3s ease',
        overflow: 'hidden', 
        overflowX: 'hidden', 
      }}
    >
      <FaBars
        onClick={() => setExpanded(!expanded)}
        style={{ 
          fontSize: '24px', 
          color: '#000', 
          cursor: 'pointer', 
          margin: '10px',
          backgroundColor: expanded ? '#ffffff' : '#f0f0f0', 
          borderRadius: '5px', 
          padding: '5px' 
        }}
      />
      <hr />
      <Sidenav
        expanded={expanded}
        style={{
          height: 'calc(100vh - px)', 
          overflowY: 'auto',
          overflowX: 'hidden', 
          backgroundColor: expanded ? '#ffffff' : '#ffffff'
          
        }}
      >
        <Sidenav.Body style={{ backgroundColor: '#ffffff' }}> 
          <Nav>
            <Nav.Item style={{ backgroundColor: '#ffffff' }} eventKey="1" icon={<HomeIcon /> } onClick={() => {navigate("/");}}>
              Inicio
            </Nav.Item>
            <Nav.Item style={{ backgroundColor: '#ffffff' }}eventKey="2" icon={<GroupIcon />} onClick={() => {navigate("/Mecanicos");}}>
              Planilla
            </Nav.Item>
            <Nav.Item style={{ backgroundColor: '#ffffff' }}eventKey="3" icon={<ToolsIcon />} onClick={() => {navigate("/Reparaciones");}}>
              Reparaciones
            </Nav.Item>
            <Nav.Item style={{ backgroundColor: '#ffffff' }} eventKey="4" icon={<BarChartHorizontalIcon />} onClick={() => {navigate("/HReparaciones");}}>
              Historial de Reparaciones
            </Nav.Item>
            <Nav.Item style={{ backgroundColor: '#ffffff' }} eventKey="5" icon={<RateIcon />} onClick={() => {navigate("/Registro_repuesto");}}>
              Repuesto
            </Nav.Item>
            <Nav.Item style={{ backgroundColor: '#ffffff' }}eventKey="5" icon={<CarIcon />} onClick={() => {navigate("/Diagnostico");}}>
              Diagnósticos
            </Nav.Item>
            <Nav.Item style={{ backgroundColor: '#ffffff' }}eventKey="5" icon={<GearCircleIcon />} onClick={() => {navigate("/Mecanicos");}}>
              Ajustes
            </Nav.Item>
            
          </Nav>
        </Sidenav.Body>
      </Sidenav>
    </div>
  );
};

export default MySidebar;