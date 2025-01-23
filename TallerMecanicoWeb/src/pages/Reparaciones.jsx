import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FaTrashAlt, FaEye, FaPlus, FaWrench } from "react-icons/fa";
import Swal from "sweetalert2";
import axios from "axios";

function Reparaciones() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRepuestosModalOpen, setIsRepuestosModalOpen] = useState(false);
  const [vehiculos, setVehiculos] = useState([]);
  const [mecanicos, setMecanicos] = useState([]);
  const [vehiculo, setVehiculo] = useState("");
  const [mecanico, setMecanico] = useState("");
  const [fechaReparacion, setFechaReparacion] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [estado, setEstado] = useState("Pendiente");
  const [repuestos, setRepuestos] = useState([]);
  const [selectedRepuestos, setSelectedRepuestos] = useState([]);
  const [selectedReparacion, setSelectedReparacion] = useState(null);
  const [data, setData] = useState([]);

  // Obtener datos iniciales
  useEffect(() => {
    getReparaciones();
    getVehiculos();
    getMecanicos();
    getRepuestos();
  }, []);

  const getReparaciones = () => {
    axios
      .get("http://localhost:3001/api/reparaciones")
      .then((response) => setData(response.data))
      .catch((error) => console.error("Error al obtener reparaciones:", error));
  };

  const getVehiculos = () => {
    axios
      .get("http://localhost:3001/api/vehiculos")
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

  const handleAddClick = () => setIsModalOpen(true);

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
    setSelectedReparacion(null);
  };

  const handleManageRepuestos = (reparacion) => {
    setSelectedReparacion(reparacion);
    setIsRepuestosModalOpen(true);
  };

  const setReparacion = () => {
    console.log({ vehiculo, mecanico, fechaReparacion, descripcion, estado });

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
        estado 
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





  const deleteReparacion = (id) => {
    axios
      .delete(`http://localhost:3001/api/reparaciones/${id}`)
      .then(() => {
        Swal.fire("Eliminado", "Reparación eliminada correctamente.", "success");
        getReparaciones();
      })
      .catch((error) => console.error("Error al eliminar reparación:", error));
  };

  const saveRepuestos = () => {
    axios
      .post(`http://localhost:3001/api/reparaciones/${selectedReparacion.id}/repuestos`, {
        repuestos: selectedRepuestos,
      })
      .then(() => {
        Swal.fire("¡Éxito!", "Repuestos añadidos a la reparación.", "success");
        handleCloseRepuestosModal();
      })
      .catch((error) => console.error("Error al guardar repuestos:", error));
  };

  return (
    <Container>
      <Header>
        <h2>Solicitudes de Reparación</h2>
        <AddButton onClick={handleAddClick}>
          <FaPlus /> Nueva Reparación
        </AddButton>
      </Header>
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
          </tr>
        </thead>
        <tbody>
          {data.map((reparacion) => (
            <tr key={reparacion.id_reparacion}>
              <td>{reparacion.id_reparacion}</td>
              <td>{reparacion.id_vehiculo}</td>
              <td>{reparacion.id_mecanico}</td>
              <td>{reparacion.fecha_reparacion}</td>
              <td>{reparacion.descripcion}</td>
              <td>{reparacion.estado}</td>
              <td>
                <ActionsCell>
                  <DeleteButton onClick={() => deleteReparacion(reparacion.id)}>
                    <FaTrashAlt />
                  </DeleteButton>
                  <ManageButton onClick={() => handleManageRepuestos(reparacion)}>
                    <FaWrench />
                  </ManageButton>
                </ActionsCell>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {isModalOpen && (
        <ModalOverlay>
          <ModalContent>
            <h3>Registrar Reparación</h3>
            <Form>
              <label>
                Vehículo:
                <select
                  value={vehiculo}
                  onChange={(e) => setVehiculo(e.target.value)}
                >
                  <option value="">Seleccione un vehículo</option>
                  {vehiculos.map((v) => (
                    <option key={v.id_vehiculo} value={v.id_vehiculo}>
                      {v.placa}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                Mecánico:
                <select
                  value={mecanico}
                  onChange={(e) => setMecanico(e.target.value)} // Aquí se obtiene el id
                >
                  <option value="">Seleccione un mecánico</option>
                  {mecanicos.map((m) => (
                    <option key={m.cedula} value={m.cedula}> {/* El value es el id */}
                      {m.nombre} {/* El texto visible es el nombre del mecánico */}
                    </option>
                  ))} 
                </select>

              </label>
              <label>
                Descripción:
                <textarea
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                />
              </label>
              <label>
                Fecha de Reparación:
                <input
                  type="date"
                  value={fechaReparacion}
                  onChange={(e) => setFechaReparacion(e.target.value)}
                />
              </label>


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
                  multiple
                  value={selectedRepuestos}
                  onChange={(e) =>
                    setSelectedRepuestos([...e.target.selectedOptions].map((o) => o.value))
                  }
                >
                  {repuestos.map((repuesto) => (
                    <option key={repuesto.id} value={repuesto.id}>
                      {repuesto.nombre}
                    </option>
                  ))}
                </select>
              </label>
              <ActionButtons>
                <SaveButton onClick={saveRepuestos}>Guardar</SaveButton>
                <CloseButton onClick={handleCloseRepuestosModal}>Cerrar</CloseButton>
              </ActionButtons>
            </Form>
          </ModalContent>
        </ModalOverlay>
      )}
    </Container>
  );
}

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
  background-color: #dde6ed; /* Fondo principal */
  color: #27374d; /* Texto principal */
  padding: 20px;
  font-family: Arial, sans-serif;
  min-height: 100vh;
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

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: #ffffff; /* Fondo de la tabla */

  th, td {
    border: 1px solid #9db2bf; /* Bordes de celdas */
    padding: 10px;
    text-align: left;
  }

  th {
    background-color: #526d82; /* Encabezado de la tabla */
    color: #dde6ed;
  }

  tbody tr:hover {
    background-color: #f0f4f8; /* Hover en filas */
  }
`;

const ActionsCell = styled.td`
  display: flex;
  gap: 10px;
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
`;

const ModalContent = styled.div`
  background-color: #ffffff; /* Fondo del modal */
  color: #27374d; /* Texto del modal */
  padding: 20px;
  border-radius: 10px;
  width: 400px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

  h3 {
    margin-bottom: 15px;
  }
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;

  label {
    font-size: 14px;
    color: #526d82;

    input, textarea, select {
      width: 100%;
      padding: 8px;
      border: 1px solid #9db2bf;
      border-radius: 5px;
      margin-top: 5px;
    }
  }
`;

const ActionButtons = styled.div`
  display: flex;
  justify-content: space-between;
`;

const SaveButton = styled.button`
  background-color: #526d82; /* Botón guardar */
  color: #dde6ed;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #27374d; /* Hover del botón guardar */
  }
`;

const CloseButton = styled.button`
  background-color: #d9534f; /* Botón cerrar */
  color: #ffffff;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #c9302c; /* Hover del botón cerrar */
  }
`;


export default Reparaciones;
