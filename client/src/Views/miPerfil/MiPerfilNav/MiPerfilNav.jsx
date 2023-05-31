import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./MiPerfilNav.module.css";
import Swal from "sweetalert2";
import { HiPencilAlt } from "react-icons/hi";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserData } from "../../../redux/actions/index";
import Spinner from 'react-bootstrap/Spinner';

const MiPerfilNav = () => {
  const storedToken = localStorage.getItem("token");
  const id = localStorage.getItem("userId");
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userData);
  const [perfil, setPerfil] = useState(userData)
  const [image, setImage] = useState(userData.image)
  
  const data = Object.keys(userData).length;
  useEffect(() => {
    if (!data) { 
      dispatch(getUserData(storedToken, id));
    }
    if (data && userData !== perfil) {
      setPerfil(userData);
      setImage(userData.image);
    }
  },[dispatch, userData])



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
        dispatch(getUserData());
        window.location.reload(true)
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
          {image ? (
            <img src={image} alt="imagen de perfil" />
          ) : (
            <Spinner animation="border" role="status" style={{position:"absolute", top:"38%", left:"36%"}}>
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          )}
          <input type="file" name="image" onChange={handleChangeImage} />
          <HiPencilAlt className={styles.imageChange} />
        </div>
        {perfil.name && <h2>{userData.name}</h2>}
      </div>
      <div className={styles.navCont}>
        <Link className={styles.navLinks} to="/misDomicilios">
          Domicilios
        </Link>
        <Link className={styles.navLinks} to="/favoritos">
          Favoritos
        </Link>
        <Link className={styles.navLinks} to="/misDatos">
          Mis Datos
        </Link>
        <Link className={styles.navLinks} to="/misCompras">
          Mis Compras
        </Link>
        <button className={styles.button} onClick={logoutButton}>
          Salir
        </button>
      </div>
    </div>
  );
};

export default MiPerfilNav;
