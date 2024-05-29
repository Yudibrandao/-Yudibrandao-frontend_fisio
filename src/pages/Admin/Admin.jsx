import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { getAllUsers, getAppointments } from "../../services/apiCalls";
import { useSelector } from "react-redux";
import { userData } from "../../app/slices/userSlice";
import "./Admin.css"
import { useNavigate } from "react-router-dom";


export const Admin = () => {

    const [admin_vista, setAdminVista] = useState("")
    const userToken = useSelector(userData).token
    const [users, setUsers] = useState([])
    const [citas, setCitas] = useState([])
    const navigate = useNavigate();

    useEffect(() => {
        if (!userToken) {
          navigate("/")
        }
    
      }, [userToken])

    const users_data = () => {
        getAllUsers(userToken)
            .then((res) => {
                setUsers(res)
            })
            .catch(() => {

            })
    }

    const citas_data = () => {
        getAppointments(userToken)
            .then((res) => {
                setCitas(res)
            })
            .catch(() => {
            })
    }
  
    return (

        <Container className="admin_design">
            {admin_vista === "user" ? (
                <>
                    <Row className="d-flex justify-content-center m-5">
                        <Col>
                            <Row className="d-flex justify-content-center">
                                <Col md={2}><Button onClick={(() => { setAdminVista("") })}>Cerrar</Button></Col>
                                <Col md={2}><Button onClick={(() => { setAdminVista("citas"), citas_data() })}>Citas</Button></Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row className="d-flex justify-content-center">
                        {users.map((user) => { 
                            return (
                                <Col md={12} key={user.id}>
                                    <Row className="text-light justify-content-center fila_users">
                                        <Col md={1}>{user.id}</Col>
                                        <Col md={3}>{user.firstName}</Col>
                                        <Col md={3}>{user.lastName}</Col>
                                        <Col md={4}>{user.email}</Col>
                                        <Col md={1}>{user.isActive?("Activo"):("Inactivo")}</Col>

                                    </Row>
                                </Col>
                            )

                        })}
                    </Row>
                </>
            ) : admin_vista === "citas" ? (
                <>
                    <Row className="d-flex justify-content-center m-5">
                        <Col>
                            <Row className="d-flex justify-content-center">
                                <Col md={2}><Button onClick={(() => { setAdminVista("") })}>Cerrar</Button></Col>
                                <Col md={2}><Button onClick={(() => { setAdminVista("user"), users_data() })}>Usuarios</Button></Col>
                            </Row>
                        </Col>

                    </Row>
                    <Row className="d-flex justify-content-center">
                        {citas.map((cita) => { 
                            return (
                                <Col md={12} key={cita.id}>
                                    <Row className="text-light justify-content-center fila_users">
                                        <Col md={1}>{cita.id}</Col>
                                        <Col md={2}>{cita.description}</Col>
                                        <Col md={1}>{cita.day_date}</Col>
                                        <Col md={2}>{cita.cliente}</Col>
                                        <Col md={1}>{cita.price}€</Col>
                                        <Col md={2}>{cita.doctor.user.firstName}</Col>
                                        <Col md={3}>{cita.doctor.user.email}</Col>
                                       
                                    </Row>
                                </Col>
                            )

                        })}
                    </Row>
                </>
            ) : (

                <Row className="d-flex justify-content-center botones_principales">
                    <Col>
                        <Row className="d-flex justify-content-center">
                            <Col md={2}><Button onClick={(() => { setAdminVista("user"), users_data() })}>Usuarios</Button></Col>
                            <Col md={2}><Button onClick={(() => { setAdminVista("citas"), citas_data() })}>Citas</Button></Col>
                        </Row>
                    </Col>

                </Row>
            )}

        </Container>
    )



}