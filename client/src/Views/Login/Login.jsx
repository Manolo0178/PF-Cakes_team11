import React from 'react'
import Button from "react-bootstrap/Button";
//import icons
import { FaGoogle } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import Navbar from '../../components/Navbar/Navbar';

import styles from "./Login.module.css"
const Login = () => {
  return (
    <div className={styles.cont}>
      <Navbar/>
      <div className={styles.loginCont}>
        <h1>Iniciar sesión</h1>
        <div className={styles.inputCont}>
          <input type="text" placeholder="Email" className={styles.input} />
          <input
            type="text"
            placeholder="Contraseña"
            className={styles.input}
          />
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
        <Button variant="primary">Login</Button>{" "}
        <div className={styles.links}>
          <p>No puedes iniciar sesión?</p>
          <p>Crear cuenta</p>
        </div>
      </div>
    </div>
  );
}

export default Login