import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FaCog, FaSearch, FaToolbox, FaCut } from "react-icons/fa";
import axios from "axios";
import {
  Modal,
  Button as BootstrapButton,
  Table as BootstrapTable,
} from "react-bootstrap";
import Swal from "sweetalert2";
import { useDropzone } from "react-dropzone";
import { useGlobalContext } from "../components/GlobalContext"; // Asegúrate de importar el contexto

function GestionDeRepuestos() {
  const { translate } = useGlobalContext(); // Obtener el estado de traducción
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [isModalOpen3, setIsModalOpen3] = useState(false);
  const [precio, setPrecio] = useState("");
  const [selected, setSelected] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [foto, setFoto] = useState(null);
  const [selectedMarca, setSelectedMarca] = useState("");
  const [id_repuesto, setIdRepuesto] = useState("");
  const [marcas, setMarcas] = useState([]);
  const [piezas, setPiezas] = useState([]);

  const translatedContent = {
    title: translate ? "Spare Parts Management" : "Gestión de Repuestos",
    addButton: translate ? "Add Spare Part" : "Agregar Repuesto",
    noSpareParts: translate
      ? "No spare parts registered"
      : "No hay repuestos registrados",
    alertSuccess: translate
      ? "Spare part added successfully!"
      : "¡Repuesto agregado exitosamente!",
    alertDelete: translate
      ? "Spare part deleted successfully!"
      : "Repuesto eliminado correctamente!",
    alertCompleteFields: translate
      ? "Please complete all fields."
      : "Por favor, completa todos los campos.",
    alertErrorAdd: translate
      ? "Error adding spare part:"
      : "Error al agregar repuesto:",
    alertErrorDelete: translate
      ? "Error deleting spare part:"
      : "Error al eliminar repuesto:",
    detailsTitle: translate ? "Spare Part Details" : "Detalles del Repuesto",
    price: translate ? "Unit price:" : "Precio unitario:",
    brand: translate ? "Brand:" : "Marca:",
    description: translate ? "Description:" : "Descripción:",
    save: translate ? "Save" : "Guardar",
    close: translate ? "Close" : "Cerrar",
    accept: translate ? "Accept" : "Aceptar",
    actions: translate ? "Actions" : "Acciones",
    confirmDelete: translate
      ? "Are you sure you want to delete this spare part?"
      : "¿Estás seguro de que deseas eliminar este repuesto?",
    editSparePart: translate ? "Edit Spare Part" : "Editar Repuesto",
    viewSparePart: translate ? "View Spare Part" : "Ver Repuesto",
  };

  useEffect(() => {
    getMarcas();
    getPiezas();
  }, []);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsModalOpen2(false);
    setIsModalOpen3(false);
    setPrecio("");
    setDescripcion("");
    setFoto(null);
    setSelectedMarca("");
  };

  const getMarcas = () => {
    axios
      .get("http://localhost:3001/api/marcas")
      .then((response) => {
        setMarcas(response.data);
      })
      .catch((error) => console.error("Error al obtener marcas:", error));
  };

  const getPiezas = () => {
    axios
      .get("http://localhost:3001/api/repuestos")
      .then((response) => setPiezas(response.data))
      .catch((error) => console.error("Error al obtener piezas:", error));
  };

  const onDrop = (acceptedFiles) => {
    const validTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    const file = acceptedFiles[0];

    if (file && validTypes.includes(file.type)) {
      setFoto(file); // Guardar el archivo en lugar de la URL
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

  const handleedit = (e) => {
    e.preventDefault();
    if (!precio || !selectedMarca || !descripcion) {
      Swal.fire("Error", translatedContent.alertCompleteFields, "error");
      return;
    }

    const formData = new FormData();

    if (typeof selectedMarca === "object" && selectedMarca !== null) {
      formData.append("selectedMarca", selectedMarca.id_marca);
    } else {
      formData.append("selectedMarca", selectedMarca);
    }

    formData.append("precio", precio);
    formData.append("descripcion", descripcion);

    if (foto instanceof File) {
      formData.append("foto", foto);
    }

    axios
      .put("http://localhost:3001/api/repuestos2/${id_repuesto}, formData", {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((response) => {
        Swal.fire("¡Éxito!", translatedContent.alertSuccess, "success");
        setIsModalOpen(false);
        getPiezas();
      })
      .catch((error) => {
        console.error("Error al actualizar repuesto:", error.response || error);
        Swal.fire(
          "Error",
          translatedContent.alertErrorAdd +
            (error.response?.data?.message || error.message),
          "error"
        );
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!precio || !selectedMarca || !descripcion || !foto) {
      Swal.fire("Error", translatedContent.alertCompleteFields, "error");
      return;
    }

    const formData = new FormData();
    formData.append("selectedMarca", selectedMarca);
    formData.append("precio", precio);
    formData.append("foto", foto);
    formData.append("descripcion", descripcion);

    axios
      .post("http://localhost:3001/api/repuestos", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        Swal.fire("¡Éxito!", translatedContent.alertSuccess, "success");
        setIsModalOpen(false);
        getPiezas();
      })
      .catch((error) => {
        console.error("Error al agregar repuesto:", error.response || error);
        Swal.fire(
          "Error",
          translatedContent.alertErrorAdd +
            (error.response?.data?.message || error.message),
          "error"
        );
      });
  };

  const obtenerMarcaPorId = (id) => {
    fetch("http://localhost:3001/api/marcas/${id}")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error: ${response.status} - ${response.statusText}`);

        }
        return response.json();
      })
      .then((data) => {
        setSelectedMarca(data);
      })
      .catch((error) => {
        console.error("Error al obtener la marca:", error);
        Swal.fire("Error", translatedContent.alertErrorAdd, "error");
      });
  };

  const handleEdit = (precio, foto, descripcion, id_marca, id_repuesto) => {
    setPrecio(precio);
    setFoto(foto);
    setDescripcion(descripcion);
    obtenerMarcaPorId(id_marca);
    setIdRepuesto(id_repuesto);
    setIsModalOpen3(true);
    getPiezas();
  };

  const handleView = (precio, foto, descripcion, id_marca) => {
    obtenerMarcaPorId(id_marca);
    const fotoUrl = foto instanceof Blob ? URL.createObjectURL(foto) : foto;
    setSelected({ precio, foto: fotoUrl, descripcion });
    setIsModalOpen2(true);
    getPiezas();
  };

  const handleDelete = (precio, foto, descripcion, id_marca, id_repuesto) => {
    Swal.fire({
      title: translatedContent.confirmDelete,
      text: descripcion,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: translatedContent.accept,
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete("http://localhost:3001/api/repuestos/delete/${id_repuesto}")
          .then((response) => {
            Swal.fire("¡Éxito!", translatedContent.alertDelete, "success");
            getPiezas();
          })
          .catch((error) => {
            console.error(
              "Error al eliminar repuesto:",
              error.response || error
            );
            Swal.fire(
              "Error",
              translatedContent.alertErrorDelete +
                (error.response?.data?.message || error.message),
              "error"
            );
          });
      }
    });
  };

  return (
    <FormContainer>
      <Header>
        <h2>{translatedContent.title}</h2>
        <BootstrapButton
          className="btn btn-secondary"
          onClick={() => setIsModalOpen(true)}
        >
          <FaToolbox style={{ marginRight: "8px" }} />
          {translatedContent.addButton}
        </BootstrapButton>
      </Header>

      {isModalOpen && (
        <ModalOverlay>
          <ModalContent>
            <h3>{translatedContent.addButton}</h3>
            <Form onSubmit={handleSubmit}>
              <InputField>
                <label>{translatedContent.price}</label>
                <input
                  type="number"
                  value={precio}
                  onChange={(e) => setPrecio(e.target.value)}
                  required
                />
              </InputField>

              <InputField>
                <label>{translatedContent.brand}</label>
                <select
                  value={selectedMarca}
                  onChange={(e) => setSelectedMarca(e.target.value)}
                >
                  <option value="">{translatedContent.brand}</option>
                  {marcas.map((marca) => (
                    <option key={marca.id_marca} value={marca.id_marca}>
                      {marca.nombre}
                    </option>
                  ))}
                </select>
              </InputField>

              <InputField>
                <label>{translatedContent.description}</label>
                <textarea
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                  required
                />
              </InputField>

              <PhotoInputContainer {...getRootProps()}>
                <input {...getInputProps()} />
                {foto ? (
                  <PreviewImage
                    src={URL.createObjectURL(foto)}
                    alt="Vista previa"
                  />
                ) : (
                  <div className="upload-box">
                    {translatedContent.uploadPhoto}
                  </div>
                )}
              </PhotoInputContainer>
              <ActionButtons>
                <SubmitButton type="submit">
                  {translatedContent.save}
                </SubmitButton>
                <CloseButton onClick={() => handleCloseModal()}>
                  {translatedContent.close}
                </CloseButton>
              </ActionButtons>
            </Form>
          </ModalContent>
        </ModalOverlay>
      )}

      {isModalOpen3 && (
        <ModalOverlay>
          <ModalContent>
            <h3>{translatedContent.editSparePart}</h3>
            <Form onSubmit={handleedit}>
              <InputField>
                <label>{translatedContent.price}</label>
                <input
                  type="number"
                  value={precio}
                  onChange={(e) => setPrecio(e.target.value)}
                  required
                />
              </InputField>

              <InputField>
                <label>{translatedContent.brand}</label>
                <select
                  value={selectedMarca.id_marca}
                  onChange={(e) => setSelectedMarca(e.target.value)}
                >
                  <option value="">{translatedContent.brand}</option>
                  {marcas.map((marca) => (
                    <option key={marca.id_marca} value={marca.id_marca}>
                      {marca.nombre}
                    </option>
                  ))}
                </select>
              </InputField>

              <InputField>
                <label>{translatedContent.description}</label>
                <textarea
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                  required
                />
              </InputField>

              <PhotoInputContainer {...getRootProps()}>
                <input {...getInputProps()} />
                {foto ? (
                  <PreviewImage src={foto} alt="Vista previa" />
                ) : (
                  <div className="upload-box">
                    {translatedContent.uploadPhoto}
                  </div>
                )}
              </PhotoInputContainer>
              <ActionButtons>
                <SubmitButton type="submit">
                  {translatedContent.save}
                </SubmitButton>
                <CloseButton onClick={() => handleCloseModal()}>
                  {translatedContent.close}
                </CloseButton>
              </ActionButtons>
            </Form>
          </ModalContent>
        </ModalOverlay>
      )}

      {isModalOpen2 && (
        <ModalOverlay>
          <ModalContent>
            <h3>{translatedContent.viewSparePart}</h3>
            <FormContainer style={{ height: "400px" }}>
              <PhotoviewContainer>
                <img
                  src={selected.foto}
                  alt="Foto del repuesto"
                  style={{ maxWidth: "110px", borderRadius: "8px" }}
                />
              </PhotoviewContainer>
              <FormFields>
                <p>
                  <strong>{translatedContent.description}</strong>{" "}
                  {selected.descripcion}
                </p>
                <p>
                  <strong>{translatedContent.price}</strong> {selected.precio}
                </p>
                <p>
                  <strong>{translatedContent.brand}</strong>{" "}
                  {selectedMarca.nombre}
                </p>
              </FormFields>
            </FormContainer>
            <ActionButtons
              style={{ display: "flex", justifyContent: "flex-end" }}
            >
              <CloseButton onClick={() => handleCloseModal()}>
                {translatedContent.close}
              </CloseButton>
            </ActionButtons>
          </ModalContent>
        </ModalOverlay>
      )}

      <TableContainer>
        <Table>
          <thead>
            <tr>
              <th>{translatedContent.description}</th>
              <th>{translatedContent.price}</th>
              <th>{translatedContent.actions}</th>
            </tr>
          </thead>
        </Table>
        <TableBodyContainer>
          <Table>
            <tbody>
              {piezas.map((pieza, index) => (
                <tr key={index}>
                  <td>{pieza.descripcion}</td>
                  <td>₡{parseFloat(pieza.precio).toFixed(2)}</td>
                  <td>
                    <ActionsCellCustom>
                      <EditButton2
                        onClick={() =>
                          handleEdit(
                            pieza.precio,
                            pieza.foto,
                            pieza.descripcion,
                            pieza.id_marca,
                            pieza.id_repuesto
                          )
                        }
                      >
                        <FaCog />
                      </EditButton2>
                      <ViewButton2
                        onClick={() =>
                          handleView(
                            pieza.precio,
                            pieza.foto,
                            pieza.descripcion,
                            pieza.id_marca
                          )
                        }
                      >
                        <FaSearch />
                      </ViewButton2>
                      <DeleteButton2
                        onClick={() =>
                          handleDelete(
                            pieza.precio,
                            pieza.foto,
                            pieza.descripcion,
                            pieza.id_marca,
                            pieza.id_repuesto
                          )
                        }
                      >
                        <FaCut />
                      </DeleteButton2>
                    </ActionsCellCustom>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </TableBodyContainer>
      </TableContainer>
    </FormContainer>
  );
}

export default GestionDeRepuestos;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
  justify-content: center;
  height: 90vh;
  background-color: #f8f9fa;
`;
const FormFields = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  gap: 10px;
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
const TableContainer = styled.div`
  width: 100%;
`;

const TableBodyContainer = styled.div`
  max-height: 300px;
  overflow-y: auto;
  overflow-x: hidden;
`;
const Table = styled(BootstrapTable)`
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

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const InputField = styled.div`
  margin-bottom: 15px;

  label {
    font-weight: bold;
  }

  input,
  textarea,
  select {
    width: 100%;
    padding: 8px;
    margin-top: 5px;
    border-radius: 4px;
    border: 1px solid #ccc;
  }

  textarea {
    height: 100px;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  justify-content: space-between;
`;

const SubmitButton = styled(BootstrapButton)`
  background-color: green;
  border: none;
  &:hover {
    background-color: darkgreen;
  }
`;

const CloseButton = styled(BootstrapButton)`
  background-color: red;
  border: none;
  &:hover {
    background-color: darkred;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5); /* Fondo oscuro semi-transparente */
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  width: 400px; /* Ajusta el ancho de la ventana emergente */
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Sombra para el efecto de profundidad */
  h3 {
    margin-bottom: 15px;
  }
  label {
    display: block;
    margin-bottom: 10px;
  }
  input[type="text"],
  input[type="number"] {
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

const ActionsCellCustom = styled.div`
  display: flex;
  justify-content: space-evenly; /* Alinea los botones al principio */
  gap: 2px; /* Espacio muy pequeño entre los botones */
`;

const EditButton2 = styled.button`
  padding: 8px 12px;
  background-color: rgb(15, 37, 198);
  color: white;
  border: none;
  border-radius: 4px;

  &:hover {
    background-color: rgb(23, 45, 212);
  }
`;

const ViewButton2 = styled.button`
  background-color: orange;
  border: none;
  color: white;
  padding: 5px 10px;
  cursor: pointer;
  &:hover {
    background-color: darkorange;
  }
`;

const DeleteButton2 = styled.button`
  background-color: red;
  border: none;
  color: white;
  padding: 5px 10px;
  cursor: pointer;
  &:hover {
    background-color: darkred;
  }
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

const PreviewImage = styled.img`
  max-width: 100px;
  max-height: 100px;
  border-radius: 8px;
  object-fit: cover;
  margin-top: 10px;
`;