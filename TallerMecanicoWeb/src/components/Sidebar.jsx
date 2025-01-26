import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";

function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const navigate = useNavigate();

  return (
    <SidebarContainer sidebarOpen={sidebarOpen}>
      <ToggleButton onClick={() => setSidebarOpen(!sidebarOpen)}>
        {sidebarOpen ? <FiArrowLeft /> : <FiArrowRight />}
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
          <Button onClick={() => {
            setSidebarOpen(false); 
            navigate('/Reparaciones'); 
          }}>
            Reparaciones
          </Button>
          
        </nav>
      )}
    </SidebarContainer>
  );
}

export default Sidebar;

const SidebarContainer = styled.div`
  background: #27374d; // Fondo principal del sidebar
  color: #dde6ed; // Texto claro
  padding: ${(props) => (props.sidebarOpen ? "20px 10px" : "20px 0px")};
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: ${(props) =>
    props.sidebarOpen
      ? "3px 0 15px rgba(0, 0, 0, 0.3)"
      : "1px 0 10px rgba(7, 7, 7, 0.2)"}; // Sombra dinámica
  transition: width 0.3s ease, box-shadow 0.3s ease;
  width: ${(props) => (props.sidebarOpen ? "250px" : "60px")};
  border-radius: 10px;

  nav {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }
`;

const MenuTitle = styled.h3`
  margin: 0;
  color: #9db2bf; // Color de los títulos
  font-size: 1.2rem;
  font-weight: bold;
  text-align: ${(props) => (props.sidebarOpen ? "left" : "center")};
  width: 100%;
  padding-left: ${(props) => (props.sidebarOpen ? "10px" : "0")};
  display: ${(props) => (props.sidebarOpen ? "block" : "none")};
`;

const ToggleButton = styled.button`
  background: none;
  border: none;
  color: #dde6ed;
  font-size: 24px; /* Tamaño del ícono */
  cursor: pointer;
  transition: transform 0.2s ease; /* Efecto suave */

  &:hover {
    opacity: 0.8;
    transform: scale(1.1); /* Aumenta ligeramente el tamaño al pasar el mouse */
  }
`;

const Button = styled.button`
  background: #526d82; // Fondo del botón
  color: #dde6ed; // Texto claro
  border: none;
  border-radius: 6px; // Bordes redondeados
  padding: 10px 15px;
  margin: 8px 0;
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
  text-align: left;
  width: 100%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); // Sombra ligera
  transition: all 0.3s ease;

  &:hover {
    background: #9db2bf; // Resaltado al pasar el mouse
    color: #27374d; // Contraste en el texto
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2); // Sombra más pronunciada
    transform: translateY(-2px); // Efecto de flotación
  }

  &:active {
    transform: translateY(0); // Elimina el flotado al hacer clic
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;
