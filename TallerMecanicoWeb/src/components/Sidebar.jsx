import styled from 'styled-components';

function Sidebar({ sidebarOpen, setSidebarOpen }) {
  return (
    <SidebarContainer>
      <ToggleButton onClick={() => setSidebarOpen(!sidebarOpen)}>
        {sidebarOpen ? '<' : '>'}
      </ToggleButton>
      {sidebarOpen && <nav>Menú</nav>}
    </SidebarContainer>
  );
}

export default Sidebar;

// Estilos para el sidebar
const SidebarContainer = styled.div`
  background-color: #333;
  color: white;
  height: 100vh;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;

  nav {
    margin-top: 20px;
  }
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
