import React from 'react'

import styles from "./CreateUser.module.css"
import Button from "react-bootstrap/Button";

const CreateUser = () => {
  return (
    <div className={styles.cont}>
      <div className={styles.formCont}>
        <h1>Crear usuario</h1>
        <form className={styles.form}>
          <div className={styles.inputCont}>
            <label htmlFor="">Nombre:</label>
            <input type="text" />
          </div>
          <div className={styles.inputCont}>
            <label htmlFor="">Apellido:</label>
            <input type="text" />
          </div>
          <div className={styles.inputCont}>
            <label htmlFor="">tel:</label>
            <input type="text" />
          </div>
          <div className={styles.inputCont}>
            <label htmlFor="">Email:</label>
            <input type="text" />
          </div>
          <div className={styles.inputCont}>
            <label htmlFor="">Password:</label>
            <input type="text" />
          </div>
          <div>
            <Button variant="primary">Enviar</Button>{" "}
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateUser