import React from "react";
import MiPerfilNav from "./MiPerfilNav/MiPerfilNav";

import NavBar from "../../components/Navbar/Navbar"
import Footer from "../../components/Footer/Footer"
import styles from "./MiPerfil.module.css";

const MiPerfil = () => {
  return (
    <div className={styles.cont}>
      <NavBar />
      <section className={styles.mainCont}>
        <div className={styles.navCont}>
          <div className={styles.imgCont}>
            <img
              src="https://images.hola.com/imagenes/mascotas/20180925130054/consejos-para-cuidar-a-un-gatito-recien-nacido-cs/0-601-526/cuidardgatito-t.jpg"
              alt=""
            />
          </div>
          <MiPerfilNav />
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
