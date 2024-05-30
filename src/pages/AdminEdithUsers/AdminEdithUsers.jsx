import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { userData } from '../../app/slices/userSlice'
import { deleteUserId, editAdminUsersId } from '../../services/apiCalls'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { CustomInput } from '../../components/CustomInput/CustomInput'
import navigate from 'navigate'

export const AdminEdithUsers = () => {


  const edithAdmin = useSelector(userData).adminEdithUsersId
  const token = useSelector(userData).token
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password:"",
    isActive:"", 
    id: "",
    role: "",
  })

  const [data_modify, setDataModify] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password:"",
    isActive:"", 
    id: "",
    role: "",
  });

  useEffect(() => {
    editAdminUsersId(edithAdmin, token)
      .then((patata) => {
        setUser(patata)
        setDataModify(patata); 
      })
      .catch((error) => {
        console.log(error)
      })
  }, [edithAdmin])


  const inputHandler = (e) => {
    setDataModify((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const deleteUsersId = ( token) => {
    const delete_data = { isActive: "false" }
    deleteUserId(token, delete_data)
    navigate("/admin")
  }

  return (

    <div>

      <Container className="login_design">
        <Row className="d-flex justify-content-center align-items-center">
          <Col md={4}>
            <CustomInput className="inputLogin"
              type={"text"}
              name={"firstName"}
              handler={inputHandler}
              placeholder={"firstName"}
              value={data_modify.firstName}
              
            />
            <CustomInput className="inputLogin"
              type={"text"}
              name={"lastName"}
              handler={inputHandler}
              placeholder={"lastName"}
              value={data_modify.lastName}
            />
            <CustomInput className="inputLogin"
              type={"text"}
              name={"roleId"}
              handler={inputHandler}
              placeholder={"role"}
              value={data_modify.roleId}
            />
            <CustomInput className="inputLogin"
              type={"email"}
              name={"email"}
              handler={inputHandler}
              placeholder={"Email"}
              value={data_modify.email}
            />
            <CustomInput className="inputLogin"
              type={"password"}
              name={"password"}
              handler={inputHandler}
              placeholder={"Contraseña"}
              value={data_modify.password}
            />

            
          </Col>
        </Row>
        <Row className="d-flex justify-content-center mt-3">
              <Col md={4}>
                <Button onClick={() => modify_user(data_modify, userId) }>Modificar</Button>
              </Col>
              <Col md={4}>
                <Button onClick={() => { deleteUsersId(token) }}>Borrar</Button>
              </Col>
            </Row>
      </Container>


    </div>
  )
}
