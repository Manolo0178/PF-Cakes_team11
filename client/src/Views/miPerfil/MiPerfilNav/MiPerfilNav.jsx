import React from 'react'
import { useNavigate } from "react-router-dom";
import styles from "./MiPerfilNav.module.css"
import Swal from "sweetalert2";

const MiPerfilNav = ({ perfil, setPage }) => {
  const Navigate = useNavigate();
  const logoutButton = () => {
    Swal.fire({
      title: "Estas seguro de querer salir",
      icon: "question",
      confirmButtonText: "Ok",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        Navigate("/home");
      }
    });
  };
  const handleChange = (e,val) => {
    e.preventDefault()
    setPage(val)
  }
  return (
    <div className={styles.cont}>
      <div>
        <div className={styles.imgCont}>
          <img src={perfil.image} alt="image" />
        </div>
        {perfil.name && <h2>{perfil.name}</h2>}
      </div>
      <div className={styles.navCont}>
        <button className={styles.button} onClick={e=>handleChange(e,"fav")}>Favoritos</button>
        <button className={styles.button} onClick={e=>handleChange(e,"data")}>Mis datos</button>
        <button className={styles.button} onClick={e=>handleChange(e,"compras")}>Mis compras</button>
        <button className={styles.button} onClick={logoutButton}>
          Salir
        </button>
      </div>
    </div>
  );
};

export default MiPerfilNav