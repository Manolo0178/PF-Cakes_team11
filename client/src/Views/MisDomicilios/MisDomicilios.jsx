import React, { useEffect } from 'react'
import styles from "./MisDomicilios.module.css";
import axios from 'axios';
import Swal from "sweetalert2";
import NavBar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { BiHome } from "react-icons/bi";
import { BiPencil } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { AiOutlineArrowRight } from "react-icons/ai";
import { Link } from "react-router-dom";
import { getUserAdress } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import MiPerfilNav from "../miPerfil/MiPerfilNav/MiPerfilNav"

const MisDomicilios = () => {
  const dispatch = useDispatch()
  const storedToken = localStorage.getItem("token");
  const id = localStorage.getItem("userId");
  const domicilios = useSelector((state) => state.userAddress);

    let dom = {};

    useEffect(() => {
      if (storedToken) {
        dispatch(getUserAdress(storedToken, id));
        
      }
    }, [dispatch, storedToken]);

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

      dom = { ...updatedForm };
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
    <div>
      <NavBar />
      <section className={styles.section}>
        <MiPerfilNav />
        <div className={styles.sectionCont}>
          <h2>Domicilios</h2>
          <section className={styles.domiciliosCont}>
            <div className={styles.domCont}>
              {/* {!Object.keys(domicilios) && (
                <div className={styles.domicilio}>
                  <p>No tienes una localidad agregada</p>
                </div>
              )} */}
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
                                dom = { ...domicilio };
                              }
                              handleChangeDom(domicilio.UserAddress.addressId);
                            }}
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
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default MisDomicilios