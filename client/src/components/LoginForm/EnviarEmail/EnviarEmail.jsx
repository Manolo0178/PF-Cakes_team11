import React, { useState } from "react";
import styles from './EnviarEmail.module.css'
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const EnviarEmail = () => {

  const [email, setEmail] = useState({email:''})

   const handleChange = (event) => {
    const { name, value } = event.target
    setEmail({[name]: value})
   } 
   
   localStorage.setItem("email", email.email);

  const handleSubmit = async (e) => {
   try {
     e.preventDefault();
     await axios.post('http://localhost:3001/user/enviarMail',  email ).then((response) => { 
      const mensaje = response.data.message 
      Swal.fire({
       title: mensaje,
       icon: "success",
       confirmButtonText: "Ok",
   })
   .then((result) => {
     if (result.isConfirmed) {
       window.location.href = 'https://www.gmail.com/mail/help/intl/es/about.html?iframe'
     }
    })

})
   } catch (error) {
        Swal.fire({
          title: error.response.data.message,
          icon: "error",
          confirmButtonText: "Ok",
        })
   }
  }

    return(
        <div style={{ backgroundColor: 'bagraun', width: '100vw', height: '100vh' }} >

          <img
            className={styles.rotateAnimation}
            src="https://github.com/Manolo0178/PF-Cakes_team11/raw/main/cake.png"
            width="90px"
            alt="logo"
          />

            <form className={styles.container1} onSubmit={handleSubmit}>
                <h3>Recupera tu cuenta 🙄</h3>
                <hr className={styles.hr} />

                <p>Ingresa tu correo electrónico para buscar tu cuenta.</p>

                <input 
                 type="text"
                 name="email"
                 placeholder="Correo electrónico...."
                 value={email.email}
                 onChange={handleChange}
                 />
                 {console.log(email)}
                 <hr className={styles.hr} />
                 <Link to={'/login'}>
                   <button type="button" className={styles.button1} >Cancelar</button>
                 </Link>
                 <button type="submit" className={styles.button} >Buscar</button>
            </form>
        </div>
    )
}

export default EnviarEmail;