import React from "react";
import styles from './NotFound.module.css';
import { Link } from "react-router-dom";

const NotFound = () => {
    
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Error 404: Página no encontrada</h1>
            <p className={styles.message}>Lo sentimos, la página que estás buscando no existe.</p>
            <Link to={'/home'} >
             <button className={styles.boton} >IR A CASA</button>
            </Link>
        </div>
    );
}

export default NotFound;
