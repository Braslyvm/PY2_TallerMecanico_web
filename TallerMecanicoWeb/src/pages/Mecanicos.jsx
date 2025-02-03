import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FaTrashAlt, FaEye, FaPlus } from "react-icons/fa";
import { useDropzone } from "react-dropzone";
import Swal from "sweetalert2";
import axios from "axios";
import { useGlobalContext } from "../components/GlobalContext";

function Mecanicos() {
  const { translate, dark } = useGlobalContext(); // Obtener el estado de traducción
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [verOpen, setVerOpen] = useState(false);
  const [nombre, setNombre] = useState("");
  const [cedula, setCedula] = useState("");
  const [foto, setFoto] = useState(null);
  const [edad, setEdad] = useState("");
  const [data, setData] = useState([]);
  const [selectedMecanico, setSelectedMecanico] = useState(null);

  const translatedContent = {
    title: translate ? "Mechanics Sheet" : "Planilla de Mecánicos",
    addButton: translate ? "Add Mechanic" : "Agregar Mecánico",
    noMechanics: translate
      ? "No mechanics registered"
      : "No hay mecanicos registrados",
    alertSuccess: translate
      ? "User  added successfully!"
      : "¡Alerta! Usuario agregado Exitosamente!",
    alertDelete: translate
      ? "Mechanic deleted successfully!"
      : "Mecanico eliminado correctamente!",
    alertCompleteFields: translate
      ? "Please complete all fields."
      : "Por favor, completa todos los campos.",
    alertErrorAdd: translate
      ? "Error adding mechanic:"
      : "Error al agregar mecánico:",
    alertErrorDelete: translate
      ? "Error deleting mechanic:"
      : "Error al eliminar mecánico:",
    detailsTitle: translate ? "Mechanic Details" : "Detalles del Mecánico",
    name: translate ? "Name:" : "Nombre:",
    id: translate ? "ID:" : "Cédula:",
    age: translate ? "Age:" : "Edad:",
    save: translate ? "Save" : "Guardar",
    close: translate ? "Close" : "Cerrar",
    accept: translate ? "Accept" : "Aceptar",
    acciones: translate ? "Actions" : "Acciones",
    foto: translate
      ? "Drag or select a photo"
      : "Arrastra o selecciona una foto",
    volver: translate ? "back" : "volver",
  };

  const AlertRegiter = () => {
    Swal.fire({
      title: "¡Alerta!",
      text: translatedContent.alertSuccess,
      icon: "success",
      confirmButtonText: translatedContent.accept,
    });
  };

  const AlertDelete = () => {
    Swal.fire({
      text: translatedContent.alertDelete,
      imageUrl:
        "https://cdn1.iconfinder.com/data/icons/ionicons-outline-vol-2/512/trash-bin-outline-512.png",
      imageWidth: 100,
      imageHeight: 100,
      imageAlt: "Basurero",
      confirmButtonText: translatedContent.accept,
    });
  };

  const AlertAviso = (text1) => {
    Swal.fire({
      text: text1,
      imageUrl:
        "https://cdn0.iconfinder.com/data/icons/user-interface-2063/24/UI_Essential_icon_expanded-76-512.png",
      imageWidth: 100,
      imageHeight: 100,
      imageAlt: "aviso",
      confirmButtonText: translatedContent.accept,
    });
  };

  const getMecanicos = () => {
    axios
      .get("http://localhost:3001/api/mecanicos")
      .then((response) => {
        setData(response.data);
        if (response.data.length === 0) {
          AlertAviso(translatedContent.noMechanics);
        }
      })
      .catch((error) => {
        AlertAviso(error);
      });
  };

  useEffect(() => {
    getMecanicos();
  }, []);

  const handleAddClick = () => {
    setIsModalOpen(true);
  };

  const handleViewClick = (cedula, nombre, edad, foto) => {
    setSelectedMecanico({ cedula, nombre, edad, foto });
    setVerOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setNombre("");
    setCedula("");
    setFoto(null);
    setEdad("");
  };

  const handleViewModal = () => {
    setVerOpen(false);
    setSelectedMecanico(null);
  };

  const onDrop = (acceptedFiles) => {
    const validTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    const file = acceptedFiles[0];

    if (file && validTypes.includes(file.type)) {
      setFoto(file); // Cambiar a file en lugar de URL.createObjectURL
    } else {
      alert(translatedContent.alertCompleteFields);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/jpeg": [".jpeg", ".jpg"],
      "image/png": [".png"],
      "image/gif": [".gif"],
      "image/webp": [".webp"],
    },
    onDrop,
  });

  const setMecanico = () => {
    if (!nombre || !cedula || !edad || !foto) {
      AlertAviso(translatedContent.alertCompleteFields);
      return;
    }

    const formData = new FormData();
    formData.append("nombre", nombre);
    formData.append("cedula", cedula);
    formData.append("edad", edad);
    formData.append("foto", foto); // Enviar el archivo de imagen

    axios
      .post("http://localhost:3001/api/mecanicos", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        AlertRegiter();
        getMecanicos();
        handleCloseModal();
      })
      .catch((error) => {
        AlertAviso(translatedContent.alertErrorAdd + error);
      });
  };

  const deleteMecanico = (cedula) => {
    axios
      .post("http://localhost:3001/api/mecanico/delete", { cedula })
      .then((response) => {
        AlertDelete();
        getMecanicos();
      })
      .catch((error) => {
        AlertAviso(translatedContent.alertErrorDelete + error);
      });
  };

  return (
    <HomeContainer
      style={{
        backgroundColor: dark ? "#333" : "#ffffff",
        color: dark ? "#ffffff" : "#000000",
      }}
    >
      <Header>
        <h2 style={{ color: dark ? "#ffffff" : "#000000" }}>
          {translatedContent.title}
        </h2>
        <AddButton
          style={{ color: dark ? "#ffffff" : "#000000" }}
          onClick={handleAddClick}
        >
          <FaPlus /> {translatedContent.addButton}
        </AddButton>
      </Header>
      <TableContainer>
        <Table>
          <colgroup>
            <col style={{ width: "20%" }} />
            <col style={{ width: "40%" }} />
            <col style={{ width: "20%" }} />
            <col style={{ width: "20%" }} />
          </colgroup>
          <thead>
            <tr>
              <th style={{ color: dark ? "#ffffff" : "#000000" }}>
                {translatedContent.id}
              </th>
              <th style={{ color: dark ? "#ffffff" : "#000000" }}>
                {translatedContent.name}
              </th>
              <th style={{ color: dark ? "#ffffff" : "#000000" }}>
                {translatedContent.age}
              </th>
              <th style={{ color: dark ? "#ffffff" : "#000000" }}>
                {translatedContent.acciones}
              </th>
            </tr>
          </thead>
        </Table>
        <TableBodyContainer>
          <Table>
            <tbody>
              {data.map((persona, index) => (
                <tr key={index}>
                  <td
                    style={{
                      width: "20%",
                      color: dark ? "#ffffff" : "#000000",
                    }}
                  >
                    {persona.cedula}
                  </td>
                  <td
                    style={{
                      width: "40%",
                      color: dark ? "#ffffff" : "#000000",
                    }}
                  >
                    {persona.nombre}
                  </td>
                  <td
                    style={{
                      width: "25%",
                      color: dark ? "#ffffff" : "#000000",
                    }}
                  >
                    {persona.edad}
                  </td>
                  <td
                    style={{
                      width: "15%",
                      color: dark ? "#ffffff" : "#000000",
                    }}
                  >
                    <ActionsCell>
                      <ViewButton
                        onClick={() =>
                          handleViewClick(
                            persona.cedula,
                            persona.nombre,
                            persona.edad,
                            persona.foto
                          )
                        }
                      >
                        <FaEye />
                      </ViewButton>
                      <DeleteButton
                        onClick={() => deleteMecanico(persona.cedula)}
                      >
                        <FaTrashAlt />
                      </DeleteButton>
                    </ActionsCell>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </TableBodyContainer>
      </TableContainer>
      {isModalOpen && (
        <ModalOverlay>
          <ModalContent
            style={{
              backgroundColor: dark ? "#444" : "#ffffff",
              color: dark ? "#ffffff" : "#000000",
            }}
          >
            <h3>{translatedContent.addButton}</h3>
            <FormContainer>
              <PhotoInputContainer {...getRootProps()}>
                <input {...getInputProps()} />
                {foto ? (
                  <PreviewImage
                    src={URL.createObjectURL(foto)}
                    alt="Vista previa"
                  />
                ) : (
                  <div className="upload-box">{translatedContent.foto}</div>
                )}
              </PhotoInputContainer>
              <FormFields>
                <label style={{ color: dark ? "#ffffff" : "#000000" }}>
                  {translatedContent.name}
                  <input
                    type="text"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    style={{
                      backgroundColor: dark ? "#333" : "#ffffff",
                      color: dark ? "#ffffff" : "#000000",
                      borderColor: dark ? "#555" : "#ccc",
                    }}
                  />
                </label>
                <label style={{ color: dark ? "#ffffff" : "#000000" }}>
                  {translatedContent.id}
                  <input
                    type="number"
                    value={cedula}
                    onChange={(e) => setCedula(e.target.value)}
                    style={{
                      backgroundColor: dark ? "#333" : "#ffffff",
                      color: dark ? "#ffffff" : "#000000",
                      borderColor: dark ? "#555" : "#ccc",
                    }}
                  />
                </label>
                <label style={{ color: dark ? "#ffffff" : "#000000" }}>
                  {translatedContent.age}
                  <input
                    type="number"
                    value={edad}
                    onChange={(e) => setEdad(e.target.value)}
                    style={{
                      backgroundColor: dark ? "#333" : "#ffffff",
                      color: dark ? "#ffffff" : "#000000",
                      borderColor: dark ? "#555" : "#ccc",
                    }}
                  />
                </label>
              </FormFields>
            </FormContainer>
            <ActionButtons>
              <SaveButton onClick={setMecanico}>
                {translatedContent.save}
              </SaveButton>
              <CloseButton
                style={{ backgroundColor: "rgb(200, 16, 16)" }}
                onClick={handleCloseModal}
              >
                {translatedContent.close}
              </CloseButton>
            </ActionButtons>
          </ModalContent>
        </ModalOverlay>
      )}
      {verOpen && selectedMecanico && (
        <ModalOverlay style={{ color: dark ? "#ffffff" : "#000000" }}>
          <ModalContent
            style={{
              backgroundColor: dark ? "#444" : "#ffffff",
              color: dark ? "#ffffff" : "#000000",
            }}
          >
            <h3>{translatedContent.detailsTitle}</h3>
            <FormContainer style={{ color: dark ? "#ffffff" : "#000000" }}>
              <PhotoviewContainer
                style={{ color: dark ? "#ffffff" : "#000000" }}
              >
                <img
                  src={selectedMecanico.foto}
                  alt="Foto del mecánico"
                  style={{ maxWidth: "100px", borderRadius: "8px" }}
                />
              </PhotoviewContainer>
              <FormFields>
                <p>
                  <strong style={{ color: dark ? "#ffffff" : "#000000" }}>
                    {translatedContent.name}
                  </strong>{" "}
                  {selectedMecanico.nombre}
                </p>
                <p>
                  <strong style={{ color: dark ? "#ffffff" : "#000000" }}>
                    {translatedContent.id}
                  </strong>{" "}
                  {selectedMecanico.cedula}
                </p>
                <p>
                  <strong style={{ color: dark ? "#ffffff" : "#000000" }}>
                    {translatedContent.age}
                  </strong>{" "}
                  {selectedMecanico.edad}
                </p>
              </FormFields>
            </FormContainer>
            <ActionButtons
              style={{ display: "flex", justifyContent: "flex-end" }}
            >
              <CloseButton onClick={handleViewModal}>
                {translatedContent.close}
              </CloseButton>
            </ActionButtons>
          </ModalContent>
        </ModalOverlay>
      )}
    </HomeContainer>
  );
}

export default Mecanicos;

// Styled Components
const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
  justify-content: center;
  height: 100%; // Cambia a 100% para que ocupe todo el espacio disponible
  flex: 1; // Asegura que ocupe todo el espacio restante
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 90%;
  margin: 0 auto;
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
  background-color: #526d82;
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
    background-color: rgb(86, 113, 134);
  }
`;

const Table = styled.table`
  width: 90%;
  border-collapse: collapse;
  margin-top: 10px;
  margin: 0 auto;
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
    background-color: transparent;
    cursor: default;
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
  input[type="text"],
  input[type="number"],
  input[type="file"] {
    width: 100%;
    padding: 8px;
    margin-top: 5px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  button {
    margin-top: 10px;
    padding: 8px 12px;
    background-color: #526d82;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
      background-color: #526d82;
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
  border: 2px dashed #526d82;
  padding: 20px;
  cursor: pointer;
  text-align: center;

  .upload-box {
    color: #526d82;
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

const TableContainer = styled.div`
  width: 100%;
`;

const TableBodyContainer = styled.div`
  max-height: 300px;
  overflow-y: auto;
  overflow-x: hidden;
`;
