/*!

=========================================================
* Black Dashboard React v1.2.2
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useState } from "react";
import axios from "axios";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardText,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
} from "reactstrap";

function UserProfile() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [street, setStreet] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [number, setNumber] = useState("");
  const [telephoneContact, setTelephoneContact] = useState("");
  const [addressId, setAddressId] = useState("");
  const [userId, setUserId] = useState("");
  const [image, setImage] = useState("");
  
// ...

async function handleUpdateUser() {
  const idUser = userId;
  const userData = {
    username: username,
    email: email,
    firstName: firstName,
    lastName: lastName,
    image: image,
    // ...
  };

  try {
    const response = await axios.put(
      `http://localhost:3001/user/modifyUser/${idUser}`,
      userData
    );
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}

async function handleUpdateAddress() {
  const addressData = {
    street: street,
    postalCode: postalCode,
    city: city,
    province: province,
    number: number,
    telephoneContact: telephoneContact,
  };

  const idAddress = addressId;
  // const addressIndex = 1; // Cambia el índice según la dirección que deseas actualizar

  try {
    const response = await axios.put(
      `http://localhost:3001/Address/${idAddress}`,
      addressData
    );
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}


  return (
    <>
      <div className="content">
        <Row>
          <Col md="8">
            <Card>
              <CardHeader>
                <h5 className="title">Editar Perfil</h5>
              </CardHeader>
              <CardBody>
                <Form>
                  <Row>
                    <Col className="pr-md-1" md="5">
                      <FormGroup>
                        <label>Compañía (deshabilitado)</label>
                        <Input
                          defaultValue="Creative Code Inc."
                          disabled
                          placeholder="Company"
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                    <Col className="px-md-1" md="3">
                    <FormGroup>
    <label>ID de Usuario</label>
    <Input
      defaultValue={userId}
      placeholder="User ID"
      type="text"
      onChange={(e) => setUserId(e.target.value)}
    />
  </FormGroup>
                    </Col>
                    <Col className="px-md-1" md="3">
                      <FormGroup>
                        <label>Nombre de Usuario</label>
                        <Input
                          defaultValue={username}
                          placeholder="Nombre de Usuario"
                          type="text"
                          onChange={(e) => setUsername(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-md-1" md="4">
                      <FormGroup>
                        <label htmlFor="exampleInputEmail1">
                        Correo Electrónico
                        </label>
                        <Input 
                        defaultValue={email} 
                        placeholder="mike@email.com" 
                        type="email"
                        onChange={(e) => setEmail(e.target.value)}
                         />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-md-1" md="6">
                      <FormGroup>
                        <label>Nombre</label>
                        <Input
                          defaultValue={firstName}
                          placeholder="Nombre"
                          type="text"
                          onChange={(e) => setFirstName(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-md-1" md="6">
                      <FormGroup>
                        <label>Apellido</label>
                        <Input
                          defaultValue={lastName}
                          placeholder="Apellido"
                          type="text"
                          onChange={(e) => setLastName(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
  <Col className="pr-md-1" md="6">
    <FormGroup>
      <label>Imagen</label>
      <Input
        defaultValue={image}
        placeholder="URL de la Imagen"
        type="text"
        onChange={(e) => setImage(e.target.value)}
      />
    </FormGroup>
  </Col>
</Row>
                 
                
    </Form>
              </CardBody>
              <CardFooter>
              <Button
          className="btn-fill"
          color="primary"
          type="submit"
          onClick={handleUpdateUser}
        >
          Guardar Usuario
        </Button>
        
              </CardFooter>
            </Card>
          </Col>



                          <Col md="4">
                            <Card className="card-user">
                          
                          <CardBody>
                                <CardText />
                          
                          <div className="author">
                                  <div className="block block-one" />
                                  <div className="block block-two" />
                                  <div className="block block-three" />
                                  <div className="block block-four" />
                                  <a href="#pablo" onClick={(e) => e.preventDefault()}>
                                    <img
                                      alt="..."
                                      className="avatar"
                                      src={require("assets/img/emilyz.jpg")}
                                    />
                                    <h5 className="title">Mike Andrew</h5>
                                  </a>
                                  <p className="description">Ceo/Co-Founder</p>
                                </div>
                                <div className="card-description">
                                No tengas miedo de la verdad porque necesitamos reiniciar los
                            fundamentos humanos en la verdad. Y te amo como Kanye ama a Kanye.
                            Amo el diseño de cama de Rick Owens, pero la parte de atrás es...
                                </div>
                              </CardBody>
                              <CardFooter>
                                <div className="button-container">
                                  <Button className="btn-icon btn-round" color="facebook">
                                    <i className="fab fa-facebook" />
                                  </Button>
                                  <Button className="btn-icon btn-round" color="twitter">
                                    <i className="fab fa-twitter" />
                                  </Button>
                                  <Button className="btn-icon btn-round" color="google">
                                    <i className="fab fa-google-plus" />
                                  </Button>
                                </div>
                              </CardFooter>
                            </Card>
                          </Col>






          <Col md="8">
            <Card>
              <CardHeader>
                <h5 className="title">Editar Dirección</h5>
              </CardHeader>
              <CardBody>
                <Form>
                


                <Row>
                    <Col md="12">
                <FormGroup>
  <label>ID de Dirección</label>
  <Input
    defaultValue={addressId}
    placeholder="ID de Dirección"
    type="text"
    onChange={(e) => setAddressId(e.target.value)}
  />
</FormGroup></Col></Row>
                  <Row>
                    <Col md="12">
                    <FormGroup>
      <label>Calle</label>
      <Input
        defaultValue={street}
        placeholder="Calle"
        type="text"
        onChange={(e) => setStreet(e.target.value)}
      />
    </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-md-1" md="4">
                    <FormGroup>
      <label>Código Postal</label>
      <Input
        defaultValue={postalCode}
        placeholder="Código Postal"
        type="text"
        onChange={(e) => setPostalCode(e.target.value)}
      />
    </FormGroup>
                    </Col>
                    <Col className="px-md-1" md="4">
                    <FormGroup>
      <label>Provincia</label>
      <Input
        defaultValue={province}
        placeholder="Provincia"
        type="text"
        onChange={(e) => setProvince(e.target.value)}
      />
    </FormGroup>
                    </Col>
                    <Col className="pl-md-1" md="4">
                    <FormGroup>
      <label>Ciudad</label>
      <Input
        defaultValue={city}
        placeholder="Ciudad"
        type="text"
        onChange={(e) => setCity(e.target.value)}
      />
    </FormGroup>
                    </Col>
                    
                    {/* <Col className="pl-md-1" md="4">
                    <FormGroup>
      <label>Province</label>
      <Input
        defaultValue={province}
        placeholder="Province"
        type="text"
        onChange={(e) => setProvince(e.target.value)}
      />
    </FormGroup>
                    </Col> */}

                    <Col className="pl-md-1" md="4">
                    <FormGroup>
      <label>Número</label>
      <Input
        defaultValue={number}
        placeholder="Número"
        type="text"
        onChange={(e) => setNumber(e.target.value)}
      />
    </FormGroup>
                    </Col>


                    <Col className="pl-md-1" md="4">
                    <FormGroup>
      <label>Teléfono de Contacto</label>
      <Input
        defaultValue={telephoneContact}
        placeholder="Teléfono de Contacto"
        type="text"
        onChange={(e) => setTelephoneContact(e.target.value)}
      />
    </FormGroup>
                    </Col>
 
                  </Row>
               
                </Form>
              </CardBody>
              <CardFooter>
             
        <Button
        className="btn-fill"
        color="primary"
        type="submit"
        onClick={handleUpdateAddress}
      >
        Guardar Dirección
      </Button>
              </CardFooter>
            </Card>
          </Col>

        </Row>
      </div>
    </>
  );
}

export default UserProfile;
