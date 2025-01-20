import React from 'react';
import styled from 'styled-components';

function Home() {
  return (
    <HomeContainer>
      <Image src="/home-image.png" alt="Welcome" />
      <Text>Bienvenido a nuestra pagina</Text>
    </HomeContainer>
  );
}

export default Home;

// Estilos para el contenedor principal de la página
const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center; 
  overflow-y: auto;
  justify-content: center;
  height: 91vh;
  background-color: #f8f9fa;

`;



// Estilo para la imagen
const Image = styled.img`
  max-width: 100%;
  height: auto;
  margin-bottom: 20px;
  border-radius: 10px;
  justify-content: center;
`;

// Estilo para el texto de bienvenida
const Text = styled.h1`
  font-size: 2rem;
  color: #333;
  text-align: center;
`;
