import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./MiPerfilNav.module.css";
import Swal from "sweetalert2";
import { HiPencilAlt } from "react-icons/hi";
import axios from "axios";

const MiPerfilNav = ({ perfil, setPerfil, setPage, id }) => {
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
  const handleChange = (e, val) => {
    e.preventDefault();
    setPage(val);
  };
  

  const handleChangeImage = (event) => {
    const file = event.target.files[0];
    const url = `http://localhost:3001/user/modifyUser/${id}`;
    const image = new FileReader();
    if (!file) {
      return;
    }

    image.onload = async (event) => {
      const imgChange = event.target.result;
      setPerfil({ ...perfil, image: imgChange });
      if (perfil.image !== null) {
        await axios.put(url, perfil);
      }
    };

    image.readAsDataURL(file);
  };


  return (
    <div className={styles.cont}>
      <div>
        <div className={styles.imgCont}>
          <img src={perfil.image} alt="imagen de perfil" />
          <input type="file" name="image" onChange={handleChangeImage} />
          <HiPencilAlt className={styles.imageChange} />
        </div>
        {perfil.name && <h2>{perfil.name}</h2>}
      </div>
      <div className={styles.navCont}>
        <button
          className={styles.button}
          onClick={(e) => handleChange(e, "direcciones")}
        >
          Domicilios
        </button>
        <button
          className={styles.button}
          onClick={(e) => handleChange(e, "fav")}
        >
          Favoritos
        </button>
        <button
          className={styles.button}
          onClick={(e) => handleChange(e, "data")}
        >
          Mis datos
        </button>
        <button
          className={styles.button}
          onClick={(e) => handleChange(e, "compras")}
        >
          Mis compras
        </button>
        <button className={styles.button} onClick={logoutButton}>
          Salir
        </button>
      </div>
    </div>
  );
};

export default MiPerfilNav;
