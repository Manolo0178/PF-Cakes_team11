import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./CreateUser.module.css";
import Button from "react-bootstrap/Button";
import Footer from "../../components/Footer/Footer";
import NavBar from "../../components/Navbar/Navbar";
import Swal from "sweetalert2";
import validation from "./Validation";
import axios from "axios";

const CreateUser = () => {
  const Navigate = useNavigate()


  const [form, setForm] = useState({
    name: "",
    email:"",
    contact: "",
    lastName: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
    confirmpassword: "",
  }); 

  const handleChange = (event) => {
    const property = event.target.name;
    const value = event.target.value;

    setForm({ ...form, [property]: value });
    setErrors(validation({ ...form, [property]: value }, errors));
  };

  const handleSubmit = async(e) => {
    e.preventDefault()
    if (
      form.name &&
      !errors.name &&
      form.lastName &&
      !errors.lastName &&
      form.email &&
      !errors.email &&
      form.password &&
      !errors.password &&
      !errors.confirmpassword
    ) {
      await axios.post("http://localhost:3001/user/create", form)
      .then((response) => {
        if (response) {
          Navigate("/login");
          
        }
        
      })
        .catch(()=> {
        alert("el usuario ya existe")
      })
      .catch((error) => {
        Swal.fire({
          title: error.response.data.error,
          icon: "error",
          confirmButtonText: "Ok",
      })
      // console.log(error);
      })
    }
  };

  
return (
  <div className={styles.cont}>
    <NavBar />
    <div className={styles.formCont}>
      <h1>Crear usuario</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formElements}>
          <div className={styles.inputCont}>
            <label htmlFor="">Nombre:</label>
            <input
              type="text"
              onChange={handleChange}
              name="name"
              placeholder="nombre"
            />
            {errors.name && errors.name !== "" && (
              <span className={styles.error}>{errors.name}</span>
            )}
          </div>
        </div>

        <div className={styles.formElements}>
          <div className={styles.inputCont}>
            <label htmlFor="">Apellido:</label>
            <input
              type="text"
              onChange={handleChange}
              name="lastName"
              placeholder="Apellido"
            />
            {errors.lastName && errors.lastName !== "" && (
              <span className={styles.error}>{errors.lastName}</span>
            )}
          </div>
        </div>

        <div className={styles.formElements}>
          <div className={styles.inputCont}>
            <label htmlFor="">tel:</label>
            <input
              type="text"
              onChange={handleChange}
              name="contact"
              placeholder="Teléfono móvil"
            />
            {errors.contact && errors.contact !== "" && (
              <span className={styles.error}>{errors.contact}</span>
            )}
          </div>
        </div>
        <div className={styles.formElements}>
          <div className={styles.inputCont}>
            <label htmlFor="">Email:</label>
            <input
              type="text"
              onChange={handleChange}
              name="email"
              placeholder="Correo electrónico"
            />
            {errors.email && errors.email !== "" && (
              <span className={styles.error}>{errors.email}</span>
            )}
          </div>
        </div>
        <div className={styles.formElements}>
          <div className={styles.inputCont}>
            <label htmlFor="">Contraseña:</label>
            <input
              type="password"
              onChange={handleChange}
              name="password"
              placeholder="Contraseña"
            />
            {errors.password && errors.password !== "" && (
              <span className={styles.error}>{errors.password}</span>
            )}
          </div>
        </div>
        <div className={styles.formElements}>
          <div className={styles.inputCont}>
            <label htmlFor="">Confirmar contraseña:</label>
            <input
              type="password"
              onChange={handleChange}
              name="confirmpassword"
              placeholder="Confirmar contraseña"
            />
            {errors.confirmpassword && errors.confirmpassword !== "" && (
              <span className={styles.error}>{errors.confirmpassword}</span>
            )}
          </div>
        </div>
        <div>
          <Button variant="primary" type="submit">
            Enviar
          </Button>{" "}
        </div>
      </form>
    </div>
    <Footer />
  </div>
);
};

export default CreateUser;
