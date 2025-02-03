import React from "react";
import styled from "styled-components";
import "./Truck.css";
import { useGlobalContext } from "../components/GlobalContext"; // Asegúrate de importar el contexto

function Home() {
  const { translate, dark } = useGlobalContext(); // Obtener el estado de traducción

  const translatedContent = {
    welcome: translate ? "Welcome to our page" : "Bienvenido a nuestra página",
    aboutUs: translate ? "About Us" : "Sobre Nosotros",
    services: translate ? "Services" : "Servicios",
    description: translate
      ? "We offer access to mechanical workshops for vehicle repair, tracking the repair process, and managing repair history."
      : "Ofrecemos acceso a talleres mecánicos para reparación de vehículos, seguimiento del proceso de reparación y gestión del historial de reparaciones.",
    service1: translate
      ? "Registration and authentication of administrators and clients"
      : "Registro y autenticación de administradores y clientes",
    service2: translate
      ? "Diagnosis and assignment of repairs"
      : "Diagnóstico y asignación de reparaciones",
    service3: translate
      ? "Purchase and assignment of spare parts"
      : "Compra y asignación de repuestos",
    service4: translate ? "Repair history" : "Historial de reparaciones",
    service5: translate
      ? "Billing and vehicle checkout"
      : "Facturación y salida de vehículos",
  };

  return (
    <HomeContainer style={{backgroundColor: dark ? "#333" : "#ffffff" }}>
      <Text style={{color: dark ? "#ffffff" : "#000000"}}>{translatedContent.welcome}</Text>
      <SkyContainer>
        <Sun />
        <Cloud className="cloud cloud1" />
        <Cloud className="cloud cloud2" />
      </SkyContainer>
      <RoadContainer>
        <TruckContainer>
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
              <div className="truck-wheel">
                <div className="truck-wheel__rim">
                  {[...Array(7)].map((_, i) => (
                    <div
                      key={i}
                      style={{ "--index": i }}
                      className="truck-wheel__spoke"
                    ></div>
                  ))}
                </div>
              </div>
            </div>
            <div className="truck__wheel truck__wheel--rear">
              <div className="truck-wheel">
                <div className="truck-wheel__rim">
                  {[...Array(7)].map((_, i) => (
                    <div
                      key={i}
                      style={{ "--index": i }}
                      className="truck-wheel__spoke"
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </TruckContainer>
      </RoadContainer>
      <InfoContainer>
        <h3>{translatedContent.aboutUs}</h3>
        <p>{translatedContent.description}</p>
        <h3>{translatedContent.services}</h3>
        <ul>
          <li>{translatedContent.service1}</li>
          <li>{translatedContent.service2}</li>
          <li>{translatedContent.service3}</li>
          <li>{translatedContent.service4}</li>
          <li>{translatedContent.service5}</li>
        </ul>
      </InfoContainer>
    </HomeContainer>
  );
}

export default Home;

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh; /* Cambiado a 100vh para ocupar toda la altura de la ventana */
  width: 100vw; /* Asegúrate de que ocupe todo el ancho */
  background-color: #f8f9fa;
  overflow: hidden; /* Cambiado a hidden para evitar el scroll */
`;

const InfoContainer = styled.div`
  margin-top: 20px;
  padding: 20px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 80%;
`;

const Text = styled.h1`
  font-size: 2rem;
  color: #333;
  text-align: center;
`;

const SkyContainer = styled.div`
  position: relative;
  width: 100%;
  height: 150px;
  background: linear-gradient(to bottom, #87ceeb, #f8f9fa);
  overflow: hidden;
`;

const Sun = styled.div`
  position: absolute;
  top: 20px;
  right: 50px;
  width: 60px;
  height: 60px;
  background-color: yellow;
  border-radius: 50%;
`;

const Cloud = styled.div`
  position: absolute;
  width: 100px;
  height: 50px;
  background: white;
  border-radius: 50px;
  box-shadow: 30px 10px 20px rgba(0, 0, 0, 0.1);
  opacity: 0.8;
  animation: moveClouds 10s linear infinite;

  &.cloud1 {
    top: 20px;
    left: -100px;
  }
  &.cloud2 {
    top: 60px;
    left: -150px;
    animation-delay: 3s;
  }

  @keyframes moveClouds {
    0% {
      transform: translateX(-100px);
    }
    100% {
      transform: translateX(100vw);
    }
  }
`;

const RoadContainer = styled.div`
  position: relative;
  width: 100%;
  height: 110px;
  background: #555;
  border-radius: 10px;
  overflow: hidden;

  &::before {
    content: "";
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
    animation: moveRoad 1s linear infinite;
  }

  @keyframes moveRoad {
    0% {
      background-position-x: 0;
    }
    100% {
      background-position-x: -100px;
    }
  }
`;

const TruckContainer = styled.div`
  position: absolute;
  bottom: 20px;
  left: 0;
  animation: moveTruck 5s linear infinite;
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
