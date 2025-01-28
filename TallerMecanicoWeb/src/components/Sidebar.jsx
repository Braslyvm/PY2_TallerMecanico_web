// Sidebar.jsx
import React from 'react';
import { Sidenav, Nav } from 'rsuite';
import { FaBars } from 'react-icons/fa'; 
import { useNavigate } from 'react-router-dom';
import HomeIcon from '@rsuite/icons/legacy/Home';
import GroupIcon from '@rsuite/icons/legacy/Group';
import ToolsIcon from '@rsuite/icons/Tools';
import BarChartHorizontalIcon from '@rsuite/icons/BarChartHorizontal';
import RateIcon from '@rsuite/icons/Rate';
import CarIcon from "@rsuite/icons/legacy/Car";
import GearCircleIcon from '@rsuite/icons/legacy/GearCircle';
import CreditCardPlusIcon from '@rsuite/icons/CreditCardPlus';
import './sidebar.css'; // Importa el archivo CSS

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
        backgroundColor: '#27374D', // Cambiado a #27374D
        transition: 'width 0.3s ease',
        overflowY: 'auto', 
        overflowX: 'hidden', 
      }}
    >
      <FaBars
        onClick={() => setExpanded(!expanded)}
        style={{ 
          fontSize: '24px', 
          color: '#ffffff', // Cambiado a blanco
          cursor: 'pointer', 
          margin: '10px',
          backgroundColor: '#27374D', // Cambiado a #27374D
          borderRadius: '5px', 
          padding: '5px' 
        }}
      />
      <hr style={{ borderColor: '#ffffff' }} /> {/* Cambiado a blanco */}
      <Sidenav
        expanded={expanded}
        defaultOpenKeys={['3']}
        style={{
          height: 'calc(100vh - px)', 
          overflowY: 'auto',
          overflowX: 'hidden', 
          backgroundColor: '#27374D' // Cambiado a #27374D
        }}
      >
        <Sidenav.Body style={{ backgroundColor: '#27374D' }}> {/* Cambiado a #27374D */}
          <Nav activeKey={activeKey} onSelect={handleNavSelect}>
            <Nav.Item eventKey="1" icon={<HomeIcon style={{ color: '#ffffff' }} />} onClick={() => {navigate("/");}}>
              Inicio
            </Nav.Item>
            <Nav.Item eventKey="2" icon={<GroupIcon style={{ color: '#ffffff' }} />} onClick={() => {navigate("/Mecanicos");}}>
              Planilla
            </Nav.Item>
            <Nav.Menu
              placement="rightStart"
              eventKey="3"
              title="solicitudes"
              icon={<ToolsIcon style={{ color: '#ffffff' }} />}
              onToggle={() => handleMenuToggle('3')} 
              open={openedMenu === '3'} 
            >
              <Nav.Item eventKey="3-1" onClick={() => {navigate("/Reparaciones");}}>Reparaciones</Nav.Item>
              <Nav.Item eventKey="3-2">Devices</Nav.Item>
              <Nav.Item eventKey="3-3">Loyalty</Nav.Item>
              <Nav.Item eventKey="3-4">Visit Depth</Nav.Item>
            </Nav.Menu>
            <Nav.Item eventKey="4" icon={<BarChartHorizontalIcon style={{ color: '#ffffff' }} />} onClick={() => {navigate("/HReparaciones");}}>
              Historial de Reparaciones
            </Nav.Item>
            <Nav.Item eventKey="5" icon={<RateIcon style={{ color: '#ffffff' }} />} onClick={() => {navigate("/Registro_repuesto");}}>
              Repuesto
            </Nav.Item>
            <Nav.Item eventKey="6" icon={<CarIcon style={{ color: '#ffffff' }} />} onClick={() => {navigate("/Diagnostico");}}>
              Diagnósticos
            </Nav.Item>
            <Nav.Item eventKey="7" icon={<GearCircleIcon style={{ color: '#ffffff' }} />} onClick={() => {navigate("/Mecanicos");}}>
              Ajustes
            </Nav.Item>
            <Nav.Item eventKey="8" icon={<CreditCardPlusIcon style={{ color: '#ffffff' }} />} onClick={() => {navigate("/Facturas");}}>
              Facturar
            </Nav.Item>
          </Nav>
        </Sidenav.Body>
      </Sidenav>
    </div>
  );
};

export default MySidebar;