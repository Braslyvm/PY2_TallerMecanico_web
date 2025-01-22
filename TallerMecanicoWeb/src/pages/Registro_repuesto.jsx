import React, { useState, useCallback } from "react";
import styled from "styled-components";
import { FaTrashAlt, FaEdit, FaEye } from "react-icons/fa";
import { useDropzone } from "react-dropzone";

function RegistroRepuesto() {
  const [piezas, setPiezas] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [isModalOpen3, setIsModalOpen3] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [foto, setFoto] = useState(null);
  const [vehiculosCompatibles, setVehiculosCompatibles] = useState("");
  const [descripcion, setDescripcion] = useState("");

  const onDrop = useCallback((acceptedFiles) => {
    setFoto(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });
  //guardar datos nuevos
  const handleSubmit = (e) => {
    e.preventDefault();
    const nuevaPieza = {
      nombre,
      precio: parseFloat(precio),
      cantidad: parseInt(cantidad, 10),
      foto,
      vehiculosCompatibles,
      descripcion,
    };
    setPiezas([...piezas, nuevaPieza]);
    setIsModalOpen(false); // Cerrar el modal después de enviar el formulario
  };
  //guardar datos actr
  const updatesumit = (e) => {
    e.preventDefault();
    const updatedPiezas = piezas.map((pieza, index) =>
      index === selectedIndex
        ? {
            ...pieza,
            nombre,
            precio: parseFloat(precio),
            cantidad: parseInt(cantidad, 10),
            foto,
            vehiculosCompatibles,
            descripcion,
          }
        : pieza
    );
    setPiezas(updatedPiezas);
    setIsModalOpen3(false); // Cerrar el modal después de enviar el formulario
  };

  const handleEdit = (index) => {
    // Cargar los datos del repuesto seleccionado
    const pieza = piezas[index];
    setNombre(pieza.nombre);
    setPrecio(pieza.precio);
    setCantidad(pieza.cantidad);
    setFoto(pieza.foto);
    setVehiculosCompatibles(pieza.vehiculosCompatibles);
    setDescripcion(pieza.descripcion);
    setSelectedIndex(index);
    setIsModalOpen3(true);
  };
  const handleView = (index) => {
    // Cargar los datos del repuesto seleccionado
    const pieza = piezas[index];
    setNombre(pieza.nombre);
    setPrecio(pieza.precio);
    setCantidad(pieza.cantidad);
    setFoto(pieza.foto);
    setVehiculosCompatibles(pieza.vehiculosCompatibles);
    setDescripcion(pieza.descripcion);
    setSelectedIndex(index);
    setIsModalOpen2(true);
  };

  const handleDelete = (index) => {
    // lógica para eliminar la pieza
    const nuevasPiezas = piezas.filter((_, i) => i !== index);
    setPiezas(nuevasPiezas);
    console.log("Eliminar pieza en el índice:", index);
  };

  return (
    <FormContainer>
      <Header>
        <h2>Gestión de Repuestos</h2>
        <Button onClick={() => setIsModalOpen(true)}>Registrar Repuesto</Button>
      </Header>

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
                <label>Vehículos Compatibles</label>
                <input
                  type="text"
                  value={vehiculosCompatibles}
                  onChange={(e) => setVehiculosCompatibles(e.target.value)}
                  placeholder="Marca, modelo, año"
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
                <label>Foto</label>
                <div
                  {...getRootProps()}
                  style={{
                    border: "2px dashed #cccccc",
                    padding: "20px",
                    textAlign: "center",
                  }}
                >
                  <input {...getInputProps()} />
                  <p>
                    Arrastra y suelta una imagen aquí, o haz clic para
                    seleccionar una
                  </p>
                  {foto && (
                    <img
                      src={URL.createObjectURL(foto)}
                      alt="Vista previa"
                      style={{ width: "50px", height: "50px" }}
                    />
                  )}
                </div>
              </InputField>
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

      {isModalOpen2 && (
        <ModalOverlay>
          <ModalContent>
            <h3>Visualizar Repuesto</h3>
            <Form>
              <InputField>
                <label>Nombre</label>
                <input type="text" value={nombre} readOnly />
              </InputField>
              <InputField>
                <label>Precio</label>
                <input type="number" value={precio} readOnly />
              </InputField>
              <InputField>
                <label>Cantidad</label>
                <input type="number" value={cantidad} readOnly />
              </InputField>
              <InputField>
                <label>Vehículos Compatibles</label>
                <input type="text" value={vehiculosCompatibles} readOnly />
              </InputField>
              <InputField>
                <label>Descripción</label>
                <textarea value={descripcion} readOnly />
              </InputField>
              <InputField>
                <label>Foto</label>
                {foto && (
                  <img
                    src={URL.createObjectURL(foto)}
                    alt="Vista previa"
                    style={{ width: "50px", height: "50px" }}
                  />
                )}
              </InputField>
              <ActionButtons>
                <CloseButton onClick={() => setIsModalOpen2(false)}>
                  Cerrar
                </CloseButton>
              </ActionButtons>
            </Form>
          </ModalContent>
        </ModalOverlay>
      )}
      {isModalOpen3 && (
        <ModalOverlay>
          <ModalContent>
            <h3>Modificar Repuesto</h3>
            <Form onSubmit={updatesumit}>
              <InputField>
                <label>Nombre</label>
                <input
                  type="text"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                />
              </InputField>
              <InputField>
                <label>Precio</label>
                <input type="number" value={precio} readOnly />
              </InputField>
              <InputField>
                <label>Cantidad</label>
                <input type="number" value={cantidad} readOnly />
              </InputField>
              <InputField>
                <label>Vehículos Compatibles</label>
                <input type="text" value={vehiculosCompatibles} readOnly />
              </InputField>
              <InputField>
                <label>Descripción</label>
                <textarea value={descripcion} readOnly />
              </InputField>
              <InputField>
                <label>Foto</label>
                {foto && (
                  <img
                    src={URL.createObjectURL(foto)}
                    alt="Vista previa"
                    style={{ width: "50px", height: "50px" }}
                  />
                )}
              </InputField>
              <ActionButtons>
                <SubmitButton type="submit">Registrar</SubmitButton>
                <CloseButton onClick={() => setIsModalOpen3(false)}>
                  Cerrar
                </CloseButton>
              </ActionButtons>
            </Form>
          </ModalContent>
        </ModalOverlay>
      )}

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
                  <ActionsCell>
                    <EditButton onClick={() => handleEdit(index)}>
                      <FaEdit />
                    </EditButton>
                    <ViewButton onClick={() => handleView(index)}>
                      <FaEye />
                    </ViewButton>
                    <DeleteButton onClick={() => handleDelete(index)}>
                      <FaTrashAlt />
                    </DeleteButton>
                  </ActionsCell>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </TableContainer>
    </FormContainer>
  );
}

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  padding: 20px;
  box-sizing: border-box;
`;

const Header = styled.div`
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
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const InputField = styled.div`
  margin-bottom: 15px;
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

const ActionsCell = styled.div`
  display: flex;
  gap: 10px;
`;

const EditButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: #555;

  &:hover {
    color: #007bff;
  }
`;

const ViewButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: #555;

  &:hover {
    color: #007bff;
  }
`;

const DeleteButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: #555;

  &:hover {
    color: #ff0000;
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
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 500px;
  max-width: 90%;
  z-index: 1001;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const ActionButtons = styled.div`
  display: flex;
  justify-content: space-between;
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

export default RegistroRepuesto;
