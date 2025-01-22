import React, { useState } from 'react';
import styled from 'styled-components';
import { FaTrashAlt, FaEye, FaPlus } from 'react-icons/fa'; // Importar el icono de agregar
import { useDropzone } from 'react-dropzone';

function Mecanicos() {
  const [personas] = useState([
    { nombre: 'Juan Pérez', cedula: '123456789', edad: 30 },
    { nombre: 'María López', cedula: '987654321', edad: 25 },
    { nombre: 'Carlos Gómez', cedula: '111223344', edad: 40 },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [verOpen, setverOpen] = useState(false);
  const [nombre, setNombre] = useState('');
  const [cedula, setCedula] = useState('');
  const [foto, setFoto] = useState(null);
  const [edad, setEdad] = useState('');

  const handleAddClick = () => {
    setIsModalOpen(true);
  };

  const handleViewClick = () => {
    setverOpen(true);
  };

  const handleViewModal = () => {
    setverOpen(false);
  };


  const handleCloseModal = () => {
    setIsModalOpen(false);
    setNombre('');
    setCedula('');
    setFoto(null);
    setEdad('');
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFiles) => {
      setFoto(URL.createObjectURL(acceptedFiles[0]));
    },
  });

  return (
    <HomeContainer>
      {/* Ver plantilla de Mecanico */}
      <Header>
        <h2>Planilla de mecánicos</h2>
        <AddButton onClick={handleAddClick}>
          <FaPlus /> Agregar mecánico
        </AddButton>
      </Header>
      <Table>
        <thead>
          <tr>
            <th>Cédula</th>
            <th>Nombre Completo</th>
            <th>Edad</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {personas.map((persona, index) => (
            <tr key={index}>
              <td>{persona.cedula}</td>
              <td>{persona.nombre}</td>
              <td>{persona.edad}</td>
              <td>
                <ActionsCell>
                  <ViewButton onClick={handleViewClick}>
                    <FaEye />
                  </ViewButton>
                  <DeleteButton >
                    <FaTrashAlt />
                  </DeleteButton>
                </ActionsCell>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {/* Ventana de agregar Mecanico */}
      {isModalOpen && (
        <ModalOverlay>
          <ModalContent>
            <h3>Agregar Mecánico</h3>
            <FormContainer>
              <PhotoInputContainer {...getRootProps()}>
                <input {...getInputProps()} />
                {foto ? (
                  <PreviewImage src={foto} alt="Vista previa" />
                ) : (
                  <div className="upload-box">Arrastra o selecciona una foto</div>
                )}
              </PhotoInputContainer>
              <FormFields>
                <label>
                  Nombre:
                  <input
                    type="text"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                  />
                </label>
                <label>
                  Cédula:
                  <input
                    type="text"
                    value={cedula}
                    onChange={(e) => setCedula(e.target.value)}
                  />
                </label>
                <label>
                  Edad:
                  <input
                    type="number"
                    value={edad}
                    onChange={(e) => setEdad(e.target.value)}
                  />
                </label>
              </FormFields>
            </FormContainer>
            <ActionButtons>
              <SaveButton onClick={() => alert("Guardado")}>Guardar</SaveButton>
              <CloseButton style={{ backgroundColor: '#e84949', color: 'white' }}  onClick={handleCloseModal}>Cerrar</CloseButton>
            </ActionButtons>
          </ModalContent>
        </ModalOverlay>
      )}
      {verOpen && (
        <ModalOverlay>
          <ModalContent>
            <h3>Agregar Mecánico</h3>
            <FormContainer>
              <PhotoInputContainer {...getRootProps()}>
                <input {...getInputProps()} />
                {foto ? (
                  <PreviewImage src={foto} alt="Vista previa" />
                ) : (
                  <div className="upload-box">Arrastra o selecciona una foto</div>
                )}
              </PhotoInputContainer>
              <FormFields>
                <label>
                  Nombre:
                  <input
                    type="text"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                  />
                </label>
                <label>
                  Cédula:
                  <input
                    type="text"
                    value={cedula}
                    onChange={(e) => setCedula(e.target.value)}
                  />
                </label>
                <label>
                  Edad:
                  <input
                    type="number"
                    value={edad}
                    onChange={(e) => setEdad(e.target.value)}
                  />
                </label>
              </FormFields>
            </FormContainer>
            <ActionButtons>
              <SaveButton onClick={() => alert("Guardado")}>Guardar</SaveButton>
              <CloseButton style={{ backgroundColor: '#e84949', color: 'white' }}  onClick={handleViewModal}>Cerrar</CloseButton>
            </ActionButtons>
          </ModalContent>
        </ModalOverlay>
      )}
    </HomeContainer>
  );
}

export default Mecanicos;

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center; 
  overflow-y: auto;
  justify-content: center;
  height: 91vh;
  background-color: #f8f9fa;

`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 600px;
  margin-bottom: 20px;

  h2 {
    font-size: 24px;
    color: #333;
  }
`;

const AddButton = styled.button`
  display: flex;
  align-items: center;
  padding: 10px 15px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  border-radius: 12px;
  svg {
    margin-right: 5px;
  }
  &:hover {
    background-color: #218838;
  }
`;

const Table = styled.table`
  width: 600px;
  border-collapse: collapse;
  margin-top: 10px;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  th, td {
    padding: 12px;
    text-align: left;
    border-bottom: 1px solid #dee2e6;
  }
  th {
    background-color: rgb(16, 200, 49);
    color: white;
  }
  tr:hover {
    background-color: #f1f1f1;
  }
`;
const ActionsCell = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 5px;
`;

const ViewButton = styled.button`
  padding: 5px 8px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #218838;
  }
  svg {
    font-size: 14px;
  }
`;

const DeleteButton = styled.button`
  padding: 5px 8px;
  background-color: #e84949;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: rgb(211, 28, 28);
  }
  svg {
    font-size: 14px;
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
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  width: 800px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  h3 {
    margin-bottom: 15px;
  }
  label {
    display: block;
    width: 400px;
    margin-bottom: 10px;
  }
  input[type='text'],
  input[type='number'],
  input[type='file'] {
    width: 100%;
    padding: 8px;
    margin-top: 5px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  button {
    margin-top: 10px;
    padding: 8px 12px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
      background-color: #0056b3;
    }
  }
`;

const FormContainer = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 20px;
`;

const PhotoInputContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 2px dashed #007bff;
  padding: 20px;
  cursor: pointer;
  text-align: center;

  .upload-box {
    color: #007bff;
    font-size: 16px;
    font-weight: bold;
  }
`;

const PreviewImage = styled.img`
  max-width: 100px;
  max-height: 100px;
  border-radius: 8px;
  object-fit: cover;
  margin-top: 10px;
`;

const FormFields = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ActionButtons = styled.div`
  display: flex;
  justify-content: space-between; /* Separar los botones */
  width: 100%; /* Asegura que ocupen el 100% del ancho disponible */
  margin-top: 15px;
`;

const SaveButton = styled.button`
  padding: 8px 12px;
  background-color: rgb(0, 255, 34);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  
  &:hover {
    background-color: rgb(40, 130, 7);
  }
`;

const CloseButton = styled.button`
  padding: 8px 12px;
  background-color: #e84949; /* Rojo brillante */
  color: white;
  border: none; /* Elimina los bordes predeterminados */
  border-radius: 4px;
  cursor: pointer;
  text-transform: none; 
  outline: none; 
  
  &:hover {
    background-color: #e35050; 
  }

  &:active {
    background-color: #9d0000; 
  }
  
  -webkit-appearance: none; 
  -moz-appearance: none;
`;