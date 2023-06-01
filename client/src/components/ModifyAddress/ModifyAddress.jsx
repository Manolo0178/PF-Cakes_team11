import React, { useState } from 'react'
import Button from "react-bootstrap/Button";
import styles from "./ModifyAddress.module.css"
import axios from 'axios';



const ModifyAddress = ({addressId,setVisible, handleCancel, dom }) => {
console.log(dom)
console.log(addressId)
  const [form, setForm] = useState({
    street: dom.street,
    postalCode: dom.postalCode,
    province: dom.province,
    city: dom.city,
    telephoneContact: dom.telephoneContact,
    number: dom.number
  });

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
  const handleChange = (event) => {
    const property = event.target.name;
    const value = event.target.value;

    setForm({ ...form, [property]: value });
  };
  return (
    <div className={styles.modifyCont}>
      <h3>Modificar domicilio</h3>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputsCont}>
          <div className={styles.labelCont}>
            <label htmlFor="">Calle: </label>
            <input
              type="text"
              name="street"
              value={form.street}
              onChange={handleChange}
              placeholder={dom.street}
            />
          </div>
          <div className={styles.labelCont}>
            <label htmlFor="">número: </label>
            <input
              type="text"
              name="number"
              value={form.number}
              placeholder={dom.number}
              onChange={handleChange}
            />
          </div>
          <div className={styles.labelCont}>
            <label htmlFor="">Código postal: </label>
            <input
              type="text"
              name="postalCode"
              value={form.postalCode}
              placeholder={dom.postalCode}
              onChange={handleChange}
            />
          </div>
          <div className={styles.labelCont}>
            <label htmlFor="">Provincia: </label>
            <input
              type="text"
              name="province"
              value={form.province}
              placeholder={dom.province}
              onChange={handleChange}
            />
          </div>
          <div className={styles.labelCont}>
            <label htmlFor="">Ciudad: </label>
            <input
              type="text"
              name="city"
              placeholder={dom.city}
              value={form.city}
              onChange={handleChange}
            />
          </div>
          <div className={styles.labelCont}>
            <label htmlFor="">Telefono de contacto: </label>
            <input
              type="text"
              name="telephoneContact"
              value={form.telephoneContact}
              placeholder={dom.telephoneContact}
              onChange={handleChange}
            />
          </div>
        </div>
        <div>
          <Button variant="primary" type="submit">
            Modificar
          </Button>{" "}
          <Button variant="primary" onClick={handleCancel}>
            Cancelar
          </Button>{" "}
        </div>
      </form>
    </div>
  );
};

export default ModifyAddress