import React from 'react'
import { useState } from "react";
import Button from "react-bootstrap/Button";
//import icons
import { FaGoogle } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import NavBar from '../../components/Navbar/Navbar';
import { Link, useNavigate } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import styles from "./Login.module.css"

import validation from './Validation';
const Login = () => {
  const Navigate = useNavigate()
  const [userData,SetUserData] = useState({
    username : "",
    password : ""
  });

  const [errors,SetErrors] = useState({
    username : "",
    password : ""
  }); 

  const handleInputChange = (event) =>{
    const property = event.target.name;
    const value = event.target.value;

    SetUserData({...userData, [property] : value});
    SetErrors(validation({...userData, [property] : value},errors));
};
  const handleSubmit = (e) => {
    Navigate("/home")
  }
  return (
    <div className={styles.cont}>
      <NavBar />
      <form className={styles.loginCont} onSubmit={(e)=>handleSubmit(e)} >
        <h1>Iniciar sesión</h1>
        <div className={styles.inputCont}>
            <input
              type="text"
              placeholder="Email"
              className={
                !userData.username
                  ? styles.input
                  : errors.username
                  ? styles.error
                  : styles.success
              }
              name="username"
              value={userData.username}
              onChange={handleInputChange}
            />
            {errors.username !== "" && (
              <span className={styles.validationEmail}>{errors.username}</span>
            )}
            <input
              type="password"
              placeholder="Contraseña"
              className={
                !userData.password
                  ? styles.input
                  : errors.password
                  ? styles.error
                  : styles.success
              }
              name="password"
              value={userData.password}
              onChange={handleInputChange}
            />
            {errors.password !== "" && (
              <span className={styles.validationPassword}>{errors.password}</span>
            )}
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
        <Button variant="primary" type="submit" >Login</Button>{" "}
        <div className={styles.links}>
          <p>No puedes iniciar sesión?</p>
          <Link to="/createUser">Crear cuenta</Link>
        </div>
      </form>
      <Footer />
    </div>
  );
}

export default Login