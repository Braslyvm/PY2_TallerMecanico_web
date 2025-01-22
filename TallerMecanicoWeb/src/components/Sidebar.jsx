import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const navigate = useNavigate();

  return (
    <SidebarContainer sidebarOpen={sidebarOpen}>
      <ToggleButton onClick={() => setSidebarOpen(!sidebarOpen)}>
        {sidebarOpen ? "<" : ">"}
      </ToggleButton>
      {sidebarOpen && (
        <nav>
          <MenuTitle>Menú</MenuTitle>
          <Button
            onClick={() => {
              setSidebarOpen(false);
              navigate("/login");
            }}
          >
            Ir a Login
          </Button>
          <Button onClick={() => {
            setSidebarOpen(false); 
            navigate('/Mecanicos'); 
          }}>
            Mecanicos
          </Button>
          {/* Puedes agregar más botones aquí */}
          {
            <Button
              onClick={() => {
                setSidebarOpen(false);
                navigate("/Registro_repuesto");
              }}
            >
              Registrar repuesto
            </Button>
          }
          
        </nav>
      )}
    </SidebarContainer>
  );
}

export default Sidebar;

// Estilos para el sidebar
const SidebarContainer = styled.div`
  background-color: #333;
  color: white;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: width 0.3s ease; // Animación para el ancho del sidebar
  width: ${(props) =>
    props.sidebarOpen ? "200px" : "50px"}; // Cambia el ancho según el estado

  nav {
    margin-top: 20px;
    display: flex;
    flex-direction: column; // Asegura que los botones estén en columna
    align-items: center; // Centra los botones
  }
`;

// Título del menú
const MenuTitle = styled.h3`
  margin: 0;
  color: white;
`;

// Botón de apertura/cierre
const ToggleButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 20px;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;

// Estilo para los botones del menú
const Button = styled.button`
  background-color: #444; // Color de fondo del botón
  color: white; // Color del texto
  border: none;
  padding: 10px 15px;
  margin: 5px 0; // Espaciado entre botones
  cursor: pointer;
  transition: background-color 0.3s ease; // Transición para el color de fondo

  &:hover {
    background-color: #555; // Color de fondo al pasar el mouse
  }
`;
