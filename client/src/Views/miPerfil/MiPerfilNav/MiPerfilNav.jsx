import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./MiPerfilNav.module.css";
import Swal from "sweetalert2";
import { HiPencilAlt } from "react-icons/hi";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";



const MiPerfilNav = ({ perfil, setPerfil, setPage, id }) => {
  const Navigate = useNavigate();
  const [image, setImage] = useState(perfil.image)

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
    const reader = new FileReader();
    if (!file) {
      return;
    }
    reader.onload = async (event) => {
      const imgChange = event.target.result;
      setPerfil({ ...perfil, image: imgChange });

      try {
        const response = await axios.put(url, { image: imgChange });
        const updatedImage = response.data.user;
        setPerfil({ ...perfil, image: updatedImage });
        setImage(updatedImage);
      } catch (error) {
        console.error("Error al cargar la imagen:", error);
      }
    };

    reader.readAsDataURL(file);
  };


  return (
    <div className={styles.cont}>
      <div>
        <div className={styles.imgCont}>
          <img src={image} alt="imagen de perfil" />
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
        <Link to="/favoritos">Favoritos</Link>
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
