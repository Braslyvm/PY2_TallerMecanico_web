import { useState } from 'react';
import './App.css';
import { MyRoutes } from './routers/routes.jsx';
import { BrowserRouter, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import MySidebar from './components/Sidebar'; // Asegúrate de que este sea el correcto
import { GlobalProvider } from "./components/GlobalContext";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'rsuite/dist/rsuite.min.css';

function App() {
  return (
    <GlobalProvider>
      <BrowserRouter>
        <AppContainer>
          <Sidebar />
          <Content>
            <MyRoutes />
          </Content>
        </AppContainer>
      </BrowserRouter>
    </GlobalProvider>
  );
}

const Sidebar = () => {
  const location = useLocation();
  const isAuthPage = location.pathname === '/' || location.pathname === '/Registro';

  return !isAuthPage ? <MySidebar /> : null; // Renderiza el sidebar solo si no estamos en las páginas de autenticación
};

export default App;

// Contenedor principal de la aplicación
const AppContainer = styled.div`
  display: flex; // Cambia a flex para que el sidebar y el contenido se alineen horizontalmente
  height: 100vh; // Asegúrate de que el contenedor principal ocupe toda la altura de la ventana
  overflow: hidden; // Evita el scroll en el contenedor principal
`;

// Contenedor para el contenido principal (rutas)
const Content = styled.div`
  background-color: rgb(253, 251, 251);
  padding: 20px;
  overflow-y: auto;
  flex: 1; // Permite que el contenido ocupe el espacio restante
`;