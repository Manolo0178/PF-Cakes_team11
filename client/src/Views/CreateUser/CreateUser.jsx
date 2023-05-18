import React from "react";
import { useState } from "react";

import styles from "./CreateUser.module.css";
import Button from "react-bootstrap/Button";
import Footer from "../../components/Footer/Footer";
import NavBar from "../../components/Navbar/Navbar";

import validation from "./Validation";
const CreateUser = () => {
  
  const [form, setForm] = useState({
    name: "",
    address: "",
    contact: "",
    password: "",
    confirmpassword: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    address: "",
    contact: "",
    password: "",
    confirmpassword: "",
  });
  const handleChange = (event) => {
    const property = event.target.name;
    const value = event.target.value;

    setForm({ ...form, [property]: value });
    setErrors(validation({ ...form, [property]: value }, errors));
  };
  
  return (
    <div className={styles.cont}>
      <NavBar />
      <div className={styles.formCont}>
        <h1>Crear usuario</h1>
        <form className={styles.form}>
          <div className={styles.formElements}>
            <div className={styles.inputCont}>
              <label htmlFor="">Nombre:</label>
              <input
                type="text"
                onChange={handleChange}
                name="name"
                placeholder="name"
              />
              {errors.name && errors.name !== "" && (
                <span className={styles.error}>{errors.name}</span>
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
            <Button variant="primary">Enviar</Button>{" "}
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default CreateUser;
