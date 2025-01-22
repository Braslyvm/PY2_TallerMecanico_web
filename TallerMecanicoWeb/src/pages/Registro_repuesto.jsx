import React, { useState, useCallback } from "react";
import styled from "styled-components";
import { FaTrashAlt, FaEdit, FaEye } from "react-icons/fa";
import { useDropzone } from "react-dropzone";

function RegistroRepuesto() {
  // Estado para gestionar las piezas registradas
  const [piezas, setPiezas] = useState([
    { nombre: "Pieza 1", precio: 100, cantidad: 5, foto: null },
    { nombre: "Pieza 2", precio: 150, cantidad: 3, foto: null },
    { nombre: "Pieza 3", precio: 200, cantidad: 10, foto: null },
    { nombre: "Pieza 4", precio: 250, cantidad: 2, foto: null },
    { nombre: "Pieza 5", precio: 50, cantidad: 8, foto: null },
    { nombre: "Pieza 6", precio: 300, cantidad: 1, foto: null },
    { nombre: "Pieza 7", precio: 120, cantidad: 7, foto: null },
    { nombre: "Pieza 8", precio: 180, cantidad: 4, foto: null },
    { nombre: "Pieza 9", precio: 75, cantidad: 6, foto: null },
    { nombre: "Pieza 10", precio: 95, cantidad: 9, foto: null },
  ]);

  // Estado para controlar la apertura del modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  // Estados para capturar los valores del formulario
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [foto, setFoto] = useState(null);
  const [descripcion, setDescripcion] = useState("");
  const [vehiculosCompatibles, setVehiculosCompatibles] = useState("");

  // Función para manejar el archivo cargado (imagen de la pieza)
  const onDrop = useCallback((acceptedFiles) => {
    setFoto(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  // Función para manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    const nuevaPieza = {
      nombre,
      precio: parseFloat(precio),
      cantidad: parseInt(cantidad, 10),
      foto,
      descripcion,
      vehiculosCompatibles,
    };
    setPiezas([...piezas, nuevaPieza]);
    setNombre("");
    setPrecio("");
    setCantidad("");
    setFoto(null);
    setDescripcion("");
    setVehiculosCompatibles("");
    setIsModalOpen(false); // Cerrar la ventana modal después de registrar
  };

  // Función para eliminar una pieza de la tabla
  const handleDelete = (index) => {
    const nuevasPiezas = piezas.filter((_, i) => i !== index);
    setPiezas(nuevasPiezas);
  };

  return (
    <Container>
      <Header>
        <h2>Gestión de Repuestos</h2>
        {/* Botón para abrir la ventana modal */}
        <Button onClick={() => setIsModalOpen(true)}>Registrar Repuesto</Button>
      </Header>

      {/* Ventana modal para registrar repuestos */}
      {isModalOpen && (
        <ModalOverlay>
          <ModalContent>
            <h3>Registrar Nuevo Repuesto</h3>
            <Form onSubmit={handleSubmit}>
              <InputField>
                <label>Nombre</label>
                <input
                  type="text"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  required
                />
              </InputField>
              <InputField>
                <label>Precio</label>
                <input
                  type="number"
                  value={precio}
                  onChange={(e) => setPrecio(e.target.value)}
                  required
                />
              </InputField>
              <InputField>
                <label>Cantidad</label>
                <input
                  type="number"
                  value={cantidad}
                  onChange={(e) => setCantidad(e.target.value)}
                  required
                />
              </InputField>
              <InputField>
                <label>Descripción</label>
                <textarea
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                  required
                />
              </InputField>
              <InputField>
                <label>Vehículos Compatibles</label>
                <input
                  type="text"
                  value={vehiculosCompatibles}
                  onChange={(e) => setVehiculosCompatibles(e.target.value)}
                />
              </InputField>
              <Dropzone {...getRootProps()}>
                <input {...getInputProps()} />
                <p>Arrastra la imagen aquí o haz clic para seleccionarla</p>
              </Dropzone>
              {foto && (
                <PreviewImage
                  src={URL.createObjectURL(foto)}
                  alt="Vista previa"
                />
              )}
              <ActionButtons>
                <SubmitButton type="submit">Registrar</SubmitButton>
                <CloseButton onClick={() => setIsModalOpen(false)}>
                  Cerrar
                </CloseButton>
              </ActionButtons>
            </Form>
          </ModalContent>
        </ModalOverlay>
      )}

      {/* Ventana modal para editar repuestos */}

      <Header>
        <h2>Edicion de Repuestos</h2>
      </Header>

      {isModalOpen2 && (
        <ModalOverlay>
          <ModalContent>
            <h3>Registrar Nuevo Repuesto</h3>
            <Form onSubmit={handleSubmit}>
              <InputField>
                <label>Nombre</label>
                <input
                  type="text"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  required
                />
              </InputField>
              <InputField>
                <label>Precio</label>
                <input
                  type="number"
                  value={precio}
                  onChange={(e) => setPrecio(e.target.value)}
                  required
                />
              </InputField>
              <InputField>
                <label>Cantidad</label>
                <input
                  type="number"
                  value={cantidad}
                  onChange={(e) => setCantidad(e.target.value)}
                  required
                />
              </InputField>
              <InputField>
                <label>Descripción</label>
                <textarea
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                  required
                />
              </InputField>
              <InputField>
                <label>Vehículos Compatibles</label>
                <input
                  type="text"
                  value={vehiculosCompatibles}
                  onChange={(e) => setVehiculosCompatibles(e.target.value)}
                />
              </InputField>
              <Dropzone {...getRootProps()}>
                <input {...getInputProps()} />
                <p>Arrastra la imagen aquí o haz clic para seleccionarla</p>
              </Dropzone>
              {foto && (
                <PreviewImage
                  src={URL.createObjectURL(foto)}
                  alt="Vista previa"
                />
              )}
              <ActionButtons>
                <SubmitButton type="submit">Registrar</SubmitButton>
                <CloseButton onClick={() => setIsModalOpen(false)}>
                  Cerrar
                </CloseButton>
              </ActionButtons>
            </Form>
          </ModalContent>
        </ModalOverlay>
      )}

      {/* Tabla para mostrar los repuestos */}
      <TableContainer>
        <Table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Cantidad</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {piezas.map((pieza, index) => (
              <tr key={index}>
                <td>{pieza.nombre}</td>
                <td>₡{pieza.precio.toFixed(2)}</td>
                <td>{pieza.cantidad}</td>
                <td>
                  <Actions>
                    {/* Botones de acciones: editar, visualizar y eliminar */}
                    <ActionButton onClick={() => setIsModalOpen2(true)}>
                      <FaEdit />
                    </ActionButton>
                    <ActionButton onClick={() => setIsModalOpen2(true)}>
                      <FaEye />
                    </ActionButton>
                    <ActionButton onClick={() => handleDelete(index)}>
                      <FaTrashAlt />
                    </ActionButton>
                  </Actions>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default RegistroRepuesto;

// Estilos
const Container = styled.div`
  height: 100vh; /* Ocupa toda la pantalla */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 20px;
  background-color: #f8f9fa;
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const Button = styled.button`
  padding: 10px 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  width: 400px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  z-index: 1001;
  h3 {
    margin-bottom: 15px;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const InputField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;

  label {
    font-weight: bold;
  }

  input,
  textarea {
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
  }

  textarea {
    resize: vertical;
  }
`;

const Dropzone = styled.div`
  border: 2px dashed #ccc;
  border-radius: 8px;
  padding: 20px;
  text-align: center;
  color: #555;
  cursor: pointer;

  &:hover {
    background-color: #f1f1f1;
  }
`;

const PreviewImage = styled.img`
  margin-top: 10px;
  max-width: 100px;
  max-height: 100px;
  object-fit: cover;
  border-radius: 8px;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 10px;
`;

const SubmitButton = styled.button`
  padding: 10px 15px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #218838;
  }
`;

const CloseButton = styled.button`
  padding: 10px 15px;
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #c82333;
  }
`;

const TableContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  overflow-y: auto;
  max-height: 400px;
  margin-top: 20px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  th,
  td {
    padding: 12px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }

  th {
    background-color: #007bff;
    color: white;
    position: sticky;
    top: 0;
    z-index: 1;
  }

  tr:hover {
    background-color: #f1f1f1;
  }
`;

const Actions = styled.div`
  display: flex;
  gap: 10px;
`;

const ActionButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: #555;

  &:hover {
    color: #007bff;
  }
`;
