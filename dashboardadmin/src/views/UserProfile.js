
// import React, { useState } from "react";
// import axios from "axios";


// import {
//   Button,
//   Card,
//   CardHeader,
//   CardBody,
//   CardFooter,
//   CardText,
//   FormGroup,
//   Form,
//   Input,
//   Row,
//   Col,
// } from "reactstrap";

// function UserProfile() {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   // const [street, setStreet] = useState("");
//   // const [postalCode, setPostalCode] = useState("");
//   // const [city, setCity] = useState("");
//   // const [province, setProvince] = useState("");
//   // const [number, setNumber] = useState("");
//   // const [telephoneContact, setTelephoneContact] = useState("");
//   // const [addressId, setAddressId] = useState("");
//   const [userId, setUserId] = useState("");
//   const [image, setImage] = useState("");
  
// // ...

// async function handleUpdateUser() {
//   const idUser = userId;
//   const userData = {
//     name: name,
//     email: email,
//     firstName: firstName,
//     lastName: lastName,
//     image: image,
//     // ...
//   };

//   try {
//     const response = await axios.put(
//       `http://localhost:3001/user/modifyUser/${idUser}`,
//       userData
//     );
//     console.log(response.data);
//   } catch (error) {
//     console.error(error);
//   }
// }

// // async function handleUpdateAddress() {
// //   const addressData = {
// //     street: street,
// //     postalCode: postalCode,
// //     city: city,
// //     province: province,
// //     number: number,
// //     telephoneContact: telephoneContact,
// //     userId: userId, // Agrega el campo userId al objeto addressData
// //   };

// //   const idAddress = addressId;

// //   try {
// //     const response = await axios.put(
// //       `http://localhost:3001/Address/${idAddress}`,
// //       addressData
// //     );
// //     console.log(response.data);
// //   } catch (error) {
// //     console.error(error);
// //   }
// // }

//   return (
//     <>
//       <div className="content">
//         <Row>
//           <Col md="8">
//             <Card>
//               <CardHeader>
//                 <h5 className="title">Editar Perfil</h5>
//               </CardHeader>
//               <CardBody>
//                 <Form>
//                   <Row>
//                     <Col className="pr-md-1" md="5">
//                       <FormGroup>
//                         <label>Compañía (deshabilitado)</label>
//                         <Input
//                           defaultValue="Creative Code Inc."
//                           disabled
//                           placeholder="Company"
//                           type="text"
//                         />
//                       </FormGroup>
//                     </Col>
//                     <Col className="px-md-1" md="3">
//                     <FormGroup>
//     <label>ID de Usuario</label>
//     <Input
//       defaultValue={userId}
//       placeholder="User ID"
//       type="text"
//       onChange={(e) => setUserId(e.target.value)}
//     />
//   </FormGroup>
//                     </Col>
//                     <Col className="px-md-1" md="3">
//                       <FormGroup>
//                         <label>Nombre de Usuario</label>
//                         <Input
//                           defaultValue={name}
//                           placeholder="Nombre de Usuario"
//                           type="text"
//                           onChange={(e) => setName(e.target.value)}
//                         />
//                       </FormGroup>
//                     </Col>
//                     <Col className="pl-md-1" md="4">
//                       <FormGroup>
//                         <label htmlFor="exampleInputEmail1">
//                         Correo Electrónico
//                         </label>
//                         <Input 
//                         defaultValue={email} 
//                         placeholder="mike@email.com" 
//                         type="email"
//                         onChange={(e) => setEmail(e.target.value)}
//                          />
//                       </FormGroup>
//                     </Col>
//                   </Row>
//                   <Row>
//                     <Col className="pr-md-1" md="6">
//                       <FormGroup>
//                         <label>Nombre</label>
//                         <Input
//                           defaultValue={firstName}
//                           placeholder="Nombre"
//                           type="text"
//                           onChange={(e) => setFirstName(e.target.value)}
//                         />
//                       </FormGroup>
//                     </Col>
//                     <Col className="pl-md-1" md="6">
//                       <FormGroup>
//                         <label>Apellido</label>
//                         <Input
//                           defaultValue={lastName}
//                           placeholder="Apellido"
//                           type="text"
//                           onChange={(e) => setLastName(e.target.value)}
//                         />
//                       </FormGroup>
//                     </Col>
//                   </Row>
//                   <Row>
//   <Col className="pr-md-1" md="6">
//     <FormGroup>
//       <label>Imagen</label>
//       <Input
//         defaultValue={image}
//         placeholder="URL de la Imagen"
//         type="text"
//         onChange={(e) => setImage(e.target.value)}
//       />
//     </FormGroup>
//   </Col>
// </Row>
                 
                
//     </Form>
//               </CardBody>
//               <CardFooter>
//               <Button
//           className="btn-fill"
//           color="primary"
//           type="submit"
//           onClick={handleUpdateUser}
//         >
//           Guardar Usuario
//         </Button>
        
//               </CardFooter>
//             </Card>
//           </Col>



//                           <Col md="4">
//                             <Card className="card-user">
                          
//                           <CardBody>
//                                 <CardText />
                          
//                           <div className="author">
//                                   <div className="block block-one" />
//                                   <div className="block block-two" />
//                                   <div className="block block-three" />
//                                   <div className="block block-four" />
//                                   <a href="#pablo" onClick={(e) => e.preventDefault()}>
//                                     {/* <img
//                                       alt="sads"
//                                       className="avatar"
//                                       src={require("https://res.cloudinary.com/ddhuh7eke/image/upload/v1685631814/imgen/rhue5persfhojuz1vwdx.jpg")}
//                                     /> */}
//                                     <img
//   alt="sads"
//   className="avatar"
//   src="https://res.cloudinary.com/ddhuh7eke/image/upload/v1685631814/imgen/rhue5persfhojuz1vwdx.jpg"
// />
//                                     <h5 className="title">Aylen Rondan</h5>
//                                   </a>
//                                   <p className="description">||°•Ohana Pasteleria•°||</p>
//                                 </div>
//                                 <div className="card-description">
//                                 "No tengas miedo de descubrir la verdad detrás de cada dulce, ya que es fundamental reconectar con la autenticidad en el arte de la pastelería. En Ohana Pastelería, amamos cada creación como si fuera única, porque sabemos que la verdadera magia se encuentra en cada delicado sabor y exquisita textura. Permítenos endulzar tu día con nuestras deliciosas creaciones."
//                                 </div>
//                               </CardBody>
//                               <CardFooter>
//                                 <div className="button-container">
//                                   <Button className="btn-icon btn-round" color="facebook">
//                                     <i className="fab fa-facebook" />
//                                   </Button>
//                                   <Button className="btn-icon btn-round" color="twitter">
//                                     <i className="fab fa-twitter" />
//                                   </Button>
//                                   <Button className="btn-icon btn-round" color="google">
//                                     <i className="fab fa-google-plus" />
//                                   </Button>
//                                 </div>
//                               </CardFooter>
//                             </Card>
//                           </Col>






//           {/* <Col md="8">
//             <Card>
//               <CardHeader>
//                 <h5 className="title">Editar Dirección</h5>
//               </CardHeader>
//               <CardBody>
//                 <Form>
                
//                 <Row>
//                 <Col className="pr-md-1" md="4">
//                 <FormGroup>
//   <label>ID de Usuario</label>
//   <Input
//     defaultValue={userId}
//     placeholder="User ID"
//     type="text"
//     onChange={(e) => setUserId(e.target.value)}
//   />
// </FormGroup>
// </Col>
// </Row>

//                 <Row>
//                     <Col md="12">
//                 <FormGroup>
//   <label>ID de Dirección</label>
//   <Input
//     defaultValue={addressId}
//     placeholder="ID de Dirección"
//     type="text"
//     onChange={(e) => setAddressId(e.target.value)}
//   />
// </FormGroup></Col></Row>
//                   <Row>
//                     <Col md="12">
//                     <FormGroup>
//       <label>Calle</label>
//       <Input
//         defaultValue={street}
//         placeholder="Calle"
//         type="text"
//         onChange={(e) => setStreet(e.target.value)}
//       />
//     </FormGroup>
//                     </Col>
//                   </Row>
//                   <Row>
//                     <Col className="pr-md-1" md="4">
//                     <FormGroup>
//       <label>Código Postal</label>
//       <Input
//         defaultValue={postalCode}
//         placeholder="Código Postal"
//         type="text"
//         onChange={(e) => setPostalCode(e.target.value)}
//       />
//     </FormGroup>
//                     </Col>
//                     <Col className="px-md-1" md="4">
//                     <FormGroup>
//       <label>Provincia</label>
//       <Input
//         defaultValue={province}
//         placeholder="Provincia"
//         type="text"
//         onChange={(e) => setProvince(e.target.value)}
//       />
//     </FormGroup>
//                     </Col>
//                     <Col className="pl-md-1" md="4">
//                     <FormGroup>
//       <label>Ciudad</label>
//       <Input
//         defaultValue={city}
//         placeholder="Ciudad"
//         type="text"
//         onChange={(e) => setCity(e.target.value)}
//       />
//     </FormGroup>
//                     </Col>
                  

//                     <Col className="pl-md-1" md="4">
//                     <FormGroup>
//       <label>Número</label>
//       <Input
//         defaultValue={number}
//         placeholder="Número"
//         type="text"
//         onChange={(e) => setNumber(e.target.value)}
//       />
//     </FormGroup>
//                     </Col>


//                     <Col className="pl-md-1" md="4">
//                     <FormGroup>
//       <label>Teléfono de Contacto</label>
//       <Input
//         defaultValue={telephoneContact}
//         placeholder="Teléfono de Contacto"
//         type="text"
//         onChange={(e) => setTelephoneContact(e.target.value)}
//       />
//     </FormGroup>
//                     </Col>
 
//                   </Row>
               
//                 </Form>
//               </CardBody>
//               <CardFooter>
             
//         <Button
//         className="btn-fill"
//         color="primary"
//         type="submit"
//         onClick={handleUpdateAddress}
//       >
//         Guardar Dirección
//       </Button>
//               </CardFooter>
//             </Card>
//           </Col> */}

//         </Row>
//       </div>
//     </>
//   );
// }

// export default UserProfile;


// import React, { useState } from "react";
// import axios from "axios";
// import {
//   Button,
//   Card,
//   CardHeader,
//   CardBody,
//   CardFooter,
//   CardText,
//   FormGroup,
//   Form,
//   Input,
//   Row,
//   Col,
// } from "reactstrap";

// function UserProfile() {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [userId, setUserId] = useState("");
//   const [image, setImage] = useState("");
//   const [formReset, setFormReset] = useState(false);
//   const [message, setMessage] = useState("");

//   async function handleUpdateUser() {
//     const idUser = userId;
//     const userData = {
//       name: name,
//       email: email,
//       firstName: firstName,
//       lastName: lastName,
//       image: image,
//       // ...
//     };

//     try {
//       const response = await axios.put(
//         `http://localhost:3001/user/modifyUser/${idUser}`,
//         userData
//       );
//       console.log(response.data);
//       setMessage("Cambio realizado con éxito");
//       setFormReset(true);
//     } catch (error) {
//       console.error(error);
//       setMessage("Error al realizar el cambio");
//     }
//   }

//   // Reset form fields when formReset state is true
//   React.useEffect(() => {
//     if (formReset) {
//       setName("");
//       setEmail("");
//       setFirstName("");
//       setLastName("");
//       setImage("");
//       setFormReset(false);
//     }
//   }, [formReset]);

//   return (
//     <>
//       <div className="content">
//         <Row>
//           <Col md="8">
//             <Card>
//               <CardHeader>
//                 <h5 className="title">Editar Perfil</h5>
//               </CardHeader>
//               <CardBody>
//                 <Form>
//                   <Row>
//                     <Col className="pr-md-1" md="5">
//                       <FormGroup>
//                         <label>Compañía (deshabilitado)</label>
//                         <Input
//                           defaultValue="Creative Code Inc."
//                           disabled
//                           placeholder="Company"
//                           type="text"
//                         />
//                       </FormGroup>
//                     </Col>
//                     <Col className="px-md-1" md="3">
//                       <FormGroup>
//                         <label>ID de Usuario</label>
//                         <Input
//                           defaultValue={userId}
//                           placeholder="User ID"
//                           type="text"
//                           onChange={(e) => setUserId(e.target.value)}
//                         />
//                       </FormGroup>
//                     </Col>
//                     <Col className="px-md-1" md="3">
//                       <FormGroup>
//                         <label>Nombre de Usuario</label>
//                         <Input
//                           defaultValue={name}
//                           placeholder="Nombre de Usuario"
//                           type="text"
//                           onChange={(e) => setName(e.target.value)}
//                         />
//                       </FormGroup>
//                     </Col>
//                     <Col className="pl-md-1" md="4">
//                       <FormGroup>
//                         <label htmlFor="exampleInputEmail1">
//                           Correo Electrónico
//                         </label>
//                         <Input
//                           defaultValue={email}
//                           placeholder="mike@email.com"
//                           type="email"
//                           onChange={(e) => setEmail(e.target.value)}
//                         />
//                       </FormGroup>
//                     </Col>
//                   </Row>
//                   <Row>
//                     <Col className="pr-md-1" md="6">
//                       <FormGroup>
//                         <label>Nombre</label>
//                         <Input
//                           defaultValue={firstName}
//                           placeholder="Nombre"
//                           type="text"
//                           onChange={(e) => setFirstName(e.target.value)}
//                         />
//                       </FormGroup>
//                     </Col>
//                     <Col className="pl-md-1" md="6">
//                       <FormGroup>
//                         <label>Apellido</label>
//                         <Input
//                           defaultValue={lastName}
//                           placeholder="Apellido"
//                           type="text"
//                           onChange={(e) => setLastName(e.target.value)}
//                         />
//                       </FormGroup>
//                     </Col>
//                   </Row>
//                   <Row>
//                     <Col className="pr-md-1" md="6">
//                       <FormGroup>
//                         <label>Imagen</label>
//                         <Input
//                           defaultValue={image}
//                           placeholder="URL de la Imagen"
//                           type="text"
//                           onChange={(e) => setImage(e.target.value)}
//                         />
//                       </FormGroup>
//                     </Col>
//                   </Row>
//                 </Form>
//               </CardBody>
//               <CardFooter>
//                 <Button
//                   className="btn-fill"
//                   color="primary"
//                   type="submit"
//                   onClick={handleUpdateUser}
//                 >
//                   Guardar Usuario
//                 </Button>
//               </CardFooter>
//             </Card>
//             {message && (
//               <Card className="mt-4">
//                 <CardBody>
//                   <CardText>{message}</CardText>
//                 </CardBody>
//               </Card>
//             )}
//           </Col>
//           <Col md="4">
//             <Card className="card-user">
//               <CardBody>
//                 <CardText />
//                 <div className="author">
//                   <div className="block block-one" />
//                   <div className="block block-two" />
//                   <div className="block block-three" />
//                   <div className="block block-four" />
//                   <a href="#pablo" onClick={(e) => e.preventDefault()}>
//                     <img
//                       alt="sads"
//                       className="avatar"
//                       src="https://res.cloudinary.com/ddhuh7eke/image/upload/v1685631814/imgen/rhue5persfhojuz1vwdx.jpg"
//                     />
//                     <h5 className="title">Aylen Rondan</h5>
//                   </a>
//                   <p className="description">||°•Ohana Pasteleria•°||</p>
//                 </div>
//                 <div className="card-description">
//                   "No tengas miedo de descubrir la verdad detrás de cada dulce,
//                   ya que es fundamental reconectar con la autenticidad en el
//                   arte de la pastelería. En Ohana Pastelería, amamos cada
//                   creación como si fuera única, porque sabemos que la verdadera
//                   magia se encuentra en cada delicado sabor y exquisita
//                   textura. Permítenos endulzar tu día con nuestras deliciosas
//                   creaciones."
//                 </div>
//               </CardBody>
//               <CardFooter>
//                 <div className="button-container">
//                   <Button className="btn-icon btn-round" color="facebook">
//                     <i className="fab fa-facebook" />
//                   </Button>
//                   <Button className="btn-icon btn-round" color="twitter">
//                     <i className="fab fa-twitter" />
//                   </Button>
//                   <Button className="btn-icon btn-round" color="google">
//                     <i className="fab fa-google-plus" />
//                   </Button>
//                 </div>
//               </CardFooter>
//             </Card>
//           </Col>
//         </Row>
//       </div>
//     </>
//   );
// }

// export default UserProfile;


import React, { useState } from "react";
import axios from "axios";
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
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userId, setUserId] = useState("");
  const [image, setImage] = useState("");
  const [formReset, setFormReset] = useState(false);
  const [message, setMessage] = useState("");

  async function handleUpdateUser() {
    const idUser = userId;
    const userData = {
      name: name,
      email: email,
      firstName: firstName,
      lastName: lastName,
      image: image,
    };

    try {
      const response = await axios.put(
        `http://localhost:3001/user/modifyUser/${idUser}`,
        userData
      );
      console.log(response.data);
      setMessage("Cambio realizado con éxito");
      setFormReset(true);
    } catch (error) {
      console.error(error);
      setMessage("Error al realizar el cambio");
    }
  }

  // Reset form fields when formReset state is true
  React.useEffect(() => {
    if (formReset) {
      setName("");
      setEmail("");
      setFirstName("");
      setLastName("");
      setImage("");
      setFormReset(false);
    }
  }, [formReset]);

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
                          value={userId}
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
                          value={name}
                          placeholder="Nombre de Usuario"
                          type="text"
                          onChange={(e) => setName(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-md-1" md="4">
                      <FormGroup>
                        <label htmlFor="exampleInputEmail1">
                          Correo Electrónico
                        </label>
                        <Input
                          value={email}
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
                          value={firstName}
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
                          value={lastName}
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
                          value={image}
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
            {message && (
              <Card className="mt-4">
                <CardBody>
                  <CardText>{message}</CardText>
                </CardBody>
              </Card>
            )}
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
                      alt="sads"
                      className="avatar"
                      src="https://res.cloudinary.com/ddhuh7eke/image/upload/v1685631814/imgen/rhue5persfhojuz1vwdx.jpg"
                    />
                    <h5 className="title">Aylen Rondan</h5>
                  </a>
                  <p className="description">||°•Ohana Pasteleria•°||</p>
                </div>
                <div className="card-description">
                  "No tengas miedo de descubrir la verdad detrás de cada dulce,
                  ya que es fundamental reconectar con la autenticidad en el
                  arte de la pastelería. En Ohana Pastelería, amamos cada
                  creación como si fuera única, porque sabemos que la verdadera
                  magia se encuentra en cada delicado sabor y exquisita
                  textura. Permítenos endulzar tu día con nuestras deliciosas
                  creaciones."
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
        </Row>
      </div>
    </>
  );
}

export default UserProfile;
