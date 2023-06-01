import React, { useEffect, useState } from 'react'
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
import { getUserAdress } from "../../redux/actions";
import { useDispatch, useSelector } from 'react-redux';
import MiPerfilNav from "../miPerfil/MiPerfilNav/MiPerfilNav"
import ModifyAddress from '../../components/ModifyAddress/ModifyAddress';
import { orderBy } from "lodash";

const MisDomicilios = () => {
  const dispatch = useDispatch()
  const storedToken = localStorage.getItem("token");
  const id = localStorage.getItem("userId");
  const addressState = useSelector((state) => state.orderAddress);

  const domicilios = orderBy(addressState, "UserAddress.addressId", "asc"); 

  const [dom, setDom] = useState({})

  const [visible, setVisible] = useState(false)
  const [addressId, setAddressId] = useState(0)

  const [form, setForm] = useState({
    street: "",
    postalCode: "",
    province: "",
    city: "",
    telephoneContact: "",
    number: "",
  });

    useEffect(() => {
      if (storedToken) {
        dispatch(getUserAdress(storedToken, id));
      }
    }, [dispatch, storedToken, visible]);

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

  //********** New Form Change Adress ************/
  const handleChange = (event) => {
    const property = event.target.name;
    const value = event.target.value;

    setForm({ ...form, [property]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (addressId) {
      await axios.put(`http://localhost:3001/Address/modify/${addressId}`, form)
        .then((response) => {
          if (response) {
          setVisible(false)
        }
      })
    }
  }

  const handleCancel = () => {
    setVisible(false)
  }

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
                            className={styles.modify}
                            onClick={() => {
                              setDom(domicilio);
                              setAddressId(domicilio.UserAddress.addressId);
                              if (!visible) setVisible(true);
                            }}
                          />
                        </button>
                        <button className={styles.button}>
                          <MdDelete
                            className={styles.modify}
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
      {visible && (
        <ModifyAddress
          dom={dom}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          handleCancel={handleCancel}
        />
      )}
      <Footer />
    </div>
  );
}

export default MisDomicilios