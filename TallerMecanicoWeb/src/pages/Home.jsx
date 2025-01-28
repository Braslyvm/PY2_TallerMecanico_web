import React from 'react';
import styled from 'styled-components';
import './Truck.css'; // Asegúrate de que este archivo contenga los estilos del camión

function Home() {
  return (
    <HomeContainer>
      <Text>Bienvenido a nuestra página</Text>
      <SkyContainer></SkyContainer>
      <RoadContainer>
        <TruckContainer>
          {/* Aquí va el código del camión */}
          <div className="truck">
            <div className="truck__body">
              <div className="truck__body truck__body--top">
                <div className="truck__window">
                  <div className="truck__window-glass"></div>
                </div>
              </div>
              <div className="truck__body truck__body--mid">
                <div className="truck__mid-body"></div>
              </div>
              <div className="truck__body truck__body--bottom">
                <div className="truck__underpanel"></div>
                <div className="truck__rear-bumper"></div>
                <div className="truck__side-skirt"></div>
              </div>
            </div>
            <div className="truck__wheel truck__wheel--front">
              <div className="truck__wheel-arch"></div>
              <div className="truck__wheel-arch-trim truck__wheel-arch-trim--top"></div>
              <div className="truck__wheel-arch-trim truck__wheel-arch-trim--left"></div>
              <div className="truck__wheel-arch-trim truck__wheel-arch-trim--right"></div>
              <div className="truck-wheel">
                <div className="truck-wheel__rim">
                  <div style={{ '--index': 0 }} className="truck-wheel__spoke"></div>
                  <div style={{ '--index': 1 }} className="truck-wheel__spoke"></div>
                  <div style={{ '--index': 2 }} className="truck-wheel__spoke"></div>
                  <div style={{ '--index': 3 }} className="truck-wheel__spoke"></div>
                  <div style={{ '--index': 4 }} className="truck-wheel__spoke"></div>
                  <div style={{ '--index': 5 }} className="truck-wheel__spoke"></div>
                  <div style={{ '--index': 6 }} className="truck-wheel__spoke"></div>
                </div>
              </div>
            </div>
            <div className="truck__wheel truck__wheel--rear">
              <div className="truck__wheel-arch"></div>
              <div className="truck__wheel-arch-trim truck__wheel-arch-trim--top"></div>
              <div className="truck__wheel-arch-trim truck__wheel-arch-trim--left"></div>
              <div className="truck__wheel-arch-trim truck__wheel-arch-trim--right"></div>
              <div className="truck-wheel">
                <div className="truck-wheel__rim">
                  <div style={{ '--index': 0 }} className="truck-wheel__spoke"></div>
                  <div style={{ '--index': 1 }} className="truck-wheel__spoke"></div>
                  <div style={{ '--index': 2 }} className="truck-wheel__spoke"></div>
                  <div style={{ '--index': 3 }} className="truck-wheel__spoke"></div>
                  <div style={{ '--index': 4 }} className="truck-wheel__spoke"></div>
                  <div style={{ '--index': 5 }} className="truck-wheel__spoke"></div>
                  <div style={{ '--index': 6 }} className="truck-wheel__spoke"></div>
                </div>
              </div>
            </div>
            <div className="truck__headlight"></div>
            <div className="truck__taillight"></div>
            <div className="truck__indicator"></div>
            <div className="truck__foglight"></div>
          </div>
        </TruckContainer>
      </RoadContainer>
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
  background-color: #f8f9fa;
`;

// Texto de bienvenida
const Text = styled.h1`
  font-size: 2rem;
  color: #333;
  text-align: center;
`;

const SkyContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100px; // Altura del cielo
  border-radius: 10px;
  
  background: linear-gradient(to bottom, #87ceeb, #f8f9fa); // Degradado de cielo
  overflow: hidden;
`;



// Estilos de la carretera
const RoadContainer = styled.div`
  position: relative;
  width: 100%;
  height: 110px;
  background: #555; // Color de la carretera
  border-radius: 10px;
  overflow: hidden;

  // Líneas horizontales animadas
  &::before {
    content: '';
    position: absolute;
    top: 40%;
    left: 0;
    width: 100%;
    height: 5px;
    background-image: repeating-linear-gradient(
      90deg,
      white 0,
      white 50px,
      transparent 50px,
      transparent 100px
    );
    animation: moveRoad 1s linear infinite; // Animación para mover las líneas
  }

  @keyframes moveRoad {
    0% {
      background-position-x: 0;
    }
    100% {
      background-position-x: -100px; // Mueve las líneas horizontalmente
    }
  }
`;

// Estilos del contenedor del camión
const TruckContainer = styled.div`
  position: absolute;
  bottom: 20px;
  left: 0;
  animation: moveTruck 5s linear infinite; // Animación para mover el camión
  display: flex;
  justify-content: center;

  @keyframes moveTruck {
    0% {
      transform: translateX(-150px);
    }
    100% {
      transform: translateX(100vw);
    }
  }
`;