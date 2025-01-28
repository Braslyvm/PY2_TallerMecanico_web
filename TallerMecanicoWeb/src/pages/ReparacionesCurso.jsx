import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FaEye, FaCheck } from "react-icons/fa";
import { Modal, Button } from "react-bootstrap";
import Swal from "sweetalert2";
import axios from "axios";

function ReparacionesCurso() {
  const [data, setData] = useState([]);
  const [verOpen, setVerOpen] = useState(false);
  const [selectedReparacion, setSelectedReparacion] = useState(null);
  const [vehiculos, setVehiculos] = useState([]);
  const [mecanicos, setMecanicos] = useState([]);

  useEffect(() => {
    getReparacionesCurso();
    getVehiculos();
    getMecanicos();
  }, []);

  const getReparacionesCurso = () => {
    axios
      .get("http://localhost:3001/api/reparaciones/estado/En curso")
      .then((response) => setData(response.data))
      .catch((error) => console.error("Error al obtener reparaciones en curso:", error));
  };

  const getVehiculos = () => {
    axios
      .get("http://localhost:3001/api/vehiculos/completa")
      .then((response) => setVehiculos(response.data))
      .catch((error) => console.error("Error al obtener vehículos:", error));
  };

  const getMecanicos = () => {
    axios
      .get("http://localhost:3001/api/mecanicos")
      .then((response) => setMecanicos(response.data))
      .catch((error) => console.error("Error al obtener mecánicos:", error));
  };

  const buscarPlacaVehiculo = (id) => {
    const vehiculo = vehiculos.find(v => v.id_vehiculo === id);
    return vehiculo ? vehiculo.placa : "Desconocido";
  };

  const buscarNombreMecanico = (cedula) => {
    const mecanico = mecanicos.find(m => m.cedula === cedula);
    return mecanico ? mecanico.nombre : "Desconocido";
  };

  const handleViewClick = (reparacion) => {
    setSelectedReparacion(reparacion);
    setVerOpen(true);
  };

  const handleCloseViewModal = () => {
    setVerOpen(false);
    setSelectedReparacion(null);
  };

  const handleFinalizarClick = (id_reparacion) => {
    axios
      .put(`http://localhost:3001/api/reparaciones/id/estado`, { id: id_reparacion,estado: 'Facturar' })
      .then((response) => {
        console.log(response.data);
        getReparacionesCurso(); // Actualizar la lista de reparaciones en curso
        Swal.fire("¡Éxito!", "Reparación finalizada correctamente.", "success");
      })
      .catch((error) => console.error("Error al finalizar la reparación:", error));
  };

  return (
    <Container>
      <Header>
        <h2>Reparaciones en curso</h2>
      </Header>
      <TableContainer>
        <Table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Vehículo</th>
              <th>Mecánico</th>
              <th>Fecha</th>
              <th>Descripción</th>
              <th>Estado</th>
              <th>Acciones</th>
              <th>Factura</th>
            </tr>
          </thead>
          <tbody>
            {data.map((reparacion) => (
              <tr key={reparacion.id_reparacion}>
                <td>{reparacion.id_reparacion}</td>
                <td>{buscarPlacaVehiculo(reparacion.id_vehiculo)}</td>
                <td>{buscarNombreMecanico(reparacion.id_mecanico)}</td>
                <td>{reparacion.fecha_reparacion}</td>
                <td>{reparacion.descripcion}</td>
                <td>{reparacion.estado}</td>
                <td>
                  <ActionsCell>
                    <ViewButton onClick={() => handleViewClick(reparacion)}>
                      <FaEye />
                    </ViewButton>
                  </ActionsCell>
                </td>
                <td>
                    <ActionsCell>
                        <FinalizarButton onClick={() => handleFinalizarClick(reparacion.id_reparacion)}>
                            <FaCheck /> Facturar
                        </FinalizarButton>
                    </ActionsCell>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </TableContainer>

      <Modal show={verOpen} onHide={handleCloseViewModal}>
        <Modal.Header closeButton>
          <Modal.Title>Detalles de la Reparación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedReparacion && (
            <div>
              <p><strong>ID de reparación:</strong> {selectedReparacion.id_reparacion}</p>
              <p><strong>Placa de vehículo:</strong> {buscarPlacaVehiculo(selectedReparacion.id_vehiculo)}</p>
              <p><strong>Mecánico asignado:</strong> {buscarNombreMecanico(selectedReparacion.id_mecanico)}</p>
              <p><strong>Descripción:</strong> {selectedReparacion.descripcion}</p>
              <p><strong>Fecha:</strong> {selectedReparacion.fecha_reparacion}</p>
              <p><strong>Estado:</strong> {selectedReparacion.estado}</p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseViewModal}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

const Container = styled.div`
  background-color: rgb(254, 255, 255); /* Fondo principal */
  color: #27374d; /* Texto principal */
  padding: 20px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  h2 {
    color: #27374d; /* Título */
  }
`;

const TableContainer = styled.div`
  max-height: 90%;
  overflow-y: auto;
  overflow-x: hidden;
  z-index: 1;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  table-layout: fixed; /* Forzar el ancho de las columnas */
  
  th, td {
    padding: 12px;
    text-align: center; /* Centrar el texto */
    border-bottom: 1px solid #dee2e6;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap; /* Evitar que el texto se divida */
  }
  
  th {
    background-color: #526D82;
    color: white;
  }
  
  tr:hover {
    background-color: #f1f1f1;
  }
`;

const ActionsCell = styled.td`
  display: flex;
  gap: 5px;
`;

const ViewButton = styled.button`
  padding: 5px 8px;
  background-color: rgba(236, 240, 32, 0.95);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: rgb(178, 180, 39);
  }
  svg {
    font-size: 14px;
  }
`;

const FinalizarButton = styled.button`
  padding: 5px 8px;
  background-color: #5cb85c;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #4cae4c;
  }
  svg {
    font-size: 14px;
  }
`;

export default ReparacionesCurso;