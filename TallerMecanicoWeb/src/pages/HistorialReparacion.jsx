import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FaEye } from "react-icons/fa";
import Swal from 'sweetalert2';
import axios from "axios";
import { Modal, Button, Table as BootstrapTable } from 'react-bootstrap'; // Renombrar aquí
import { useGlobalContext } from '../components/GlobalContext';
import translateText from '../components/translate';



function HistorialReparacion() {
    const { translate , dark} = useGlobalContext();
    const [autos, setautos] = useState(true);
    const [reparaciones, setreparaciones] = useState(false);
    const [detalles, setdetalles] = useState(false);
    const [vehiculos, setvehiculos] = useState([]);
    const [Reparacion, setReparacion] = useState([]);
    const [ID, setID] = useState("");
    const [Placa, setplaca] = useState("");
    const [selectedDetalles, setselectedDetalles] = useState(null);
    const [repuestos, setrepuestos] = useState([]);


    console.log("Valor de dark:", dark);


     // Estado para los textos traducidos
     const [translatedContent, setTranslatedContent] = useState({
      misVehiculos: 'Mis Vehículos',
      agregarVehiculo: 'Agregar Vehículo',
      noVehiculos: 'No hay vehículos registrados.',
      reparacionesDe: 'Reparaciones de',
      volver: 'Volver',
      detallesReparacion: 'Detalles de Reparación',
      repuestosUtilizados: 'Repuestos Utilizados',
      noReparaciones: 'No hay reparaciones registradas.',
      noRepuestos: 'No hay repuestos registrados.',
      cerrar: 'Cerrar',
      Placa: 'placa',
      Marca: 'Marca',
      Modelo: 'Modelo',
      Año: 'Año',
      IDReparación: 'ID Reparación',
      Mecánico: 'Mecánico',
      FechadeReparación: 'Fecha de Reparación',
      Detalles: 'Detalles',
      Repuesto: 'Repuesto',
      Cantidad: 'Cantidad',
      historialreparacion: 'Historia de reparaciones',
      cliente: 'Cliente',
      accion: 'Acciones'

      
  });
  useEffect(() => {
      const translateContent = async () => {
          if (translate) {
              const misVehiculos = await translateText('Mis Vehículos', 'es', 'en');
              const agregarVehiculo = await translateText('Agregar Vehículo', 'es', 'en');
              const noVehiculos = await translateText('No hay vehículos registrados.', 'es', 'en');
              const reparacionesDe = await translateText('Reparaciones de', 'es', 'en');
              const volver = await translateText('Volver', 'es', 'en');
              const detallesReparacion = await translateText('Detalles de Reparación', 'es', 'en');
              const repuestosUtilizados = await translateText('Repuestos Utilizados', 'es', 'en');
              const noReparaciones = await translateText('No hay reparaciones registradas.', 'es', 'en');
              const noRepuestos = await translateText('No hay repuestos registrados.', 'es', 'en');
              const cerrar = await translateText('Cerrar', 'es', 'en');
              const Placa = await translateText('placa', 'es', 'en');
              const Marca = await translateText('Marca', 'es', 'en');
              const Modelo = await translateText('Modelo', 'es', 'en');
              const Año = await translateText('Año', 'es', 'en');
              const IDReparación = await translateText('ID Reparación', 'es', 'en');
              const Mecánico = await translateText('Mecánico', 'es', 'en');
              const FechadeReparación = await translateText('Fecha de Reparación', 'es', 'en');
              const Detalles = await translateText('Detalles', 'es', 'en');
              const Repuesto = await translateText('Repuesto', 'es', 'en');
              const Cantidad = await translateText('Cantidad', 'es', 'en');
              const historialreparacion = await translateText('Historia de reparaciones', 'es', 'en');
              const cliente = await translateText('Cliente', 'es', 'en');
              const accion = await translateText('Acciones', 'es', 'en');
              


              setTranslatedContent({
                  misVehiculos,
                  agregarVehiculo,
                  noVehiculos,
                  reparacionesDe,
                  volver,
                  detallesReparacion,
                  repuestosUtilizados,
                  noReparaciones,
                  noRepuestos,
                  cerrar,
                  Placa,
                  Marca,
                  Modelo,
                  Año,
                  IDReparación,
                  Mecánico,
                  FechadeReparación,
                  Detalles,
                  Repuesto,
                  Cantidad,
                  historialreparacion,
                  cliente,
                  accion
                  
              });
          } else {
              setTranslatedContent({
                  misVehiculos: 'Mis Vehículos',
                  agregarVehiculo: 'Agregar Vehículo',
                  noVehiculos: 'No hay vehículos registrados.',
                  reparacionesDe: 'Reparaciones de',
                  volver: 'Volver',
                  detallesReparacion: 'Detalles de Reparación',
                  repuestosUtilizados: 'Repuestos Utilizados',
                  noReparaciones: 'No hay reparaciones registradas.',
                  noRepuestos: 'No hay repuestos registrados.',
                  cerrar: 'Cerrar',
                  Placa: 'placa',
                  Marca: 'Marca',
                  Modelo: 'Modelo',
                  Año: 'Año',
                  IDReparación: 'ID Reparación',
                  Mecánico: 'Mecánico',
                  FechadeReparación: 'Fecha de Reparación',
                  Detalles: 'Detalles',
                  Repuesto: 'Repuesto',
                  Cantidad: 'Cantidad',
                  historialreparacion: 'Historia de reparaciones',
                  cliente: 'Cliente',
                  accion: 'Acciones'
              });

          }
      };

      translateContent();
  }, [translate]);




    // alertas 
    //Alertas de eliminacion de mecanicos
      const AlertAviso = (text1) => {
        console.log(text1);
        Swal.fire({
          text: text1,  
          imageUrl: 'https://cdn0.iconfinder.com/data/icons/user-interface-2063/24/UI_Essential_icon_expanded-76-512.png', 
          imageWidth: 100,
          imageHeight: 100,
          imageAlt: 'aviso',
          confirmButtonText: 'Aceptar'
        });
      };
      
      const getRepuestos = (id) => { 
        console.log("id de reparacion:", id);
        axios
            .get(`http://localhost:3001/api/RepuestosR/${id}`)
            .then((response) => {
                const reparacionesData = Array.isArray(response.data) ? response.data : [response.data];
                setrepuestos(reparacionesData);
            })
            .catch((error) => {
                AlertAviso(translatedContent.noReparaciones);
            }); 
      }

      // obtener vehiculos
      const getVehiculos = () => {
        axios
          .get("http://localhost:3001/api/vehiculos/completa") 
          .then((response) => {
            setvehiculos(response.data); 
            if (response.data.length === 0) {
              AlertAviso(translatedContent.noVehiculos);
            }
          })
          .catch((error) => {
            AlertAviso(translatedContent.noVehiculos);
          });
      };

      useEffect(() => {
        console.log("Estado actual de Reparacion:", Reparacion); // Verifica cómo cambia el estado
    }, [Reparacion]); // Se ejecuta cada vez que 'Reparacion' cambia
    
    // obtener reparaciones
    const getReparaciones = (id) => {
        axios
            .get(`http://localhost:3001/api/reparaciones2/${id}`)
            .then((response) => {
                const reparacionesData = Array.isArray(response.data) ? response.data : [response.data];
                setReparacion(reparacionesData);
            })
            .catch((error) => {
                AlertAviso(translatedContent.noReparaciones);
            });
    };

    useEffect(() => {
        getVehiculos();
      }, []);

    // logicas de mostrar y ocultar
    // mostrar autos
    const OpenAutos = () => {
        setautos(true);
        setreparaciones(false);
        setplaca("");   
        setID("");
        setReparacion([]);
      };
    // mostrar reparaciones
    const Intermedio = (id,placa) => {
        getReparaciones(id);
        OpenReparaciones(id,placa);
    }
    const OpenReparaciones = (id,placa) => {
        setautos(false);
        setreparaciones(true);
        setID(id);
        setplaca(placa);
      };


    // mostrar detalles
    const OpenDetalles = (detalles,mecanico,fecha_reparacion,id_reparacion) => {
        setselectedDetalles({detalles,mecanico,fecha_reparacion,id_reparacion,Placa});
        getRepuestos(id_reparacion);
        setdetalles(true);
      };



    // ocultar detalles
    const CloseDetalles = () => {
        setdetalles(false);
        setselectedDetalles(null);
        setrepuestos([]);
      };

      return (    
        <HomeContainer style={{ backgroundColor: dark ? '#333' : '#ffffff', color: dark ? '#ffffff' : '#000000' }} >
          {autos && (
            <div>
              <Header>
                <h2 style={{ color: dark ? '#ffffff' : '#000000' }}>{translatedContent.historialreparacion}</h2>
              </Header>
              <TableContainer>
                <Table>
                  <colgroup>
                    <col style={{ width: '20%' }} />
                    <col style={{ width: '40%' }} />
                    <col style={{ width: '20%' }} />
                    <col style={{ width: '20%' }} />
                    <col style={{ width: '20%' }} />
                  </colgroup>
                  <thead>
                    <tr>
                      <th style={{ color: dark ? '#ffffff' : '#000000' }}>{translatedContent.Placa}</th>
                      <th style={{ color: dark ? '#ffffff' : '#000000' }}>{translatedContent.cliente}</th>
                      <th style={{ color: dark ? '#ffffff' : '#000000' }}>{translatedContent.Marca}</th>
                      <th style={{ color: dark ? '#ffffff' : '#000000' }}>{translatedContent.Modelo}</th>
                      <th style={{ color: dark ? '#ffffff' : '#000000' }}>{translatedContent.accion}</th>
                    </tr>
                  </thead>
                </Table>
                <TableBodyContainer>
                  <Table>
                    <tbody>
                      {vehiculos.map((Autos, index) => (
                        <tr key={index}>
                          <td style={{ width: '20%', color: dark ? '#ffffff' : '#000000' }}>{Autos.placa}</td>
                          <td style={{ width: '40%', color: dark ? '#ffffff' : '#000000' }}>{Autos.nombre_completo}</td>
                          <td style={{ width: '20%', color: dark ? '#ffffff' : '#000000' }}>{Autos.marca}</td>
                          <td style={{ width: '20%', color: dark ? '#ffffff' : '#000000' }}>{Autos.modelo}</td>
                          <td style={{ width: '20%' }}>
                            <ActionsCell>
                              <ViewButton 
                                style={{ marginLeft: '40%' }} 
                                onClick={() => Intermedio(Autos.id_vehiculo, Autos.placa)}
                              >
                                <FaEye />
                              </ViewButton>
                            </ActionsCell>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </TableBodyContainer>
              </TableContainer>
            </div>
          )}
          {reparaciones && (
            <div>
              <Header>
                <h2 style={{ color: dark ? '#ffffff' : '#000000' }}>
                  {translatedContent.historialreparacion} : {Placa}
                </h2>
                <AddButton onClick={OpenAutos}>
                  {translatedContent.volver}
                </AddButton>
              </Header>
              <TableContainer>
                <Table>
                  <colgroup>
                    <col style={{ width: '10%' }} />
                    <col style={{ width: '10%' }} />
                    <col style={{ width: '10%' }} />
                    <col style={{ width: '10%' }} />
                  </colgroup>
                  <thead>
                    <tr>
                      <th style={{ color: dark ? '#ffffff' : '#000000' }}>
                        {translatedContent.IDReparación}
                      </th>
                      <th style={{ color: dark ? '#ffffff' : '#000000' }}>
                        {translatedContent.Mecánico}
                      </th>
                      <th style={{ color: dark ? '#ffffff' : '#000000' }}>
                        {translatedContent.FechadeReparación}
                      </th>
                      <th style={{ color: dark ? '#ffffff' : '#000000' }}>
                        {translatedContent.accion}
                      </th>
                    </tr>
                  </thead>
                </Table>
                <TableBodyContainer>
                  <Table>
                    <tbody>
                      {Reparacion.length === 0 ? (
                        <tr>
                          <td colSpan="4" style={{ textAlign: 'center', color: dark ? '#ffffff' : '#000000' }}>
                            {translatedContent.noReparaciones}
                          </td>
                        </tr>
                      ) : (
                        Reparacion.map((rep, index) => (
                          <tr key={index}>
                            <td style={{ width: '20%', color: dark ? '#ffffff' : '#000000' }}>
                              {rep.id_reparacion}
                            </td>
                            <td style={{ width: '20%', color: dark ? '#ffffff' : '#000000' }}>
                              {rep.mecanico}
                            </td>
                            <td style={{ width: '20%', color: dark ? '#ffffff' : '#000000' }}>
                              {rep.fecha_reparacion}
                            </td>
                            <td style={{ width: '20%' }}>
                              <ActionsCell>
                                <ViewButton
                                  style={{ marginLeft: '45%' }}
                                  onClick={() =>
                                    OpenDetalles(rep.descripcion, rep.mecanico, rep.fecha_reparacion, rep.id_reparacion)
                                  }
                                >
                                  <FaEye />
                                </ViewButton>
                              </ActionsCell>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </Table>
                </TableBodyContainer>
              </TableContainer>
            </div>
          )}
          {detalles && (
            <Modal show={true} onHide={CloseDetalles} centered size="lg" >
              <Modal.Header closeButton style={{ backgroundColor: dark ? '#333' : '#ffffff', color: dark ? '#ffffff' : '#000000' }}>
                <Modal.Title style={{ color: dark ? '#ffffff' : '#000000' }}>
                  {translatedContent.detallesReparacion}
                </Modal.Title>
              </Modal.Header>
              <Modal.Body style={{ backgroundColor: dark ? '#333' : '#ffffff', color: dark ? '#ffffff' : '#000000' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div style={{ flex: 1, marginRight: '-200px' }}>
                    <p style={{ margin: '0 0 5px 0', color: dark ? '#ffffff' : '#000000' }}>
                      <strong>{translatedContent.IDReparación}:</strong> {selectedDetalles.id_reparacion}
                    </p>
                    <p style={{ margin: '0 0 5px 0', color: dark ? '#ffffff' : '#000000' }}>
                      <strong>{translatedContent.Placa}:</strong> {selectedDetalles.Placa}
                    </p>
                    <p style={{ margin: '0 0 5px 0', color: dark ? '#ffffff' : '#000000' }}>
                      <strong>{translatedContent.Mecánico}:</strong> {selectedDetalles.mecanico}
                    </p>
                    <p style={{ margin: '0 0 5px 0', color: dark ? '#ffffff' : '#000000' }}>
                      <strong>{translatedContent.FechadeReparación}:</strong> {selectedDetalles.fecha_reparacion}
                    </p>
                    <p style={{ margin: '0 0 5px 0', color: dark ? '#ffffff' : '#000000' }}>
                      <strong>{translatedContent.Detalles}:</strong> {selectedDetalles.detalles}
                    </p>
                  </div>
                  <div style={{ flex: 1 }}>
                    <Table bordered hover responsive style={{ width: '70%', margin: '0 auto' }}>
                      <thead>
                        <tr>
                          <th style={{ width: '50%', whiteSpace: 'nowrap', fontSize: '12px', padding: '5px', color: dark ? '#ffffff' : '#000000' }}>
                            {translatedContent.Repuesto}
                          </th>
                          <th style={{ width: '30%', whiteSpace: 'nowrap', fontSize: '12px', padding: '5px', color: dark ? '#ffffff' : '#000000' }}>
                            {translatedContent.Cantidad}
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {repuestos.map((rep, index) => (
                          <tr key={index}>
                            <td style={{ wordWrap: 'break-word', maxWidth: '150px', fontSize: '12px', padding: '5px', color: dark ? '#ffffff' : '#000000' }}>
                              {rep.descripcion}
                            </td>
                            <td style={{ fontSize: '12px', padding: '5px', color: dark ? '#ffffff' : '#000000' }}>
                              {rep.cantidad_utilizada}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                </div>
              </Modal.Body>
              <Modal.Footer style={{ backgroundColor: dark ? '#333' : '#ffffff', color: dark ? '#ffffff' : '#000000' }}>
                <Button variant="secondary" onClick={CloseDetalles}>
                  {translatedContent.cerrar} 
                </Button>
              </Modal.Footer>
            </Modal>
          )}
        </HomeContainer>
      );      
}

export default HistorialReparacion;

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
  background-color: #526D82;
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
    background-color:rgb(86, 113, 134);
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

const TableContainer = styled.div`
  width: 100%;
  

`;

const TableBodyContainer = styled.div`
  max-height: 600px;
  overflow-y: auto; 
  overflow-x: hidden;
`;
