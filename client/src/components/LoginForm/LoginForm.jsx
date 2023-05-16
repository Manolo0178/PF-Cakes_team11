import React from 'react'
import { useState } from "react";
import Button from "react-bootstrap/Button";
//import icons
import { FaGoogle } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import validation from "./Validation";
import styles from "./LoginForm.module.css"

const LoginForm = () => {
  const Navigate = useNavigate();
  const [userData, SetUserData] = useState({
    username: "",
    password: "",
  });

  const [errors, SetErrors] = useState({
    username: "",
    password: "",
  });

  const handleInputChange = (event) => {
    const property = event.target.name;
    const value = event.target.value;

    SetUserData({ ...userData, [property]: value });
    SetErrors(validation({ ...userData, [property]: value }, errors));
  };
  const handleSubmit = (e) => {
    Navigate("/home");
    Swal.fire({
      title: "Te has Logueado con éxito",
      icon: "success",
    });    
  };
  return (
    <form className={styles.loginCont} onSubmit={(e) => handleSubmit(e)}>
      <h1>Iniciar sesión</h1>
      <div className={styles.inputCont}>
        <div className={styles.emailCont}>
          <label>Email: </label>
          <input
            type="text"
            placeholder="Email"
            className={styles.input}
            name="username"
            value={userData.username}
            onChange={handleInputChange}
          />
        {errors.username !== "" && (
          <span className={styles.validation}>{errors.username}</span>
        )}
        </div>
        <div className={styles.emailCont}>
          <label>Contraseña: </label>
          <input
            type="password"
            placeholder="Contraseña"
            className={styles.input}
            name="password"
            value={userData.password}
            onChange={handleInputChange}
          />
        {errors.password !== "" && (
          <span className={styles.validation}>{errors.password}</span>
        )}
        </div>
        <div className={styles.forgotPassword}>
          <p>¿olvidaste tu contraseña?</p>
        </div>
      </div>
      <div className={styles.loginElse}>
        <div>
          <FaFacebookF size="1.2rem" />
        </div>
        <div>
          <FaGoogle size="1.2rem" />
        </div>
      </div>
      <div className={styles.checkbox}>
        <input type="checkbox" />
        <label htmlFor="">Permanecer conectado</label>
      </div>
      <Button variant="primary" type="submit">
        Login
      </Button>{" "}
      <div className={styles.links}>
        <p>No puedes iniciar sesión?</p>
        <Link to="/createUser">Crear cuenta</Link>
      </div>
    </form>
  );
}

export default LoginForm