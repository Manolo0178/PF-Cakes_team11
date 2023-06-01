import React from 'react'
import Button from "react-bootstrap/Button";
import styles from "./ChangeDetail.module.css"



const ChangeDetail = ({ handleSubmit, handleChange, handleCancel, detail }) => {
  return (
    <div className={styles.cont}>
      <h3>Cambiar Detalles</h3>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputsCont}>
          <div className={styles.inputCont}>
            <label htmlFor="">Nombre</label>
            <input type="text" name="name" onChange={handleChange} placeholder={detail.name} className={styles.input}/>
          </div>
          <div className={styles.inputCont}>
            <label htmlFor="">Precio</label>
            <input type="text" name="price" onChange={handleChange} placeholder={detail.price} className={styles.input}/>
          </div>
          <div className={styles.inputCont}>
            <label htmlFor="">Descripción</label>
            <textarea type="text" name="description" onChange={handleChange} placeholder={detail.description} className={styles.textArea}/>
          </div>
          <div className={styles.inputCont}>
            <label htmlFor="">Ingredientes</label>
            <textarea type="text" name="summary" onChange={handleChange} placeholder={detail.summary} className={styles.textArea}/>
          </div>
        </div>
        <div className={styles.buttonCont}>
          <Button variant="primary" type="submit" className={styles.button}>
            Cambiar
          </Button>{" "}
          <Button
            variant="primary"
            onClick={handleCancel}
            className={styles.button}
          >
            Cancelar
          </Button>{" "}
        </div>
      </form>
    </div>
  );
};

export default ChangeDetail