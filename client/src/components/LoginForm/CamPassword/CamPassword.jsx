import React, { useEffect, useState } from "react";
import styles from './CamPassword.module.css'
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";


const CamPassword = () => {

    const navigate = useNavigate()
    const  email  = localStorage.getItem("email")

    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

    console.log(token);

    const [password, setPassword] = useState({
        newPassword: '',
        token: token,
        email: email,
        confirmPassword: '',
    })
    const [error, setError] = useState({
        newPassword: '',
        confirmPassword: ''
    })
    const [formValid, setFormValid] = useState(false);

    useEffect(() => {
        setError(validation(password));
    }, [password]);

    
     const validation = (form) => {
        const statError = {};

        if (!form.newPassword) {
            statError.newPassword = "";
        } else if(!/^(?=.*[A-Z]).+$/.test(form.newPassword)){
            statError.newPassword = "Debe contener 1 letra mayuscula";
        } else if (!/.*[0-9].*/.test(form.newPassword)) {
            statError.newPassword = "Debe contener números";
        } else if (form.newPassword.length < 6 || form.newPassword.length > 20) {
            statError.newPassword = "Debe tener entre 6 y 20 caracteres";
            
        }else {
            statError.newPassword = "";
        }

        if (!form.confirmPassword) {
            statError.confirmPassword = "";
        } else if (form.confirmPassword !== form.newPassword) {
            statError.confirmPassword = "No coincide con la contraseña";
        } else {
            statError.confirmPassword = "";
        }

        if (form.newPassword && form.confirmPassword && !Object.values(statError).some((error) => error !== "")) {
            setFormValid(true);
        } else {
            setFormValid(false);
        }
        
        return statError;

     }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setPassword({ ...password, [name]: value });
    }

    const handleSubmit = async (e) => { 
        try {
            e.preventDefault();
            await axios.put('http://localhost:3001/user/forgotPass',  password ).then((response) => { 
             const mensaje = response.data.message 
             Swal.fire({
              title: mensaje,
              icon: "success",
              confirmButtonText: "Ok",
          })
          .then((result) => {
            if (result.isConfirmed) { 
              navigate('/login')
            }
           })
       
       })
          } catch (error) {
               Swal.fire({
                 title: error.response.data.message,
                 icon: "error",
                 confirmButtonText: "Ok",
               })
               .then((result) => {
                   navigate('/login')
               })
          }
    }


    return(
        <div style={{ backgroundColor: 'bagraun', width: '100vw', height: '100vh' }}>
            <form className={styles.container2} onSubmit={handleSubmit} >
                <h3>Cambiar contraseña</h3>
                <hr />

                <label className={styles.label1} >Contraseña nueva ↡</label>
                <input 
                  type="password"
                  name="newPassword"
                  placeholder='Contraseña nueva...'
                  onChange={handleChange}
                  value={password.newPassword}
                  />
                  <div className={styles.error} >
                        {error.newPassword && error.newPassword !== "" && (
                            <span>{error.newPassword}</span>
                        )}
                </div>
                  <label className={styles.label} >Confirmar contraseña ↡</label>
                  <input
                   type="password"
                   value={password.confirmPassword}
                   name="confirmPassword"
                   placeholder="Confirma la contraseña"
                   onChange={handleChange}
                   />
                   {console.log(password.email)}
                   <div className={styles.error1} >
                        {error.confirmPassword && error.confirmPassword !== "" && (
                            <span>{error.confirmPassword}</span>
                        )}
                </div>

                   <hr />
                   <button className={styles.button} disabled={!formValid} >Cormirmar</button>
            </form>
        </div>
    )

}

export default CamPassword;