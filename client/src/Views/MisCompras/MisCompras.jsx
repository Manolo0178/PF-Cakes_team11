import React from 'react'
import NavBar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import MiPerfilNav from '../miPerfil/MiPerfilNav/MiPerfilNav';
import styles from "./MisCompras.module.css"

const MisCompras = () => {
  return (
    <div className={styles.cont}>
      <NavBar />
      <section className={styles.sectionCont}>
        <MiPerfilNav />
        <div className={styles.comprasCont}>
          <h1>Historial de Compras</h1>
          <div></div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default MisCompras