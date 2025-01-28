
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
import { FaBars } from 'react-icons/fa'; 
import { useNavigate } from 'react-router-dom';
import CreditCardPlusIcon from '@rsuite/icons/CreditCardPlus';

const MySidebar = () => {
  const [expanded, setExpanded] = React.useState(true);
  const navigate = useNavigate(); 
  const [activeKey, setActiveKey] = React.useState('1');
  const [openedMenu, setOpenedMenu] = React.useState(null); 

  const handleNavSelect = (eventKey) => {
    if (!expanded && (eventKey === '3' || eventKey === '4')) {
      setExpanded(true); 
    }

    setActiveKey(eventKey);
  };

  // Manejador de la apertura y cierre de menús
  const handleMenuToggle = (eventKey) => {
    if (!expanded) {
      setExpanded(true); 
    }

    setOpenedMenu(openedMenu === eventKey ? null : eventKey); 
  };
  return (
    <div
      style={{
        width: expanded ? 240 : 55, 
        height: '100vh',
        backgroundColor: '#ffffff', 
        transition: 'width 0.3s ease',
        overflowY: 'auto', 
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
        defaultOpenKeys={['3', '4']}
        style={{
          height: 'calc(100vh - px)', 
          overflowY: 'auto',
          overflowX: 'hidden', 
          backgroundColor: expanded ? '#ffffff' : '#ffffff'
          
        }}
      >
        <Sidenav.Body style={{ backgroundColor: '#ffffff' }}> 
          <Nav activeKey={activeKey} onSelect={handleNavSelect} >
            <Nav.Item style={{ backgroundColor: '#ffffff' }} eventKey="1" icon={<HomeIcon /> } onClick={() => {navigate("/");}}>
              Inicio
            </Nav.Item>
            <Nav.Item style={{ backgroundColor: '#ffffff' }}eventKey="2" icon={<GroupIcon />} onClick={() => {navigate("/Mecanicos");}}>
              Planilla
            </Nav.Item>
            <Nav.Menu
              placement="rightStart"
              eventKey="3"
              title="solicitudes"
              icon={<ToolsIcon />}
              onToggle={() => handleMenuToggle('3')} 
              open={openedMenu === '3'} 
              style={{ backgroundColor: '#ffffff' }} 
            >
              <Nav.Item  style={{ backgroundColor: '#ffffff' }} eventKey="3-1"  onClick={() => {navigate("/Reparaciones");}}>Reparaciones</Nav.Item>
              <Nav.Item style={{ backgroundColor: '#ffffff' }}  eventKey="3-2">Devices</Nav.Item>
              <Nav.Item style={{ backgroundColor: '#ffffff' }}  eventKey="3-3">Loyalty</Nav.Item>
              <Nav.Item style={{ backgroundColor: '#ffffff' }}  eventKey="3-4">Visit Depth</Nav.Item>
            </Nav.Menu>
            <Nav.Item style={{ backgroundColor: '#ffffff' }} eventKey="4" icon={<BarChartHorizontalIcon />} onClick={() => {navigate("/HReparaciones");}}>
              Historial de Reparaciones
            </Nav.Item>
            <Nav.Item style={{ backgroundColor: '#ffffff' }} eventKey="5" icon={<RateIcon />} onClick={() => {navigate("/Registro_repuesto");}}>
              Repuesto
            </Nav.Item>
            <Nav.Item style={{ backgroundColor: '#ffffff' }}eventKey="6" icon={<CarIcon />} onClick={() => {navigate("/Diagnostico");}}>
              Diagnósticos
            </Nav.Item>
            <Nav.Item style={{ backgroundColor: '#ffffff' }}eventKey="7" icon={<GearCircleIcon />} onClick={() => {navigate("/Mecanicos");}}>
              Ajustes
            </Nav.Item>
            <Nav.Item style={{ backgroundColor: '#ffffff' }}eventKey="8" icon={<CreditCardPlusIcon />} onClick={() => {navigate("/Facturas");}}>
              Facturar
            </Nav.Item>
          </Nav>
        </Sidenav.Body>
      </Sidenav>
    </div>
  );
};

export default MySidebar;