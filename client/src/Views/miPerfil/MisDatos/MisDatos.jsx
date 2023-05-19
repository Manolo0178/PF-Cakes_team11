import React from "react";
import MiPerfilNav from "../MiPerfilNav/MiPerfilNav";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import NavBar from "../../../components/Navbar/Navbar";
import Footer from "../../../components/Footer/Footer";

import styles from "./MisDatos.module.css";
const MisCompras = () => {
    const [perfil, setPerfil] = useState({});

    const storedToken = localStorage.getItem("token");
    const id = localStorage.getItem("userId");

    useEffect(async () => {
      storedToken &&
        (await axios
          .get(`http://localhost:3001/user/${id}`)
          .then((response) => {
            setPerfil(response.data);
          }));
    }, []);
    
  return (
    <div className={styles.cont}>
      <NavBar />
      <section className={styles.mainCont}>
        <div className={styles.navCont}>
          <MiPerfilNav perfil={perfil} />
        </div>
        <div className={styles.section}>
          <h2>Mis datos</h2>
          <div className={styles.datos}>
            <h6>Nombre: { perfil.name }</h6>
            <h6>Apellido: { perfil.lastName }</h6>
            <h6>Email: { perfil.email }</h6>
            <h6>Numero de contacto: { perfil.contact }</h6>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default MisCompras;
