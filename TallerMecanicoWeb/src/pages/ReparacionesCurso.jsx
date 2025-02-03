import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FaEye, FaCheck } from "react-icons/fa";
import { Modal, Button } from "react-bootstrap";
import Swal from "sweetalert2";
import axios from "axios";
import { useGlobalContext } from "../components/GlobalContext";

function ReparacionesCurso() {
  const { translate, dark } = useGlobalContext(); // Obtener el estado de traducción y modo oscuro
  const [data, setData] = useState([]);
  const [verOpen, setVerOpen] = useState(false);
  const [selectedReparacion, setSelectedReparacion] = useState(null);
  const [vehiculos, setVehiculos] = useState([]);
  const [mecanicos, setMecanicos] = useState([]);

  // Traducciones
  const translatedContent = {
    title: translate ? 'Ongoing Repairs' : 'Reparaciones en curso',
    id: translate ? 'ID' : 'ID',
    vehiculo: translate ? 'Vehicle' : 'Vehículo',
    mecanico: translate ? 'Mechanic' : 'Mecánico',
    fecha: translate ? 'Date' : 'Fecha',
    descripcion: translate ? 'Description' : 'Descripción',
    estado: translate ? 'Status' : 'Estado',
    acciones: translate ? 'Actions' : 'Acciones',
    factura: translate ? 'Invoice' : 'Factura',
    detallesReparacion: translate ? 'Repair Details' : 'Detalles de la Reparación',
    cerrar: translate ? 'Close' : 'Cerrar',
    finalizar: translate ? 'Finalize' : 'Finalizar',
    exitoFinalizar: translate ? 'Repair finalized successfully!' : '¡Reparación finalizada correctamente!',
    errorFinalizar: translate ? 'Error finalizing repair:' : 'Error al finalizar la reparación:',
  };

  useEffect(() => {
    getReparacionesCurso();
    getVehiculos();
    getMecanicos();
  }, []);

  const getReparacionesCurso = () => {
    axios
      .get("http://localhost:3001/api/reparaciones/estado/En curso")
      .then((response) => setData(response.data))
      .catch((error) =>
        console.error("Error al obtener reparaciones en curso:", error)
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

  const handleFinalizarClick = (id_reparacion) => {
    axios
      .put(`http://localhost:3001/api/reparaciones/id/estado`, {
        id: id_reparacion,
        estado: "Facturar",
      })
      .then((response) => {
        console.log(response.data);
        getReparacionesCurso(); // Actualizar la lista de reparaciones en curso
        Swal.fire({
          title: translatedContent.exitoFinalizar,
          icon: 'success',
          confirmButtonText: translatedContent.cerrar,
        });
      })
      .catch((error) => {
        console.error(translatedContent.errorFinalizar, error);
        Swal.fire({
          title: 'Error',
          text: translatedContent.errorFinalizar + error,
          icon: 'error',
          confirmButtonText: translatedContent.cerrar,
        });
      });
  };

  return (
    <Container style={{ backgroundColor: dark ? '#333' : '#ffffff', color: dark ? '#ffffff' : '#000000' }}>
      <Header>
        <h2 style={{ color: dark ? '#ffffff' : '#000000' }}>{translatedContent.title}</h2>
      </Header>
      <TableContainer>
        <Table>
          <thead style={{ position: "sticky", top: 0, zIndex: 10 }}>
            <tr>
              <th style={{ color: dark ? '#ffffff' : '#000000' }}>{translatedContent.id}</th>
              <th style={{ color: dark ? '#ffffff' : '#000000' }}>{translatedContent.vehiculo}</th>
              <th style={{ color: dark ? '#ffffff' : '#000000' }}>{translatedContent.mecanico}</th>
              <th style={{ color: dark ? '#ffffff' : '#000000' }}>{translatedContent.fecha}</th>
              <th style={{ color: dark ? '#ffffff' : '#000000' }}>{translatedContent.descripcion}</th>
              <th style={{ color: dark ? '#ffffff' : '#000000' }}>{translatedContent.estado}</th>
              <th style={{ color: dark ? '#ffffff' : '#000000' }}>{translatedContent.acciones}</th>
              <th style={{ color: dark ? '#ffffff' : '#000000' }}>{translatedContent.factura}</th>
            </tr>
          </thead>

          <tbody>
            {data.map((reparacion) => (
              <tr key={reparacion.id_reparacion}>
                <td style={{ color: dark ? '#ffffff' : '#000000' }}>{reparacion.id_reparacion}</td>
                <td style={{ color: dark ? '#ffffff' : '#000000' }}>{buscarPlacaVehiculo(reparacion.id_vehiculo)}</td>
                <td style={{ color: dark ? '#ffffff' : '#000000' }}>{buscarNombreMecanico(reparacion.id_mecanico)}</td>
                <td style={{ color: dark ? '#ffffff' : '#000000' }}>{reparacion.fecha_reparacion}</td>
                <td style={{ color: dark ? '#ffffff' : '#000000' }}>{reparacion.descripcion}</td>
                <td style={{ color: dark ? '#ffffff' : '#000000' }}>{reparacion.estado}</td>
                <td>
                  <ActionsCell>
                    <ViewButton onClick={() => handleViewClick(reparacion)}>
                      <FaEye />
                    </ViewButton>
                  </ActionsCell>
                </td>
                <td>
                  <ActionsCell>
                    <FinalizarButton
                      onClick={() =>
                        handleFinalizarClick(reparacion.id_reparacion)
                      }
                    >
                      <FaCheck /> {translatedContent.finalizar}
                    </FinalizarButton>
                  </ActionsCell>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </TableContainer>

      <Modal show={verOpen} onHide={handleCloseViewModal}>
        <Modal.Header closeButton style={{ backgroundColor: dark ? '#444' : '#ffffff', color: dark ? '#ffffff' : '#000000' }}>
          <Modal.Title>{translatedContent.detallesReparacion}</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: dark ? '#444' : '#ffffff', color: dark ? '#ffffff' : '#000000' }}>
          {selectedReparacion && (
            <div>
              <p>
                <strong>{translatedContent.id}:</strong>{" "}
                {selectedReparacion.id_reparacion}
              </p>
              <p>
                <strong>{translatedContent.vehiculo}:</strong>{" "}
                {buscarPlacaVehiculo(selectedReparacion.id_vehiculo)}
              </p>
              <p>
                <strong>{translatedContent.mecanico}:</strong>{" "}
                {buscarNombreMecanico(selectedReparacion.id_mecanico)}
              </p>
              <p>
                <strong>{translatedContent.descripcion}:</strong> {selectedReparacion.descripcion}
              </p>
              <p>
                <strong>{translatedContent.fecha}:</strong> {selectedReparacion.fecha_reparacion}
              </p>
              <p>
                <strong>{translatedContent.estado}:</strong> {selectedReparacion.estado}
              </p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: dark ? '#444' : '#ffffff', color: dark ? '#ffffff' : '#000000' }}>
          <Button variant="secondary" onClick={handleCloseViewModal}>
            {translatedContent.cerrar}
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
  height: 100vh;
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
