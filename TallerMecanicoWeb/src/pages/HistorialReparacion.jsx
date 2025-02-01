import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FaEye } from "react-icons/fa";
import Swal from 'sweetalert2';
import axios from "axios";
import { Modal, Button, Table as BootstrapTable } from 'react-bootstrap'; // Renombrar aquí


function HistorialReparacion() {
    const [autos, setautos] = useState(true);
    const [reparaciones, setreparaciones] = useState(false);
    const [detalles, setdetalles] = useState(false);
    const [vehiculos, setvehiculos] = useState([]);
    const [Reparacion, setReparacion] = useState([]);
    const [ID, setID] = useState("");
    const [Placa, setplaca] = useState("");
    const [selectedDetalles, setselectedDetalles] = useState(null);
    const [repuestos, setrepuestos] = useState([]);

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
                console.log("Datos xdd:", response.data);
                const reparacionesData = Array.isArray(response.data) ? response.data : [response.data];
                setrepuestos(reparacionesData);
            })
            .catch((error) => {
                AlertAviso("Ocurrió un error al obtener las reparaciones.");
            }); 
      }

      // obtener vehiculos
      const getVehiculos = () => {
        axios
          .get("http://localhost:3001/api/vehiculos/completa") 
          .then((response) => {
            setvehiculos(response.data); 
            if (response.data.length === 0) {
              AlertAviso('No hay Vehiculos registrados');
            }
          })
          .catch((error) => {
            AlertAviso("No hay vehiculos");
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
                console.log("Datos obtenidos:", response.data); // Verifica la respuesta
                const reparacionesData = Array.isArray(response.data) ? response.data : [response.data];
                setReparacion(reparacionesData);
            })
            .catch((error) => {
                AlertAviso("Ocurrió un error al obtener las reparaciones.");
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
        <HomeContainer>
            {autos && (
                <div>
                    <Header>
                        <h2>Historia de reparaciones</h2>
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
                                <th>Placa</th>
                                <th>Correo Cliente</th>
                                <th>Marca</th>
                                <th>Modelo</th>
                                <th>Acciones</th>
                            </tr>
                            </thead>
                        </Table>
                    <TableBodyContainer>
                        <Table>
                            <tbody>
                            {vehiculos.map((Autos, index) => (
                                <tr key={index}>
                                <td style={{ width: '20%' }}>{Autos.placa}</td>
                                <td style={{ width: '40%' }}>{Autos.nombre_completo}</td>
                                <td style={{ width: '20%' }}>{Autos.marca}</td>
                                <td style={{ width: '20%' }}>{Autos.modelo}</td>
                                <td style={{ width: '20%' }}>
                                    <ActionsCell>
                                    <ViewButton  style={{ marginLeft: '40%' }}  onClick={() => Intermedio(Autos.id_vehiculo, Autos.placa)}>
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
                    <h2>Historia de reparaciones de :{Placa}</h2>
                    <AddButton onClick={OpenAutos}>
                        Volver
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
                            <th>Reparacion</th>
                            <th>Mecanico</th>
                            <th>Fecha de reparacion</th>
                            <th>Acciones</th>
                        </tr>
                        </thead>
                    </Table>
                <TableBodyContainer>
                    <Table>
                        <tbody>
                        {Reparacion.map((rep, index) => (
                            <tr key={index}>
                            <td style={{ width: '20%' }}>{rep.id_reparacion}</td>
                            <td style={{ width: '20%' }}>{rep.mecanico}</td>
                            <td style={{ width: '20%' }}>{rep.fecha_reparacion}</td>id_reparacion,mecanico,fecha_reparacion
                            
                            <td style={{ width: '20%' }}>
                                <ActionsCell>
                                <ViewButton style={{ marginLeft: '45%' }} onClick={() => OpenDetalles(rep.descripcion,rep.mecanico,rep.fecha_reparacion,rep.id_reparacion)}>
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
            {detalles && (
                <Modal show={true} onHide={CloseDetalles} centered size="lg"> {/* Cambia el tamaño del modal a "lg" */}
                <Modal.Header closeButton>
                    <Modal.Title>Detalles de la Reparación</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div style={{ flex: 1, marginRight: '-200px' }}> {/* Reduce el margen derecho */}
                            <p style={{ margin: '0 0 5px 0' }}><strong>Reparación:</strong> {selectedDetalles.id_reparacion}</p>
                            <p style={{ margin: '0 0 5px 0' }}><strong>Placa:</strong> {selectedDetalles.Placa}</p>
                            <p style={{ margin: '0 0 5px 0' }}><strong>Mecánico:</strong> {selectedDetalles.mecanico}</p>
                            <p style={{ margin: '0 0 5px 0' }}><strong>Fecha de Reparación:</strong> {selectedDetalles.fecha_reparacion}</p>
                            <p style={{ margin: '0 0 5px 0' }}><strong>Detalles:</strong> {selectedDetalles.detalles}</p>
                        </div>
                        <div style={{ flex: 1 }}>
                            <Table bordered hover responsive style={{ width: '70%', margin: '0 auto' }}>
                                <thead>
                                    <tr>
                                        <th style={{ width: '50%', whiteSpace: 'nowrap', fontSize: '12px', padding: '5px' }}>Descripción</th>
                                        <th style={{ width: '30%', whiteSpace: 'nowrap', fontSize: '12px', padding: '5px' }}>Cantidad Utilizada</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {repuestos.map((rep, index) => (
                                        <tr key={index}>
                                            <td style={{ wordWrap: 'break-word', maxWidth: '150px', fontSize: '12px', padding: '5px' }}>{rep.descripcion}</td>
                                            <td style={{ fontSize: '12px', padding: '5px' }}>{rep.cantidad_utilizada}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={CloseDetalles}>
                        Cerrar
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
  height: 90vh;
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
  max-height: 300px;
  overflow-y: auto; 
  overflow-x: hidden;
`;
