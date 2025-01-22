import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

function Home() {
  const [data, setData] = useState([]); // Estado para almacenar los datos

  //ESTE ES UN EJEMPLO PARA OBTENER LOS DATOS DE UNA URL
  // Función para obtener los datos al hacer clic en el botón
  const fetchData = () => {
    axios
      .get('http://localhost:3000/api/prueba') // URL del endpoint
      .then((response) => {
        setData(response.data); // Guardar los datos en el estado
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener los datos:', error);
      });
  };

  return (
    <HomeContainer>
      <Image src="/home-image.png" alt="Welcome" />
      <Text>Bienvenido a nuestra página</Text>
      <Button onClick={fetchData}>Cargar datos</Button>
      <TableContainer>
        {data.length > 0 ? (
          <Table>
            <thead>
              <tr>
                <Th>ID</Th>
                <Th>Nombre</Th>
                <Th>Otro Campo</Th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.id}>
                  <Td>{item.id}</Td>
                  <Td>{item.nombre}</Td>
                  <Td>{item.otro_campo}</Td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <Message>No hay datos para mostrar.</Message>
        )}
      </TableContainer>
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

// Botón para cargar datos
const Button = styled.button`
  margin: 20px;
  padding: 10px 20px;
  font-size: 1rem;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

// Contenedor de la tabla
const TableContainer = styled.div`
  margin-top: 20px;
  width: 80%;
  background: #fff;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

// Tabla
const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Th = styled.th`
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  text-align: left;
  border: 1px solid #ddd;
`;

const Td = styled.td`
  padding: 10px;
  text-align: left;
  border: 1px solid #ddd;
`;

const Message = styled.p`
  font-size: 1.2rem;
  color: #555;
  text-align: center;
`;
