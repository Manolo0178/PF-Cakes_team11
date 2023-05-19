import React from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import styles from "./MiPerfilNav.module.css"
import Swal from "sweetalert2";
const MiPerfilNav = ({perfil}) => {
  const Navigate = useNavigate();
  const logoutButton = () => {
    Swal.fire({
      title: "Estas seguro de querer salir",
      icon: "question",
      confirmButtonText: "Ok",
      showCancelButton:true
    }).then((result) => {
      if (result.isConfirmed) {
          localStorage.removeItem("token");
          Navigate("/home");
      }
    });
  };

  return (
    <div className={styles.cont}>
      <div>
        <div className={styles.imgCont}>
          <img src={perfil.image} alt="image" />
        </div>
        {perfil.name && <h2>{perfil.name}</h2>}
      </div>
      <div className={styles.navCont}>
        <Link className={styles.links} to="/profile">Mi perfil</Link>
        <Link className={styles.links} to="/profile/misCompras">Historial de compras</Link>
        <Link className={styles.links} to="/profile/misDatos">Mis datos</Link>
        <button className={styles.logoutButton} onClick={logoutButton}>Salir</button>
      </div>
    </div>
  );
}

export default MiPerfilNav