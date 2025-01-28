import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FaTrashAlt, FaEye, FaPlus, FaWrench, FaTable } from "react-icons/fa";
import { Modal,Button,Form } from "react-bootstrap";
import Swal from "sweetalert2";
import axios from "axios";

function Reparaciones() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRepuestosModalOpen, setIsRepuestosModalOpen] = useState(false);
  const [verOpen, setVerOpen] = useState(false);
  const [vehiculos, setVehiculos] = useState([]);
  const [diagnosticos, setDiagnosticos] = useState([]);
  const [mecanicos, setMecanicos] = useState([]);
  const [vehiculo, setVehiculo] = useState("");
  const [mecanico, setMecanico] = useState("");
  const [fechaReparacion, setFechaReparacion] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [estado, setEstado] = useState("Pendiente");
  const [repuestos, setRepuestos] = useState([]);
  const [repuestosFiltrados, setRepuestosFiltrados] = useState([]); //Son los repuestos de un vehículo en especifico con la misma marca
  const [selectedRepuestos, setSelectedRepuestos] = useState([]);
  const [selectedReparacion, setSelectedReparacion] = useState(null); //ID de la reparacion
  const [selectedRepuesto, setSelectedRepuesto] = useState(null); //ID del repuesto
  const [cantidad, setCantidad] = useState(1);
  const [data, setData] = useState([]);
  const [dataComplete, setDataComplete] = useState([]);
  const [isViewAllModalOpen, setIsViewAllModalOpen] = useState(false); // Nuevo estado para el modal de visualización de todas las reparaciones

  // Obtener datos iniciales
  useEffect(() => {
    getReparaciones();
    getVehiculos();
    getMecanicos();
    getRepuestos();
    diagnosticosVehiculos();
    getReparacionesCompletas();
  }, []);

  const getReparacionesCompletas = () => {
    axios
      .get("http://localhost:3001/api/reparaciones")
      .then((response) => setDataComplete(response.data))
      .catch((error) => console.error("Error al obtener reparaciones completas:", error));
      console.log(dataComplete);
  }
  const getReparaciones = () => {
    axios
      .get("http://localhost:3001/api/reparaciones/estado/Pendiente")
      .then((response) => setData(response.data))
      .catch((error) => console.error("Error al obtener reparaciones pendientes:", error));
  };

  const getVehiculos = () => {
    axios
      .get("http://localhost:3001/api/vehiculos/completa")
      .then((response) => setVehiculos(response.data))
      .catch((error) => console.error("Error al obtener vehículos:", error));
  };

  const diagnosticosVehiculos = async () => {
    const diagnosticosResponse = await axios.get("http://localhost:3001/api/diagnostico");
      setDiagnosticos(diagnosticosResponse.data);

      // Ordenar los diagnósticos por fecha_diagnostico en orden descendente
      diagnosticos.sort((a, b) => new Date(b.fecha_diagnostico) - new Date(a.fecha_diagnostico));
  }


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

  const handleAddClick = () => setIsModalOpen(true);

  const handleViewAllClick = () => {
    getReparacionesCompletas();
    setIsViewAllModalOpen(true);
  };

  const handleCloseViewAllModal = () => setIsViewAllModalOpen(false);


  const handleCloseModal = () => {
    setIsModalOpen(false);
    setVehiculo("");
    setMecanico("");
    setDescripcion("");
    setEstado("Pendiente");
  };

  const handleCloseRepuestosModal = () => {
    setIsRepuestosModalOpen(false);
    setSelectedRepuestos([]);
    setRepuestosFiltrados([]);
    setSelectedReparacion(null);
  };

  const handleManageRepuestos = (reparacion) => {
    setSelectedReparacion(reparacion.id_reparacion);
    getRepuestosFiltrados(reparacion);
    getRepuestosReparacion(reparacion.id_reparacion);
    setIsRepuestosModalOpen(true);
  };

  const getRepuestosFiltrados = (reparacion) => {
    //Primero buscamos el vehículo de la reparación
    for (let i = 0; i < vehiculos.length; i++) {
      console.log('Vehiculo ID',vehiculos[i].id_vehiculo, 'Reparacion ID', reparacion.id_vehiculo);
      if (vehiculos[i].id_vehiculo === reparacion.id_vehiculo) {
        console.log('Vehiculo encontrado');
        for (let j = 0; j < repuestos.length; j++) {
          console.log('Marca Vehiculo', vehiculos[i].id_marca, 'Marca Repuesto', repuestos[j].id_marca);
          if (Number(vehiculos[i].id_marca) === Number(repuestos[j].id_marca)) {
            repuestosFiltrados.push(repuestos[j]);
          }
        }
      }
    }
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

  const setReparacion = () => {
    // Validación previa
    if (!vehiculo || !mecanico || !descripcion || !estado || !fechaReparacion) {
      Swal.fire("Error", "Por favor, completa todos los campos.", "error");
      return;
    }

    // Crear nueva reparación, con los nombres correctos para la base de datos
    const nuevaReparacion = {
      id_vehiculo: vehiculo, // Cambié 'vehiculo' por 'id_vehiculo'
      id_mecanico: mecanico, // Cambié 'mecanico' por 'id_mecanico'
      fecha_reparacion: fechaReparacion,
      descripcion,
      estado,
    };

    axios
      .post("http://localhost:3001/api/reparaciones", nuevaReparacion)
      .then(() => {
        Swal.fire("¡Éxito!", "Reparación registrada correctamente.", "success");
        getReparaciones();
        handleCloseModal();
      })
      .catch((error) => console.error("Error al agregar reparación:", error));
  };

  const handleViewClick = (reparacion) => {
    setSelectedReparacion(reparacion);
    console.log(reparacion);
    setVerOpen(true);
  }

  //cerrar modal de ver mecanico
  const handleViewModal = () => {
    setVerOpen(false);
    setSelectedReparacion(null);
  };

  const handleRequest = (id_reparacion) => {
    axios
      .put(`http://localhost:3001/api/reparaciones/id/estado`, {id: id_reparacion, estado: 'En espera' })
      .then((response) => {
        console.log(response.data);
        getReparaciones(); // Actualizar la lista de reparaciones pendientes
      })
      .catch((error) => console.error("Error al actualizar el estado de la reparación:", error));
  };

  const deleteReparacion = (id) => {
    axios
      .post(`http://localhost:3001/api/reparaciones/delete`, { id })
      .then(() => {
        Swal.fire({
          text: "Reparación eliminada correctamente.",
          imageUrl:
            "https://cdn1.iconfinder.com/data/icons/ionicons-outline-vol-2/512/trash-bin-outline-512.png",
          imageWidth: 100,
          imageHeight: 100,
          imageAlt: "Basurero",
          confirmButtonText: "Aceptar",
        });
        getReparaciones();
      })
      .catch((error) => console.error("Error al eliminar reparación:", error));
      axios
      .post(`http://localhost:3001/api/repuestos_reparacion/delete`, { id })
      .catch((error) => console.error("Error al eliminar reparación:", error));
  };

  const saveRepuesto = () => {
    if (!selectedRepuesto) {
      Swal.fire("Error", "Debe seleccionar un repuesto.", "error");
      return;
    }

    axios
      .post("http://localhost:3001/api/repuestos_reparacion", {
        id_reparacion: selectedReparacion,
        id_repuesto: selectedRepuesto,
        cantidad_utilizada: cantidad,
      })
      .then(() => {
        Swal.fire("¡Éxito!", "Repuesto añadido a la reparación.", "success");
        handleCloseRepuestosModal();
      })
      .catch((error) => {
        console.error("Error al guardar repuesto:", error);
      });
  };

  const buscarPlacaVehiculo = (id) => {
    for (let i = 0; i < vehiculos.length; i++) {
      if (vehiculos[i].id_vehiculo === id) {
        return vehiculos[i].placa;
      }
    }
  };

  const buscarNombreMecanico = (cedula) => {
    for (let i = 0; i < mecanicos.length; i++) {
      if (mecanicos[i].cedula === cedula) {
        return mecanicos[i].nombre;
      }
    }
  };

  return (
    <Container>
      <Header>
        <h2>Solicitudes de Reparación</h2>
        <AddButton onClick={handleAddClick}>
          <FaPlus /> Nueva Reparación
        </AddButton>
        <AddButton variant="secondary" onClick={handleViewAllClick}>
            <FaTable /> Ver Todas las Reparaciones
        </AddButton>
      </Header>
      <TableContainer>
        <Table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Placa</th>
              <th>Mecánico</th>
              <th>Fecha</th>
              <th>Descripción</th>
              <th>Estado</th>
              <th>Acciones</th>
              <th>Solicitud</th>
            </tr>
          </thead>
          <TableBody>
            {data.map((reparacion, index) => (
              <tr key={reparacion.id_reparacion}>
                <td>
                  {reparacion.id_reparacion}
                </td>
                <td>
                  {buscarPlacaVehiculo(reparacion.id_vehiculo)}
                </td>
                <td>
                    {buscarNombreMecanico(reparacion.id_mecanico)}
               
                </td>
                <td>
                {reparacion.fecha_reparacion}
                </td>
                <td>
                 {reparacion.descripcion}
                </td>
                <td>
               {reparacion.estado}
                </td>
                <td>
                  <ActionsCell>
                    <DeleteButton
                      onClick={() => deleteReparacion(reparacion.id_reparacion)}
                    >
                      <FaTrashAlt />
                    </DeleteButton>
                    <ManageButton
                      onClick={() =>
                        handleManageRepuestos(reparacion)
                      }
                    >
                      <FaWrench />
                    </ManageButton>
                    <ViewButton onClick={() => handleViewClick(reparacion)}>
                      <FaEye />
                    </ViewButton>
                  </ActionsCell>
                </td>
                <td> 
                  <RequestButton 
                    onClick={()=> 
                    handleRequest(reparacion.id_reparacion)}
                    >Realizar solicitud
                  </RequestButton>
                </td>
              </tr>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal show={isViewAllModalOpen} onHide={handleCloseViewAllModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Ver Todas las Reparaciones</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
              <tbody>
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
                      </ActionsCell>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </TableContainer>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseViewAllModal}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>

      {isModalOpen && (
        <ModalOverlay>
          <ModalContent>
            <h3>Registrar Reparación</h3>
            <Form>
              <Form.Group controlId="formVehiculo">
                <Form.Label>Vehículo</Form.Label>
                <Form.Control
                  as="select"
                  value={vehiculo}
                  onChange={(e) => setVehiculo(e.target.value)}
                >
                  <option value="">Seleccione un vehículo</option>
                  {diagnosticos.map((d) => (
                    <option key={d.id_vehiculo} value={d.id_vehiculo}>
                      Placa del vehículo: {buscarPlacaVehiculo(d.id_vehiculo)}, Fecha de diagnóstico: {d.fecha_diagnostico}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="formMecanico">
                <Form.Label>Mecánico</Form.Label>
                <Form.Control
                  as="select"
                  value={mecanico}
                  onChange={(e) => setMecanico(e.target.value)}
                >
                  <option value="">Seleccione un mecánico</option>
                  {mecanicos.map((m) => (
                    <option key={m.cedula} value={m.cedula}>
                      {m.nombre}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="formDescripcion">
                <Form.Label>Descripción</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="formFechaReparacion">
                <Form.Label>Fecha de Reparación</Form.Label>
                <Form.Control
                  type="date"
                  value={fechaReparacion}
                  onChange={(e) => setFechaReparacion(e.target.value)}
                />
              </Form.Group>

              <ActionButtons>
                <SaveButton onClick={setReparacion}>Guardar</SaveButton>
                <CloseButton onClick={handleCloseModal}>Cerrar</CloseButton>
              </ActionButtons>
            </Form>
          </ModalContent>
        </ModalOverlay>
      )}
      {isRepuestosModalOpen && (
        <ModalOverlay>
          <ModalContent>
            <h3>Gestionar Repuestos</h3>
            <Form>
              <label>
                Repuestos:
                <select
                  value={selectedRepuesto || ""}
                  onChange={(e) => setSelectedRepuesto(e.target.value)}
                >
                  <option value="">Seleccione un repuesto</option>
                  {repuestosFiltrados.map((repuesto) => (
                    <option key={repuesto.id} value={repuesto.id_repuesto}>
                      {repuesto.descripcion} - ¢{repuesto.precio}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                Cantidad:
                <input
                  type="number"
                  min="1"
                  value={cantidad}
                  onChange={(e) => setCantidad(e.target.value)}
                />
              </label>
              <ActionButtons>
                <SaveButton onClick={saveRepuesto}>Guardar</SaveButton>
                <CloseButton onClick={handleCloseRepuestosModal}>
                  Cerrar
                </CloseButton>
              </ActionButtons>
            </Form>

            <h4>Repuestos seleccionados:</h4>
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
          </ModalContent>
        </ModalOverlay>
      )}
      <Modal show={verOpen} onHide={handleViewModal}>
        <Modal.Header closeButton>
          <Modal.Title>Detalles de la reparacion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedReparacion && (
            <div>
              <p><strong>ID de reparacion:</strong> {selectedReparacion.id_reparacion}</p>
              <p><strong>Placa de vehículo:</strong> {buscarPlacaVehiculo(selectedReparacion.id_vehiculo)}</p>
              <p><strong>Mecánico asignado:</strong> {buscarNombreMecanico(selectedReparacion.id_mecanico)}</p>
              <p><strong>Descripción del cliente:</strong> {selectedReparacion.descripcion}</p>
              <p><strong>Fecha:</strong> {selectedReparacion.fecha_reparacion}</p>
              <p><strong>Estado:</strong> {selectedReparacion.estado}</p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleViewModal}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
  //table container ajusta el tama;o de la tabla
}
const TableContainer = styled.div`
  max-height: 90%;
  overflow-y: auto; 
  overflow-x: hidden;
  z-index: 1;
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

const Container = styled.div`
  background-color:rgb(254, 255, 255); /* Fondo principal */
  color: #27374d; /* Texto principal */
  padding: 20px;
  font-family: Arial, sans-serif;
  height: 91vh;
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

const AddButton = styled.button`
  background-color: #526d82; /* Botón primario */
  color: #dde6ed; /* Texto del botón */
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #9db2bf; /* Hover del botón */
  }
`;

const RequestButton = styled.button`
  background-color: #526d82; /* Botón primario */
  color: #dde6ed; /* Texto del botón */
  padding: 5px 9px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #9db2bf; /* Hover del botón */
  }
`;

const TableBody = styled.tbody`
  max-height: 300px;
  overflow-y: auto; 
  overflow-x: hidden;
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

const DeleteButton = styled.button`
  background-color: #d9534f; /* Botón eliminar */
  color: #ffffff;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;

  &:hover {
    background-color: #c9302c; /* Hover del botón eliminar */
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: #ffffff;
  color: #27374d;
  padding: 20px;
  border-radius: 10px;
  width: 400px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  z-index: 10;

  h3 {
    margin-bottom: 15px;
  }
`;


const ActionButtons = styled.div`
  display: flex;
  justify-content: space-between;
`;

const SaveButton = styled.button`
  background-color: #526d82;
  color: #dde6ed;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #27374d;
  }
`;

const CloseButton = styled.button`
  background-color: #d9534f;
  color: #ffffff;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #c9302c;
  }
`;

const ViewButton = styled.button`
  padding: 5px 8px;
  background-color:rgba(236, 240, 32, 0.95);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color:rgb(178, 180, 39);
  }
  svg {
    font-size: 14px;
  }
`;

export default Reparaciones;
