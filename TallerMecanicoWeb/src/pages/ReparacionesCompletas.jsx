import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FaEye, FaWrench } from "react-icons/fa";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";
import { useGlobalContext } from "../components/GlobalContext";

function ReparacionesCompletas() {
  const { translate, dark } = useGlobalContext(); // Obtener el estado de traducción y modo oscuro
  const [dataComplete, setDataComplete] = useState([]);
  const [verOpen, setVerOpen] = useState(false);
  const [selectedReparacion, setSelectedReparacion] = useState(null);
  const [vehiculos, setVehiculos] = useState([]);
  const [mecanicos, setMecanicos] = useState([]);
  const [repuestos, setRepuestos] = useState([]);
  const [selectedRepuestos, setSelectedRepuestos] = useState([]);
  const [isRepuestosModalOpen, setIsRepuestosModalOpen] = useState(false);

  // Traducciones
  const translatedContent = {
    title: translate ? 'Completed Repairs' : 'Reparaciones Completas',
    id: translate ? 'ID' : 'ID',
    vehiculo: translate ? 'Vehicle' : 'Vehículo',
    mecanico: translate ? 'Mechanic' : 'Mecánico',
    fecha: translate ? 'Date' : 'Fecha',
    estado: translate ? 'Status' : 'Estado',
    descripcion: translate ? 'Description' : 'Descripción',
    acciones: translate ? 'Actions' : 'Acciones',
    detallesReparacion: translate ? 'Repair Details' : 'Detalles de la Reparación',
    repuestosReparacion: translate ? 'Repair Parts' : 'Repuestos de la Reparación',
    cerrar: translate ? 'Close' : 'Cerrar',
    ver: translate ? 'View' : 'Ver',
    gestionar: translate ? 'Manage' : 'Gestionar',
    descripcionRepuesto: translate ? 'Part Description' : 'Descripción del Repuesto',
    precioUnitario: translate ? 'Unit Price' : 'Precio Unitario',
    cantidad: translate ? 'Quantity' : 'Cantidad',
  };

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
    <Container style={{ backgroundColor: dark ? '#333' : '#ffffff', color: dark ? '#ffffff' : '#000000' }}>
      <Header>
        <h2 style={{ color: dark ? '#ffffff' : '#000000' }}>{translatedContent.title}</h2>
      </Header>
      <TableContainer style={{ backgroundColor: dark ? '#333' : '#ffffff', color: dark ? '#ffffff' : '#000000' }}>
        <Table>
          <thead>
            <tr>
              <th style={{ color: dark ? '#ffffff' : '#000000' }}>{translatedContent.id}</th>
              <th style={{ color: dark ? '#ffffff' : '#000000' }}>{translatedContent.vehiculo}</th>
              <th style={{ color: dark ? '#ffffff' : '#000000' }}>{translatedContent.mecanico}</th>
              <th style={{ color: dark ? '#ffffff' : '#000000' }}>{translatedContent.fecha}</th>
              <th style={{ color: dark ? '#ffffff' : '#000000' }}>{translatedContent.estado}</th>
              <th style={{ color: dark ? '#ffffff' : '#000000' }}>{translatedContent.descripcion}</th>
              <th style={{ color: dark ? '#ffffff' : '#000000' }}>{translatedContent.acciones}</th>
            </tr>
          </thead>
          <tbody style={{ overflowY: "auto" }}>
            {dataComplete.map((reparacion) => (
              <tr key={reparacion.id_reparacion}>
                <td style={{ color: dark ? '#ffffff' : '#000000' }}>{reparacion.id_reparacion}</td>
                <td style={{ color: dark ? '#ffffff' : '#000000' }}>{buscarPlacaVehiculo(reparacion.id_vehiculo)}</td>
                <td style={{ color: dark ? '#ffffff' : '#000000' }}>{buscarNombreMecanico(reparacion.id_mecanico)}</td>
                <td style={{ color: dark ? '#ffffff' : '#000000' }}>{reparacion.fecha_reparacion}</td>
                <td style={{ color: dark ? '#ffffff' : '#000000' }}>{reparacion.estado}</td>
                <td style={{ color: dark ? '#ffffff' : '#000000' }}>{reparacion.descripcion}</td>
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

      <Modal
        show={isRepuestosModalOpen}
        onHide={handleCloseRepuestosModal}
        size="lg"
      >
        <Modal.Header closeButton style={{ backgroundColor: dark ? '#444' : '#ffffff', color: dark ? '#ffffff' : '#000000' }}>
          <Modal.Title>{translatedContent.repuestosReparacion}</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: dark ? '#444' : '#ffffff', color: dark ? '#ffffff' : '#000000' }}>
          <Table>
            <thead>
              <tr>
                <th style={{ color: dark ? '#ffffff' : '#000000' }}>{translatedContent.id}</th>
                <th style={{ color: dark ? '#ffffff' : '#000000' }}>{translatedContent.descripcionRepuesto}</th>
                <th style={{ color: dark ? '#ffffff' : '#000000' }}>{translatedContent.precioUnitario}</th>
                <th style={{ color: dark ? '#ffffff' : '#000000' }}>{translatedContent.cantidad}</th>
              </tr>
            </thead>
            <tbody>
              {selectedRepuestos.map((repuesto, index) => (
                <tr key={index}>
                  <td style={{ color: dark ? '#ffffff' : '#000000' }}>{repuesto.id_repuesto}</td>
                  <td style={{ color: dark ? '#ffffff' : '#000000' }}>{repuesto.descripcion}</td>
                  <td style={{ color: dark ? '#ffffff' : '#000000' }}>{repuesto.precio}</td>
                  <td style={{ color: dark ? '#ffffff' : '#000000' }}>{repuesto.cantidad}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: dark ? '#444' : '#ffffff', color: dark ? '#ffffff' : '#000000' }}>
          <Button variant="secondary" onClick={handleCloseRepuestosModal}>
            {translatedContent.cerrar}
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
