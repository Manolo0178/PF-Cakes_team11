import React, { useEffect } from 'react'
import NavBar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import axios from 'axios';
import { Link } from 'react-router-dom';
import styles from "./MisDatos.module.css"
import { useDispatch, useSelector } from "react-redux";
import { getUserData } from "../../redux/actions/index";
import MiPerfilNav from "../miPerfil/MiPerfilNav/MiPerfilNav";

const MisDatos = () => {
  const storedToken = localStorage.getItem("token");
  const id = localStorage.getItem("userId");
  const dispatch = useDispatch();
  const perfil = useSelector((state) => state.userData);

  console.log(perfil);

  useEffect(() => {
      if (storedToken && id) {
        dispatch(getUserData());
      }
    }, [dispatch, storedToken, id]);
    
  const change = async (e, val) => {
    e.preventDefault();
    const url = `http://localhost:3001/user/modifyUser/${id}`;
    let changeProp = prompt(`Qué valor desea cambiarle a ${val}?`, perfil[val]);

    if (changeProp !== null) {
      const updatedPerfil = { ...perfil, [val]: changeProp };
      await axios.put(url, updatedPerfil);
      window.location.reload(true)
    }
  };

  if (Object.keys(perfil).length === 0) {
    return (
      <div className={styles.cont}>
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <div>
      <NavBar />
      <section className={styles.sectionCont}>
        <MiPerfilNav />
        <section className={styles.section}>
          <h1>Mis Datos</h1>
          <div>
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
              <div>
                <h6>
                  Contraseña:{" "}
                  {<input type="text" disabled placeholder="********" />}
                </h6>
                <Link to={"/profile/newPassword"}>
                  <button>cambiar</button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </section>
      <Footer />
    </div>
  );
}

export default MisDatos