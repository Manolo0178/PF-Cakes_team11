import React from "react";
import { Link } from "react-router-dom";
import styles from "./landingPage.module.css";

function Landing() {
    
  return (
    
    <div className="bg-image d-flex align-items-center">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 text-center">
            <img
              className={styles.img}
              src="https://github.com/Manolo0178/PF-Cakes_team11/raw/main/cake.png"
              width="300px"
              alt="Logo"
            />
            <h1 className="text-uppercase mb-4">Bienvenidos a nuestra pastelería</h1>
            <p className="lead mb-5">
              En nuestra pastelería encontrarás los más deliciosos postres y dulces,
              hechos con ingredientes de alta calidad y mucho amor.
            </p>
            
            <Link to="/home">
                <button className={styles.btn}>
                Ingresar
                </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;