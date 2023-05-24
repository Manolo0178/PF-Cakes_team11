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

const LoginForm = () => {
  const Navigate = useNavigate()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError]=useState("")
  const [rememberSession, setRememberSession] = useState(false);



  const handleLogin = async (e) => {
    e.preventDefault();
    await axios
      .post("http://localhost:3001/user/login", { email, password })
      .then((response) => {
        const token = response.data.token;
        const userId = response.data.id;
        localStorage.setItem("token", token);
        localStorage.setItem("userId", userId);
        Navigate("/home");
      })
      .catch((error) => {

        setError(error.response.data.error)
      });
  };

  const handleRememberSessionChange = () => {
    setRememberSession(!rememberSession);
  };

  return (
    <form className={styles.loginCont} onSubmit={(e) => handleLogin(e)}>
      <h1>Iniciar sesión</h1>
      <div className={styles.inputCont}>
        {error && <p>{error}</p>}
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
          <Link to={'/login/enviarMail'} >
           <p>¿olvidaste tu contraseña?</p>
          </Link>
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
        <input
          type="checkbox"
          name="rememberSession"
          checked={rememberSession}
          onChange={handleRememberSessionChange}
        />
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