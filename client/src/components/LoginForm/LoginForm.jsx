import React from 'react'
import { useState } from "react";
import Button from "react-bootstrap/Button";
//import icons
import { FaGoogle } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import styles from "./LoginForm.module.css"
import axios from "axios";

const LoginForm = ({ setToken }) => {
  const Navigate = useNavigate()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/login", { email, password });
      const token = response.data.token;
      localStorage.setItem("token", token);
      setToken(token);
    } catch (error) {
      throw new Error("error al iniciar sesión");
    }
  };
  const handleSubmitLogin = (e) => {
    e.preventDefault();
    // hay que validar si el usuario existe, en caso que exista hace esto, en caso
    // contrario, poner otra alerta de error
    Swal.fire({
      title: "Te has logueado de forma exitosa",
      icon: "success",
      text: "Serás redireccionado al inicio",
    }).then((result) => {
      if (result.isConfirmed) {
        Navigate("/home");
      }
    });
  };

  return (
    <form className={styles.loginCont} onSubmit={(e) => handleSubmitLogin(e)}>
      <h1>Iniciar sesión</h1>
      <div className={styles.inputCont}>
        <div className={styles.emailCont}>
          <label>Email: </label>
          <input
            type="text"
            placeholder="Email"
            className={styles.input}
            name="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className={styles.emailCont}>
          <label>Contraseña: </label>
          <input
            type="password"
            placeholder="Contraseña"
            className={styles.input}
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
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
};

export default LoginForm