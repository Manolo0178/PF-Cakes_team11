import React from 'react'
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import GoogleLogin from "react-google-login";
import { gapi } from "gapi-script";
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

  const clientID = "781787972829-6oaasrp4vfoe34t3fkbd02bqv1vpktjm.apps.googleusercontent.com"


  useEffect(()=> {
    const start = () =>{
      gapi.auth2.init({
        clientId: clientID,
      })
    }
    gapi.load("client:auth2", start)
  },[])

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

  const onSuccess = async (response) =>{
    console.log(response);
    const token = response.accessToken
    localStorage.setItem("token", token)
    
    let user = {
      name: response.profileObj.givenName,
      email:response.profileObj.email,
      lastName: response.profileObj.familyName,
      googleId: response.googleId
      // image: response.profileObj.imageUrl
    }
    await axios.post("http://localhost:3001/user/create", user)
      .then((res) => {
        if (res) {
          const id = res.data.id
          localStorage.setItem("userId", id)
          Navigate("/home");    
        }
      })
  }

  const onFailure = () => {
    console.log("Lo sentimos hubo un fallo")
  }

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
          {/* <FaGoogle size="1.2rem" /> */}
          <GoogleLogin
            clientId={clientID}
            onSuccess={onSuccess}
            onFailure={onFailure}
            cookiePolicy={"single_host_policy"}
          />

          
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



// email = profileObj.email
// surName = profileObj.familyName
// name = profileObj.givenName
// image = profileObj.imageUrl
// googleId