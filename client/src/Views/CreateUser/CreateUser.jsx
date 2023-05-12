import React from "react";
import { useState } from "react";

import styles from "./CreateUser.module.css";
import Button from "react-bootstrap/Button";

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

    validate({ ...form, [property]: value });
    setForm({ ...form, [property]: value });
  };

  const validate = (form) => {
    // form name
    if (form.name.length > 0 && form.name.length < 4) {
      setErrors({ ...errors, name: "debe contener mas de 3 letras" });
    }
    if (form.name.length === 0 || form.name.length >= 4)
      setErrors({ ...errors, name: "" });
    
    //form email
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(form.email))
      setErrors({ ...errors, email: "su email es inválido" });

    //form password
    if (form.password.length === 0 || form.password.length > 6)
      setErrors({ ...errors, password: "" });
    if (form.password.length < 6 && form.password.length > 0)
      setErrors({
        ...errors,
        password: "la contraseña debe de tener entre 6 y 10 caracteres",
      });

    //form confirm password
    if (form.confirmpassword !== form.password)
      setErrors({ ...errors, confirmpassword: "no coinciden las contraseñas" });

    if (form.confirmpassword == form.password)
      setErrors({ ...errors, confirmpassword: "" });

    //form celphone falta buscar regex
    if (form.contact.length > 0 && form.contact.length < 6)
      setErrors({ ...errors, contact: "telefono inválido" });
    if (form.contact.length > 6 || form.contact.length === 0)
      setErrors({ ...errors, contact: "" });
  };

  return (
    <div className={styles.cont}>
      <div className={styles.formCont}>
        <h1>Crear usuario</h1>
        <form className={styles.form}>
          <div className={styles.formElements}>
            <div className={styles.inputCont}>
              <label htmlFor="">Nombre:</label>
              <input type="text" onChange={handleChange} name="name" />
            </div>
            {errors.name && errors.name != "" && (
              <span className={styles.error}>{errors.name}</span>
            )}
          </div>
          <div className={styles.formElements}>
            <div className={styles.inputCont}>
              <label htmlFor="">tel:</label>
              <input type="text" onChange={handleChange} name="contact" />
            </div>
            {errors.contact && errors.contact != "" && (
              <span className={styles.error}>{errors.contact}</span>
            )}
          </div>
          <div className={styles.formElements}>
            <div className={styles.inputCont}>
              <label htmlFor="">Email:</label>
              <input type="text" onChange={handleChange} name="email" />
            </div>
            {errors.email && errors.email != "" && (
              <span className={styles.error}>{errors.email}</span>
            )}
          </div>
          <div className={styles.formElements}>
            <div className={styles.inputCont}>
              <label htmlFor="">Contraseña:</label>
              <input type="password" onChange={handleChange} name="password" />
            </div>
            {errors.password && errors.password != "" && (
              <span className={styles.error}>{errors.password}</span>
            )}
          </div>
          <div className={styles.formElements}>
            <div className={styles.inputCont}>
              <label htmlFor="">Confirmar contraseña:</label>
              <input
                type="password"
                onChange={handleChange}
                name="confirmpassword"
              />
            </div>
            {errors.confirmpassword && errors.confirmpassword != "" && (
              <span className={styles.error}>{errors.confirmpassword}</span>
            )}
          </div>
          <div>
            <Button variant="primary">Enviar</Button>{" "}
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateUser;