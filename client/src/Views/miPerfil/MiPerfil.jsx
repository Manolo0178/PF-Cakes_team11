import React, { useEffect } from "react";
import MiPerfilNav from "./MiPerfilNav/MiPerfilNav";

import NavBar from "../../components/Navbar/Navbar"
import Footer from "../../components/Footer/Footer"
import styles from "./MiPerfil.module.css";
import { useState } from "react";
import axios from "axios";
import { BiHome } from "react-icons/bi";
import { CiMenuKebab } from "react-icons/ci";
import { AiOutlineArrowRight } from "react-icons/ai";
import { Link } from "react-router-dom";





const MiPerfil = () => {
  const [page, setPage] = useState("fav")
  const [perfil, setPerfil] = useState({})
  const [domicilios,setDomicilios]= useState([])
  const storedToken = localStorage.getItem("token");
  const id = localStorage.getItem("userId")

  useEffect(() => {
    const fetchData = async () => {
      if (storedToken) {
        storedToken && id &&
        await axios.get(`http://localhost:3001/user/${id}`).then((response) => {
          setPerfil(response.data);
        });
      }
    };
    const fetchAddress = async () => {
      await axios.get(`http://localhost:3001/Address/${id}`)
        .then((response) => {
        setDomicilios(response.data.addresses)
      })
    }
    fetchAddress()
    fetchData();
  }, []);
  
  const change = async (e, val) => {
    e.preventDefault()
    const url = `http://localhost:3001/user/modifyUser/${id}`;
    let changeProp = prompt(`Qué valor desea cambiarle a ${val}?`, perfil[val]);

    if (changeProp !== null) {
      const updatedPerfil = {...perfil, [val]: changeProp };
      console.log(updatedPerfil);
      await axios.put(url, updatedPerfil);
      setPerfil(updatedPerfil)
    }
  }


    if (Object.keys(perfil).length === 0) {
      return (
        <div>
          <h1>Loading...</h1>
        </div>
      );
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
                  <button onClick={(e) => change(e, "lastName")}>
                    cambiar
                  </button>
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
          {page === "direcciones" && (
            <section className={styles.section}>
              <div>
                <h2>Domicilios</h2>
              </div>

              <section className={styles.domiciliosCont}>
                <div className={styles.domCont}>
                  {domicilios.length > 0 && (
                    <div>
                      <div>
                        <div>
                          <div>
                            <BiHome />
                          </div>
                          {domicilios?.map(domicilio => (
                            <div>
                              <h6>{domicilio.shippingAddress}</h6>
                              <div>
                                <p>Código postal: {domicilio.postalCode}</p>
                                <p>Ciudad: {domicilio.city}</p>
                                <p>Localidad: {domicilio.location}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div>
                          <button>
                            <CiMenuKebab />
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <Link className={styles.addCont} to="/address">
                  <div className={styles.addLinkCont}>
                    <p>Agregar domicilio</p>
                    <AiOutlineArrowRight color="grey" />
                  </div>
                </Link>
              </section>
            </section>
          )}
        </section>
        <Footer />
      </div>
    );
};

export default MiPerfil;
