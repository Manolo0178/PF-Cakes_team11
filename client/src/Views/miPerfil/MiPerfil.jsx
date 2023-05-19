import React, { useEffect } from "react";
import MiPerfilNav from "./MiPerfilNav/MiPerfilNav";

import NavBar from "../../components/Navbar/Navbar"
import Footer from "../../components/Footer/Footer"
import styles from "./MiPerfil.module.css";
import { useState } from "react";
import axios from "axios";

const MiPerfil = () => {
  const [page, setPage] = useState("fav")
  const [perfil, setPerfil] = useState({})
  
  const storedToken = localStorage.getItem("token");
  const id = localStorage.getItem("userId")

  useEffect(() => {
    const fetchData = async () => {
      if (storedToken) {
        await axios.get(`http://localhost:3001/user/${id}`).then((response) => {
          setPerfil(response.data);
        });
      }
    };

    fetchData();
  }, []);
  
  const change = async (e, val) => {
    e.preventDefault()
    const url = `http://localhost:3001/modifyUser/${id}`;
    let changeProp = prompt(`Qué valor desea cambiarle a ${val}?`, perfil[val]);

    if (changeProp !== null) {
      const updatedPerfil = { ...perfil, [val]: changeProp };
      await axios.put(url, updatedPerfil);
      setPerfil(updatedPerfil);
    }
  }

    return (
      <div className={styles.cont}>
        <NavBar />
        <section className={styles.mainCont}>
          <div className={styles.navCont}>
            <MiPerfilNav perfil={perfil} setPage={setPage} />
          </div>
          {page === "fav" && (
            <div className={styles.section}>
              <h2>Favoritos</h2>
            </div>
          )}
          {page === "data" && (
            <div className={styles.section}>
              <h2>Mis datos</h2>
              <div className={styles.datos}>
                <div>
                  <h6>Nombre: {perfil.name}</h6>
                  <button onClick={(e) => change(e, "name")}>cambiar</button>
                </div>
                <div>
                  <h6>Apellido: {perfil.lastName}</h6>
                  <button onClick={(e) => change(e, "lastName")}>cambiar</button>
                </div>
                <div>
                  <h6>Email: {perfil.email}</h6>
                  <button onClick={(e) => change(e, "email")}>cambiar</button>
                </div>
                <div>
                  <h6>Numero de contacto: {perfil.contact}</h6>
                  <button onClick={(e) => change(e, "contact")}>cambiar</button>
                </div>
              </div>
            </div>
          )}
          {page === "compras" && (
            <div className={styles.section}>
              <h2>Historial de compras</h2>
            </div>
          )}
        </section>
        <Footer />
      </div>
    );
};

export default MiPerfil;
