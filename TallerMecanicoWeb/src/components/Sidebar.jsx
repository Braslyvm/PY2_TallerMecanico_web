import React from 'react';
import { Sidenav, Nav } from 'rsuite';
import { FaBars } from 'react-icons/fa'; 
import { CiSquareQuestion, CiLogout } from "react-icons/ci";
import { BiSolidCarMechanic } from "react-icons/bi";
import { GiMechanicGarage } from "react-icons/gi";
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

  const handleLogout = () => {
    // Aquí puedes implementar la lógica de cierre de sesión
    // Por ejemplo, eliminar el token de autenticación y redirigir al usuario
    // localStorage.removeItem('token'); // Si usas localStorage
    navigate('/'); // Redirigir a la página de inicio de sesión
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
            <Nav.Item eventKey="1" icon={<HomeIcon style={{ color: '#ffffff', fontSize: '20px' }} />} onClick={() => {navigate("/Home");}}>
              Inicio
            </Nav.Item>
            <Nav.Item eventKey="2" icon={<GroupIcon style={{ color: '#ffffff', fontSize: '20px' }} />} onClick={() => {navigate("/Mecanicos");}}>
              Planilla
            </Nav.Item>
            <Nav.Item eventKey="3" icon={<CarIcon style={{ color: '#ffffff', fontSize: '20px' }} />} onClick={() => {navigate("/Diagnostico");}}>
              Diagnósticos
            </Nav.Item>
            <Nav.Menu
              placement="rightStart"
              eventKey="4"
              title="Reparaciones"
              icon={<ToolsIcon style={{ color: '#ffffff', fontSize: '20px' }} />}
              onToggle={() => handleMenuToggle('4')} 
              open={openedMenu === '4'} 
            >
              <Nav.Item eventKey="4-1" icon={<CiSquareQuestion style={{ color: '#ffffff', fontSize: '20px' }} />} onClick={() => {navigate("/Reparaciones");}}>  Solicitudes</Nav.Item>
              <Nav.Item eventKey="4-2" icon={<BiSolidCarMechanic style={{ color: '#ffffff', fontSize: '20px' }} />} onClick={()=>{navigate("/ReparacionesCompletas")}}>  Todas las reparaciones</Nav.Item>
              <Nav.Item eventKey="4-3" icon={<GiMechanicGarage style={{ color: '#ffffff', fontSize: '20px' }} />} onClick={()=>{navigate("/ReparacionesCurso")}}>  Reparaciones en curso</Nav.Item>
              <Nav.Item eventKey="4-4" icon={<BarChartHorizontalIcon style={{ color: '#ffffff', fontSize: '20px' }} />} onClick={() => {navigate("/HReparaciones");}}>  Historial de reparaciones</Nav.Item>
            </Nav.Menu>
            <Nav.Item eventKey="5" icon={<RateIcon style={{ color: '#ffffff', fontSize: '20px' }} />} onClick={() => {navigate("/Registro_repuesto");}}>
              Repuesto
            </Nav.Item>
            <Nav.Item eventKey="6" icon={<CreditCardPlusIcon style={{ color: '#ffffff', fontSize: '20px' }} />} onClick={() => {navigate("/Facturas");}}>
              Facturar
            </Nav.Item>
            <Nav.Item eventKey="7" icon={<GearCircleIcon style={{ color: '#ffffff', fontSize: '20px' }} />} onClick={() => {navigate("/Mecanicos");}}>
              Ajustes
            </Nav.Item>
            <hr style={{ borderColor: '#ffffff', margin: '20px 0' }} /> {/* Línea separadora */}
            <Nav.Item 
              eventKey="8" 
              icon={<CiLogout style={{ color: '#ffffff', fontSize: '20px' }}  />}  onClick={handleLogout}
              style={{ display: 'flex', justifyContent: 'flex-start' }} // Alineación a la izquierda
            >
              <span style={{ marginLeft: '10px' }}>Cerrar sesión</span> {/* Espaciado entre el ícono y el texto */}
            </Nav.Item>
          </Nav>
        </Sidenav.Body>
      </Sidenav>
    </div>
  );
};

export default MySidebar;