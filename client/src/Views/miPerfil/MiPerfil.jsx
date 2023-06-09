import React, { useEffect } from "react";
import MiPerfilNav from "./MiPerfilNav/MiPerfilNav";

import NavBar from "../../components/Navbar/Navbar"
import Footer from "../../components/Footer/Footer"
import styles from "./MiPerfil.module.css";
import { useState } from "react";
import axios from "axios";
import { BiHome } from "react-icons/bi";
import { BiPencil } from "react-icons/bi";
import { MdDelete } from "react-icons/md";

import { AiOutlineArrowRight } from "react-icons/ai";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";




const MiPerfil = () => {
  const [page, setPage] = useState("direcciones");
  const [perfil, setPerfil] = useState({});
  const [domicilios, setDomicilios] = useState([]);
  const storedToken = localStorage.getItem("token");
  const id = localStorage.getItem("userId");
  // const [dom, setdom] = useState({})

  let dom = {}

  useEffect(() => {
    const fetchData = async () => {
      if (storedToken) {
        storedToken &&
          id &&
          (await axios
            .get(`http://localhost:3001/user/${id}`)
            .then((response) => {
              setPerfil(response.data);
            }));
      }
    };
    const fetchAddress = async () => {
      await axios
        .get(`http://localhost:3001/Address/${id}`)
        .then((response) => {
          setDomicilios(response.data.addresses);
        });
    };
    fetchAddress();
    fetchData();
  }, [id, storedToken]);

//************* change user data ****************/
  const change = async (e, val) => {
    e.preventDefault();
    const url = `http://localhost:3001/user/modifyUser/${id}`;
    let changeProp = prompt(`Qué valor desea cambiarle a ${val}?`, perfil[val]);

    if (changeProp !== null) {
      const updatedPerfil = { ...perfil, [val]: changeProp };
      await axios.put(url, updatedPerfil);
      setPerfil(updatedPerfil);
    }
  };

  if (Object.keys(perfil).length === 0) {
    return (
      <div className={styles.cont}>
        <h1>Loading...</h1>
      </div>
    );
  }
//******************************* */
  
//**************** Adress delete ****************/
  const handleDelete = async (e, idAddress) => {
    e.preventDefault();
    Swal.fire({
      title: "¿Estás seguro de eliminarlo?",
      icon: "question",
      showDenyButton: "true",
      confirmButtonText: "Si",
      denyButtonText: "No",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axios.delete(
          `http://localhost:3001/Address/remove/${id}/${idAddress}`
        );
        window.location.reload(true);
      }
    });
  };
//******************************** */

//*************** adress change ***************/
  const handleChangeDom = async (idAddress) => {
    if (dom.street) {

      const prompts = [
      prompt("¿Qué calle desea colocarle?", `${dom.street}`),
      prompt("¿Qué código postal desea colocarle?", `${dom.postalCode}`),
      prompt("¿Qué ciudad desea colocarle?", `${dom.city}`),
      prompt("¿Qué provincia desea colocarle?", `${dom.province}`),
      prompt("¿Qué número desea colocarle?", `${dom.number}`),
      prompt("¿Qué teléfono desea colocarle?", `${dom.telephoneContact}`),
    ];

    const values = await Promise.all(prompts);

    const updatedForm = {
      street: values[0] || dom.street,
      postalCode: values[1] || dom.postalCode,
      city: values[2] || dom.city,
      province: values[3] || dom.province,
      number: values[4] || dom.number,
      telephoneContact: values[5] || dom.telephoneContact,
    };

    dom = {...updatedForm}
    await axios
    .put(`http://localhost:3001/Address/${idAddress}`, dom)
    .then((response) => {
      if (response) {
        window.location.reload(true);
      }
    });
  }
};
//******************************** */

  return (
    <div className={styles.cont}>
      <NavBar />
      <section className={styles.mainCont}>
        <div className={styles.navCont}>
          <MiPerfilNav
            perfil={perfil}
            setPerfil={setPerfil}
            setPage={setPage}
            id={id}
          />
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
                {domicilios?.map((domicilio) => (
                  <div
                    key={domicilio.UserAddress.addressId}
                    className={styles.domicilio}
                  >
                    <div>
                      <div className={styles.dataCont}>
                        <div>
                          <BiHome size="1.5rem" color="grey" />
                        </div>
                        <section>
                          <h6>
                            {domicilio.street}
                            {domicilio.number}
                          </h6>
                          <div>
                            <p>Código postal: {domicilio.postalCode}</p>
                            <p>Provincia: {domicilio.province}</p>
                            <p>Ciudad: {domicilio.city}</p>
                            <p>
                              Telefono de contacto: {domicilio.telephoneContact}
                            </p>
                          </div>
                        </section>
                        <div>
                          <button className={styles.button}>
                            <BiPencil
                              onClick={(e) => {
                                if (!dom.length) {
                                  dom = {...domicilio}
                                }
                                handleChangeDom(                            
                                  domicilio.UserAddress.addressId
                                  )
                                }
                              }
                            />
                          </button>
                          <button className={styles.button}>
                            <MdDelete
                              onClick={(e) =>
                                handleDelete(e, domicilio.UserAddress.addressId)
                              }
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
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
