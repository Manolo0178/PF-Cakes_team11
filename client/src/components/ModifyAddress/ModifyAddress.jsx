import React from 'react'
import Button from "react-bootstrap/Button";
import styles from "./ModifyAddress.module.css"



const ModifyAddress = ({ handleChange, handleSubmit, handleCancel, dom }) => {

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
              onChange={handleChange}
              placeholder={dom.street}
            />
          </div>
          <div className={styles.labelCont}>
            <label htmlFor="">número: </label>
            <input
              type="text"
              name="number"
              placeholder={dom.number}
              onChange={handleChange}
            />
          </div>
          <div className={styles.labelCont}>
            <label htmlFor="">Código postal: </label>
            <input
              type="text"
              name="postalCode"
              placeholder={dom.postalCode}
              onChange={handleChange}
            />
          </div>
          <div className={styles.labelCont}>
            <label htmlFor="">Provincia: </label>
            <input
              type="text"
              name="province"
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
              onChange={handleChange}
            />
          </div>
          <div className={styles.labelCont}>
            <label htmlFor="">Telefono de contacto: </label>
            <input
              type="text"
              name="telephoneContact"
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