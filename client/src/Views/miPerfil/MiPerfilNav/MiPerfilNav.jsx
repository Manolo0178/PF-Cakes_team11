import React from 'react'
import { Link } from 'react-router-dom';

import styles from "./MiPerfilNav.module.css"

const MiPerfilNav = () => {


  return (
    <div className={styles.cont}>
      <Link to="/miPerfil">Mi perfil</Link>
      <Link to="/miPerfil/compras">Historial de compras</Link>
      <Link to="/miPerfil/datos">Mis datos</Link>
    </div>
  );
}

export default MiPerfilNav