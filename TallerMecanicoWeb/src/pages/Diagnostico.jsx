import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEye, FaPlus } from "react-icons/fa";
import styled from "styled-components";
import { useDropzone } from "react-dropzone";
import { Modal, Button, Form } from "react-bootstrap";
import Swal from "sweetalert2";
import translateText from '../components/translate'; // Importar la función de traducción
import { useGlobalContext } from '../components/GlobalContext';


const Diagnostico = () => {
  const [diagnosticos, setDiagnosticos] = useState([]);
  const [vehiculos, setVehiculos] = useState([]);
  const [verOpen, setVerOpen] = useState(false);
  const [selectedDiagnostico, setSelectedDiagnostico] = useState(null);
  const [vehiculo, setVehiculo] = useState("");
  const [foto, setFoto] = useState(null);
  const [descripcion, setDescripcion] = useState("");
  const [descripcionCliente, setDescripcionCliente] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { translate } = useGlobalContext();
  const translatedContent = {
    title: translate ? 'Vehicle Diagnostics Management' : 'Gestión de diagnósticos de vehículos',
    addButton: translate ? 'Register Diagnostic' : 'Registrar diagnóstico',
    noDiagnostics: translate ? 'No diagnostics available.' : 'No hay diagnósticos disponibles.',
    alertErrorLoad: translate ? 'Error loading diagnostics:' : 'Error al cargar los diagnósticos:',
    alertErrorAdd: translate ? 'Error adding diagnostic:' : 'Error al agregar el diagnóstico:',
    alertErrorVehicles: translate ? 'Error obtaining vehicles:' : 'Error al obtener vehículos:',
    alertInvalidImage: translate ? 'Please select a valid image file.' : 'Por favor, selecciona un archivo de imagen válido.',
    save: translate ? 'Save' : 'Guardar',
    cancel: translate ? 'Cancel' : 'Cancelar',
    actions: translate ? 'Actions' : 'Acciones',
    id: translate ? 'Diagnostic ID' : 'ID de diagnóstico',
    plate: translate ? 'Vehicle Plate' : 'Placa de vehículo',
    date: translate ? 'Diagnostic Date' : 'Fecha de diagnóstico',
    technicalDescription: translate ? 'Technical Description' : 'Diagnóstico técnico',
    clientDescription: translate ? 'Client Description' : 'Descripción del cliente',
    vehicle: translate ? 'Vehicle' : 'Vehículo',
    selectVehicle: translate ? 'Select a vehicle' : 'Seleccione un vehículo',
    detailsDiagnostic: translate ? 'Diagnostic Details' : 'Detalles del diagnóstico',
    selectPhoto: translate ? 'Drog or select a photo' : 'Arrastra o elecciona una foto',
    photo: translate ? 'Photo' : 'Foto'
  };

  // Obtener diagnósticos y vehículos al cargar el componente
  useEffect(() => {
    cargarDiagnosticos();
    getVehiculos();
  }, []);

  const cargarDiagnosticos = async () => {
    try {
      const response =  await axios.get("/api/diagnostico");
      setDiagnosticos(response.data);
      console.log("Diagnósticos cargados:", response.data);
    } catch (error) {
      console.error("Error al cargar los diagnósticos:", error);
    }
  };

  const getVehiculos = () => {
    axios
      .get("http://localhost:3001/api/vehiculos/completa")
      .then((response) => setVehiculos(response.data))
      .catch((error) => console.error("Error al obtener vehículos:", error));
  };

  // Configuración de Dropzone
  const onDrop = (acceptedFiles) => {
    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    const file = acceptedFiles[0];

    if (file && validTypes.includes(file.type)) {
      setFoto(file); // Guardar el archivo en lugar de la URL
    } else {
      alert('Por favor, selecciona un archivo de imagen válido.');
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/jpeg': ['.jpeg', '.jpg'],
      'image/png': ['.png'],
      'image/gif': ['.gif'],
      'image/webp': ['.webp'],
    },
    onDrop,
  });

  const agregarDiagnostico = () => {
    const fechaActual = new Date().toISOString().split('T')[0];
    const nuevoDiagnostico = new FormData();
    nuevoDiagnostico.append('id_vehiculo', vehiculo);
    nuevoDiagnostico.append('fecha_diagnostico', fechaActual);
    nuevoDiagnostico.append('diagnostico_tecnico', descripcion);
    nuevoDiagnostico.append('descripcion_cliente', descripcionCliente);
    if (foto) {
      nuevoDiagnostico.append('foto', foto); // Agregar la foto al FormData
    }

    try {
      axios.post("http://localhost:3001/api/diagnostico", nuevoDiagnostico, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      cargarDiagnosticos();
      setVehiculo("");
      setFoto(null);
      setDescripcion("");
      setDescripcionCliente("");
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error al agregar el diagnóstico:", error);
      Swal.fire("Error", "No se pudo agregar el diagnóstico.", "error");
    }
  };

  const handleViewClick = (id_diagnostico, id_vehiculo, fecha_diagnostico, diagnostico_tecnico, descripcion_cliente, foto) => {
    setSelectedDiagnostico({ id_diagnostico, id_vehiculo, fecha_diagnostico, diagnostico_tecnico, descripcion_cliente, foto });
    setVerOpen(true);
  };

  const handleViewModal = () => {
    setVerOpen(false);
    setSelectedDiagnostico(null);
  };

  const handleAddClick = () => setIsModalOpen(true);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setVehiculo("");
    setFoto(null);
    setDescripcion("");
    setDescripcionCliente("");
  };

  const buscarPlacaVehiculo = (id) => {
    for (let i = 0; i < vehiculos.length; i++) {
      if (vehiculos[i].id_vehiculo === id) {
        return vehiculos[i].placa;
      }
    }
  };

  const translateCellContent = (text) => {
    return translate ? translateText(text, 'es', 'en') : translateText(text, 'en', 'es');
  };

  return (
    <Container>
      <Header>
        <h2>{translatedContent.title}</h2>
        <AddButton onClick={handleAddClick}>
          <FaPlus /> {translatedContent.addButton}
        </AddButton>
      </Header>
      <TableContainer>
        <Table>
          <thead>
            <tr>
              <th>{translatedContent.id}</th>
              <th>{translatedContent.plate}</th>
              <th>{translatedContent.date}</th>
              <th>{translatedContent.technicalDescription}</th>
              <th>{translatedContent.clientDescription}</th>
              <th>{translatedContent.actions}</th>
            </tr>
          </thead>
          <TableBody>
            {Array.isArray(diagnosticos) && diagnosticos.length > 0 ? (
              diagnosticos.map((diagnostico) => (
                <tr key={diagnostico.id_diagnostico}>
                  <td>{diagnostico.id_diagnostico}</td>
                  <td>{buscarPlacaVehiculo(diagnostico.id_vehiculo)}</td>
                  <td>{diagnostico.fecha_diagnostico}</td>
                  <td>{translateCellContent(diagnostico.diagnostico_tecnico)}</td>
                  <td>{translateCellContent(diagnostico.descripcion_cliente)}</td>
                  <td style={{ width: '15%' }}>
                    <ActionsCell>
                      <ViewButton onClick={() => handleViewClick(diagnostico.id_diagnostico, buscarPlacaVehiculo(diagnostico.id_vehiculo), diagnostico.fecha_diagnostico, diagnostico.diagnostico_tecnico, diagnostico.descripcion_cliente, diagnostico.foto)}>
                        <FaEye />
                      </ViewButton>
                    </ActionsCell>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">{translatedContent.noDiagnostics}</td>
              </tr>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal para agregar diagnóstico */}
      <Modal show={isModalOpen} onHide={handleCloseModal}>
        <Modal.Header>
          <Modal.Title>{translatedContent.addButton}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formVehiculo">
              <Form.Label>{translatedContent.vehicle}</Form.Label>
              <Form.Control
                as="select"
                value={vehiculo}
                onChange={(e) => setVehiculo(e.target.value)}
              >
                <option value="">{translatedContent.selectVehicle}</option>
                {vehiculos.map((v) => (
                  <option key={v.id_vehiculo} value={v.id_vehiculo}>
                    {translatedContent.plate}: {v.placa}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formDescripcion">
              <Form.Label>{translatedContent.technicalDescription}</Form.Label>
              <Form.Control as="textarea" rows={3} value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="formDescripcionCliente">
              <Form.Label>{translatedContent.clientDescription}</Form.Label>
              <Form.Control as="textarea" rows={3} value={descripcionCliente} onChange={(e) => setDescripcionCliente(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="formFoto">
              <Form.Label>{translatedContent.photo}</Form.Label>
              <PhotoInputContainer {...getRootProps()}>
                <input {...getInputProps()} />
                {foto ? (
                  <PreviewImage src={URL.createObjectURL(foto)} alt="Vista previa" />
                ) : (
                  <div className="upload-box">{translatedContent.selectPhoto}</div>
                )}
              </PhotoInputContainer>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            {translatedContent.cancel}
          </Button>
          <Button variant="primary" onClick={agregarDiagnostico}>
            {translatedContent.save}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal para ver detalles del diagnóstico */}
      <Modal show={verOpen} onHide={handleViewModal}>
        <Modal.Header closeButton>
          <Modal.Title>{translatedContent.detailsDiagnostic}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedDiagnostico && (
            <div>
              <img src={selectedDiagnostico.foto} alt="Foto del diagnóstico" style={{ maxWidth: '100px', borderRadius: '8px' }} />
              <p><strong>{translatedContent.id}:</strong> {selectedDiagnostico.id_diagnostico}</p>
              <p><strong>{translatedContent.plate}:</strong> {selectedDiagnostico.id_vehiculo}</p>
              <p><strong>{translatedContent.technicalDescription}:</strong> {translateCellContent(selectedDiagnostico.diagnostico_tecnico)}</p>
              <p><strong>{translatedContent.clientDescription}:</strong> {translateCellContent(selectedDiagnostico.descripcion_cliente)}</p>
              <p><strong>{translatedContent.date}:</strong> {selectedDiagnostico.fecha_diagnostico}</p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleViewModal}>
            {translatedContent.cancel}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};


const TableContainer = styled.div`
  max-height: 90%;
  overflow-y: auto; 
  overflow-x: hidden;
  z-index: 1;
`;

const FormContainer = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 20px;
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

const PhotoInputContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 2px dashed #526D82;
  padding: 20px;
  cursor: pointer;
  text-align: center;

  .upload-box {
    color: #526D82;
    font-size: 16px;
    font-weight: bold;
  }
`;

const PhotoviewContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  cursor: pointer;
  text-align: center;
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
  align-items: center;
  justify-content: center;
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



const ModalContent = styled.div`
  background-color: #ffffff;
  color: #27374d;
  padding: 20px;
  border-radius: 10px;
  width: 90%; /* El contenedor ocupará el 90% del ancho de la ventana */
  max-width: 1200px; /* Ancho máximo de 1200px */
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

export default Diagnostico;
