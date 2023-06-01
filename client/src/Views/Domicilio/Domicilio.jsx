import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Domicilio.module.css"
import NavBar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import Button from "react-bootstrap/Button";
const Domicilio = () => {
  const userId = localStorage.getItem("userId");
    
  const Navigate = useNavigate()
  
  const [form, setForm] = useState({
    street: "",
    postalCode: "",
    province: "",
    city: "",
    telephoneContact: "",
    number: "",
  });

  const handleChange = (event) => {
    const property = event.target.name;
    const value = event.target.value;

    setForm({ ...form, [property]: value })
  };
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    await axios.post(`http://localhost:3001/Address/${userId}`, form)
    Navigate("/misDomicilios");
  };

  return (
    <div className={styles.cont}>
      <NavBar />
      <section className={styles.formCont}>
        <h2>Agregar Domicilio</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputsCont}>
            <div className={styles.labelCont}>
              <label htmlFor="">Calle: </label>
              <input
                type="text"
                name="street"
                placeholder="Calle"
                onChange={handleChange}
              />
            </div>
            <div className={styles.labelCont}>
              <label htmlFor="">número: </label>
              <input
                type="text"
                name="number"
                placeholder="número"
                onChange={handleChange}
              />
            </div>
            <div className={styles.labelCont}>
              <label htmlFor="">Código postal: </label>
              <input
                type="text"
                name="postalCode"
                placeholder="código postal"
                onChange={handleChange}
              />
            </div>
            <div className={styles.labelCont}>
              <label htmlFor="">Provincia: </label>
              <input
                type="text"
                name="province"
                placeholder="Provincia"
                onChange={handleChange}
              />
            </div>
            <div className={styles.labelCont}>
              <label htmlFor="">Ciudad: </label>
              <input
                type="text"
                name="city"
                placeholder="Ciudad"
                onChange={handleChange}
              />
            </div>
            <div className={styles.labelCont}>
              <label htmlFor="">Telefono de contacto: </label>
              <input
                type="text"
                name="telephoneContact"
                placeholder="Telefono de contacto"
                onChange={handleChange}
              />
            </div>
          </div>
          <div>
            <Button variant="primary" type="button" onClick={()=>Navigate(-1)}>
                Volver
            </Button>{" "}
            <Button variant="primary" type="submit" disabled={!form.street || !form.city || !form.number || !form.postalCode || !form.province || !form.telephoneContact}>
              Agregar domicilio
            </Button>{" "}
          </div>
        </form>
      </section>
      <Footer />
    </div>
  );
};

export default Domicilio;
