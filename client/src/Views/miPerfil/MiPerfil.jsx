import React, { useEffect } from "react";
import MiPerfilNav from "./MiPerfilNav/MiPerfilNav";

import NavBar from "../../components/Navbar/Navbar"
import Footer from "../../components/Footer/Footer"
import styles from "./MiPerfil.module.css";
import { useState } from "react";
import axios from "axios";

const MiPerfil = () => {
  
  const [perfil, setPerfil] = useState({})
  
  const storedToken = localStorage.getItem("token");
  const id = localStorage.getItem("userId")

  useEffect( async() => {
    storedToken && (
      await axios.get(`http://localhost:3001/user/${id}`)
      .then((response) => {
        setPerfil(response.data)
      })
      )
  }, []);
    
    return (
      <div className={styles.cont}>
        <NavBar />
        <section className={styles.mainCont}>
          <div className={styles.navCont}>
            <MiPerfilNav perfil={perfil} />
          </div>
          <div className={styles.section}>
            <h2>Mis favoritos</h2>
          </div>
        </section>
        <Footer />
      </div> 
  );
};

export default MiPerfil;
