import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FaEye, FaWrench } from "react-icons/fa";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";

function ReparacionesCompletas() {
  const [dataComplete, setDataComplete] = useState([]);
  const [verOpen, setVerOpen] = useState(false);
  const [selectedReparacion, setSelectedReparacion] = useState(null);
  const [vehiculos, setVehiculos] = useState([]);
  const [mecanicos, setMecanicos] = useState([]);
  const [repuestos, setRepuestos] = useState([]);
  const [selectedRepuestos, setSelectedRepuestos] = useState([]);
  const [isRepuestosModalOpen, setIsRepuestosModalOpen] = useState(false);

  useEffect(() => {
    getReparacionesCompletas();
    getVehiculos();
    getMecanicos();
    getRepuestos();
  }, []);

  const getReparacionesCompletas = () => {
    axios
      .get("http://localhost:3001/api/reparaciones")
      .then((response) => setDataComplete(response.data))
      .catch((error) =>
        console.error("Error al obtener reparaciones completas:", error)
      );
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

  const getRepuestos = () => {
    axios
      .get("http://localhost:3001/api/repuestos")
      .then((response) => setRepuestos(response.data))
      .catch((error) => console.error("Error al obtener repuestos:", error));
  };

  const buscarPlacaVehiculo = (id) => {
    const vehiculo = vehiculos.find((v) => v.id_vehiculo === id);
    return vehiculo ? vehiculo.placa : "Desconocido";
  };

  const buscarNombreMecanico = (cedula) => {
    const mecanico = mecanicos.find((m) => m.cedula === cedula);
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

  const handleManageRepuestos = (reparacion) => {
    setSelectedReparacion(reparacion.id_reparacion);
    getRepuestosReparacion(reparacion.id_reparacion);
    setIsRepuestosModalOpen(true);
  };

  const getRepuestosReparacion = (id) => {
    axios
      .get(`http://localhost:3001/api/repuestos_reparacion/${id}`)
      .then((response) => {
        searchRepuestos(response.data);
      })
      .catch((error) =>
        console.error("Error al obtener repuestos de la reparación:", error)
      );
  };

  const searchRepuestos = (ids) => {
    const updatedRepuestos = [...selectedRepuestos]; // Copia del estado actual

    ids.forEach((idObj) => {
      // Buscar si el repuesto ya existe en selectedRepuestos
      const existing = updatedRepuestos.find(
        (repuesto) => repuesto.id_repuesto === idObj.id_repuesto
      );

      if (existing) {
        // Si existe, actualizar la cantidad
        existing.cantidad += idObj.cantidad_utilizada;
      } else {
        // Si no existe, buscar el repuesto original y agregarlo
        const newRepuesto = repuestos.find(
          (repuesto) => repuesto.id_repuesto === idObj.id_repuesto
        );
        if (newRepuesto) {
          updatedRepuestos.push({
            ...newRepuesto,
            cantidad: idObj.cantidad_utilizada,
          });
        }
      }
    });

    // Actualizar el estado una sola vez
    setSelectedRepuestos(updatedRepuestos);
  };

  const handleCloseRepuestosModal = () => {
    setIsRepuestosModalOpen(false);
    setSelectedRepuestos([]);
    setSelectedReparacion(null);
  };

  return (
    <Container>
      <Header>
        <h2>Reparaciones Completas</h2>
      </Header>
      <TableContainer>
        <Table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Vehículo</th>
              <th>Mecánico</th>
              <th>Fecha</th>
              <th>Estado</th>
              <th>Descripción</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody style={{ overflowY: "auto" }}>
            {dataComplete.map((reparacion) => (
              <tr key={reparacion.id_reparacion}>
                <td>{reparacion.id_reparacion}</td>
                <td>{buscarPlacaVehiculo(reparacion.id_vehiculo)}</td>
                <td>{buscarNombreMecanico(reparacion.id_mecanico)}</td>
                <td>{reparacion.fecha_reparacion}</td>
                <td>{reparacion.estado}</td>
                <td>{reparacion.descripcion}</td>
                <td>
                  <ActionsCell>
                    <ViewButton onClick={() => handleViewClick(reparacion)}>
                      <FaEye />
                    </ViewButton>
                    <ManageButton
                      onClick={() => handleManageRepuestos(reparacion)}
                    >
                      <FaWrench />
                    </ManageButton>
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
              <p>
                <strong>ID de reparación:</strong>{" "}
                {selectedReparacion.id_reparacion}
              </p>
              <p>
                <strong>Placa de vehículo:</strong>{" "}
                {buscarPlacaVehiculo(selectedReparacion.id_vehiculo)}
              </p>
              <p>
                <strong>Mecánico asignado:</strong>{" "}
                {buscarNombreMecanico(selectedReparacion.id_mecanico)}
              </p>
              <p>
                <strong>Descripción:</strong> {selectedReparacion.descripcion}
              </p>
              <p>
                <strong>Fecha:</strong> {selectedReparacion.fecha_reparacion}
              </p>
              <p>
                <strong>Estado:</strong> {selectedReparacion.estado}
              </p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseViewModal}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={isRepuestosModalOpen}
        onHide={handleCloseRepuestosModal}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Repuestos de la Reparación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Descripción</th>
                <th>Precio</th>
                <th>Cantidad</th>
              </tr>
            </thead>
            <tbody>
              {selectedRepuestos.map((repuesto, index) => (
                <tr key={index}>
                  <td>{repuesto.id_repuesto}</td>
                  <td>{repuesto.descripcion}</td>
                  <td>{repuesto.precio}</td>
                  <td>{repuesto.cantidad}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseRepuestosModal}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

const Container = styled.div`
  background-color: rgb(255, 255, 255); /* Fondo principal */
  color: #27374d; /* Texto principal */
  padding: 20px;
   overflow: hidden;
  height: 95vh; /*si lo hace mas grande se hae un scrolll */
  b
  display: flex;
  justify-content: center; /* Centra el contenido horizontalmente */
  align-items: center; /* Centra el contenido verticalmente */
  
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
  background-color: rgb(255, 255, 255); /* Fondo principal */
  overflow: auto;
  z-index: 1;
  max-height: 600px; /*jimena ajuste esto a su gusto es la altura ggg */
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  table-layout: fixed; /* Forzar el ancho de las columnas */

  th,
  td {
    padding: 12px;
    text-align: center; /* Centrar el texto */
    border-bottom: 1px solid #dee2e6;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap; /* Evitar que el texto se divida */
  }

  th {
    background-color: #526d82;
    position: sticky;
    top: 0;
    z-index: 1;
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

const ManageButton = styled.button`
  background-color: #5cb85c;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;

  &:hover {
    background-color: #4cae4c;
  }
`;

export default ReparacionesCompletas;
