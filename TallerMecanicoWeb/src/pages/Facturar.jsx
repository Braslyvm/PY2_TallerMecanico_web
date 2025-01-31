import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FaTools, FaMoneyBillAlt, FaKey } from "react-icons/fa";
import { Table as BootstrapTable } from "react-bootstrap";
import Swal from "sweetalert2";
import axios from "axios";
import { useGlobalContext } from "../components/GlobalContext"; // Asegúrate de importar el contexto

function Facturar() {
  const { translate } = useGlobalContext(); // Obtener el estado de traducción
  const [reparaciones, setReparaciones] = useState([]);
  const [repuestos, setRepuestos] = useState([]);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [factura, setFactura] = useState(null);
  const [borrar, setdelete] = useState(null);

  const translatedContent = {
    title: translate ? "Billing" : "Facturación",
    plate: translate ? "Plate" : "Placa",
    customerEmail: translate ? "Customer Email" : "Correo Cliente",
    actions: translate ? "Actions" : "Acciones",
    detailedInvoice: translate ? "Detailed Invoice" : "Factura Detallada",
    usedParts: translate ? "Used Parts" : "Repuestos Utilizados",
    noPartsFound: translate
      ? "No parts found for this repair."
      : "No se encontraron repuestos para esta reparación.",
    description: translate ? "Description" : "Descripción",
    quantityUsed: translate ? "Quantity Used" : "Cantidad Utilizada",
    price: translate ? "Price" : "Precio",
    total: translate ? "Total" : "Total",
    paymentSuccessful: translate ? "Payment successful!" : "¡Pago realizado!",
    invoicePaid: translate
      ? "The invoice has been paid successfully."
      : "La factura ha sido pagada exitosamente.",
    close: translate ? "Close" : "Cerrar",
    errorFetchingParts: translate
      ? "An error occurred while fetching parts."
      : "Ocurrió un error al obtener los repuestos.",
    errorFetchingRepairs: translate
      ? "An error occurred while fetching repairs."
      : "Ocurrió un error al obtener las reparaciones.",
  };

  useEffect(() => {
    getReparaciones();
  }, []);

  const getRepuestos = (id) => {
    console.log(id);
    axios
      .get(http://localhost:3001/api/RepuestosR/${id})
      .then((response) => {
        setRepuestos(response.data);
        console.log("id de reparacion:", response.data);
      })
      .catch((error) => {
        console.log(error);
        Swal.fire("Error", translatedContent.errorFetchingParts, "error");
      });
  };

  const getReparaciones = () => {
    axios
      .get("http://localhost:3001/api/Facturas")
      .then((response) => {
        setReparaciones(response.data);
      })
      .catch((error) => {
        Swal.fire("Error", translatedContent.errorFetchingRepairs, "error");
      });
  };

  const actualizarEstadoReparacion = (id_reparacion, estado) => {
    axios
      .post("http://localhost:3001/api/reparacionesU", {
        id_reparacion,
        estado,
      })
      .then((response) => {})
      .catch((error) => {
        if (error.response) {
          console.error("Error del servidor:", error.response.data);
        } else {
          console.error("Error en la solicitud:", error.message);
        }
      });
  };

  const handleView = (id_reparacion) => {
    console.log(id_reparacion);
    setdelete(id_reparacion);

    getRepuestos(id_reparacion);
    getReparaciones();
    setIsModalOpen2(true);
  };

  const handlePagar = () => {
    Swal.fire(
      translatedContent.paymentSuccessful,
      translatedContent.invoicePaid,
      "success"
    );

    actualizarEstadoReparacion(borrar, "Finalizado");
    getReparaciones();

    setIsModalOpen2(false);
  };

  return (
    <FormContainer>
      <Header>
        <h1>{translatedContent.title}</h1>
      </Header>
      <TableContainer>
        <Table>
          <thead
            style={{
              position: "sticky",
              top: 0,
              zIndex: 10,
              background: "white",
            }}
          >
            <tr>
              <th>{translatedContent.plate}</th>
              <th>{translatedContent.customerEmail}</th>
              <th>{translatedContent.actions}</th>
            </tr>
          </thead>
          <tbody>
            {reparaciones.map((vehiculo, index) => (
              <tr key={index}>
                <td>{vehiculo.placa}</td>
                <td>{vehiculo.cliente}</td>
                <td>
                  <ActionsCellCustom>
                    <ViewButton2
                      onClick={() => handleView(vehiculo.id_reparacion)}
                    >
                      <FaMoneyBillAlt />
                    </ViewButton2>
                  </ActionsCellCustom>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </TableContainer>

      {isModalOpen2 && (
        <ModalOverlay>
          <ModalContent style={{ zIndex: 100 }}>
            <h3>{translatedContent.detailedInvoice}</h3>

            <h4
              style={{
                position: "sticky",
                top: 0,
                zIndex: 20,
              }}
            >
              {translatedContent.usedParts}{" "}
              <FaTools style={{ marginRight: "8px" }} />
            </h4>

            {repuestos.length > 0 ? (
              <RepuestosList
                style={{
                  maxWidth: "600px",
                  maxHeight: "400px",
                  overflowY: "auto",
                  top: 0,
                }}
              >
                {repuestos.map((repuesto, index) => (
                  <RepuestoItem key={index}>
                    <p>
                      <strong>{translatedContent.description}:</strong>{" "}
                      {repuesto.descripcion}
                    </p>
                    <p>
                      <strong>{translatedContent.quantityUsed}:</strong>{" "}
                      {repuesto.cantidad_utilizada}
                    </p>
                    <p>
                      <strong>{translatedContent.price}:</strong> $
                      {repuesto.precio}
                    </p>
                    <p>
                      <strong>{translatedContent.total}:</strong> $
                      {repuesto.total}
                    </p>
                  </RepuestoItem>
                ))}
              </RepuestosList>
            ) : (
              <p>{translatedContent.noPartsFound}</p>
            )}

            <ActionButtons
              style={{ display: "flex", justifyContent: "flex-end" }}
            >
              <CloseButton onClick={() => setIsModalOpen2(false)}>
                {translatedContent.close}
              </CloseButton>
            </ActionButtons>
          </ModalContent>
        </ModalOverlay>
      )}
    </FormContainer>
  );
}

// Componentes estilizados
const Header = styled.div`
  text-align: center;
  margin-bottom: 24px;
  h1 {
    font-size: 2rem;
    color: #333;
    font-weight: bold;
  }
`;
const FormContainer = styled.div`
  padding: 16px;
  width: 100%;
  height: 100%;

  color: #333;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const TableContainer = styled.div`
  overflow-y: auto;
  margin-top: 16px;
  max-height: 700px;
`;

const Table = styled(BootstrapTable)`
  width: 100%;

  border: 1px solid #ddd;
  border-collapse: collapse;

  th {
    background-color: #526d82;
    color: #333;
    font-weight: bold;
    padding: 12px;
    text-align: center;
  }

  td {
    padding: 10px;
    text-align: center;
    color: black;
    height: 10px;
    overflow-y: auto;
  }

  tr:nth-child(even) {
    background-color: rgb(103, 100, 100);
  }

  tr:hover {
    background-color: rgb(103, 100, 100);
  }
`;

const ActionsCellCustom = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
`;

const ViewButton2 = styled.button`
  background-color: rgb(83, 224, 32);
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: rgb(109, 226, 12);
  }
`;

const CloseButton = styled.button`
  background-color: rgb(222, 23, 23);
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: rgb(184, 62, 28);
  }
`;

const PayButton = styled.button`
  background-color: rgb(48, 238, 89);
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: hsl(103, 83.3%, 44.7%);
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  max-height: 80%;
  overflow-y: auto;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  color: #333;
`;

const RepuestosList = styled.div`
  margin-top: 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #ffffff;
`;

const RepuestoItem = styled.div`
  border-bottom: 1px solid #ddd;
  padding: 12px;
  color: #555;

  &:last-child {
    border-bottom: none;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
`;

export default Facturar;