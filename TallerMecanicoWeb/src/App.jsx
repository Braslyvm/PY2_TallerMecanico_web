import { useState } from 'react';
import './App.css';
import { MyRoutes } from './routers/routes.jsx';
import { BrowserRouter } from 'react-router-dom';
import styled from 'styled-components';
import Sidebar from './components/Sidebar';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <BrowserRouter>
      <AppContainer className={sidebarOpen ? 'active' : ''}>
        {/* Sidebar */}
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/* Rutas de la aplicación */}
        <Content>
          <MyRoutes />
        </Content>
      </AppContainer>
    </BrowserRouter>
  );
}

export default App;

// Contenedor principal de la aplicación
const AppContainer = styled.div`
  display: grid;
  grid-template-columns: ${({ className }) =>
    className === 'active' ? '300px auto' : '60px auto'};
  transition: grid-template-columns 0.3s ease-in-out;
  height: 100%;
  overflow-y: auto; /* Permite el desplazamiento vertical si el contenido es mayor que el contenedor */
  width: 100%;
  grid-template-rows: auto 1fr; /* Agrega esta línea para que el contenido ocupe más espacio */
`;



// Contenedor para el contenido principal (rutas)
const Content = styled.div`
  background-color:rgb(253, 251, 251);
  padding: 20px;
  overflow-y: auto;
  height: 100%
  width: 100%
  display: flex; /* Añadí un display flex para mejorar la organización */
  justify-content: flex-start; /* Cambié de center a flex-start para alinear el contenido a la izquierda */
  align-items: flex-start; /* Asegura que el contenido no esté centrado verticalmente */
`;

