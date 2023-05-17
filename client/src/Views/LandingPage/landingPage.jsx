import React from "react";
import { Link } from "react-router-dom";
import styles from "./landingPage.module.css";
import LoginForm from "../../components/LoginForm/LoginForm";

function Landing() {
  return (
    <div className={styles.landingCont}>
      <div className="container">
        <div className="row">
          <div className={`col-md-6 ${styles.leftSide}`}>
            <img
              className={styles.img}
              src="https://github.com/Manolo0178/PF-Cakes_team11/raw/main/cake.png"
              width="250px"
              alt="Logo"
            />
            <h1 className="text-uppercase mb-4">Bienvenidos a nuestra pastelería</h1>
            
            <Link to="/home">
              <button className={styles.btn}>Ingresar</button>
            </Link>
          </div>
          <div className={`col-md-6 ${styles.rightSide}`}>
            <div className={`${styles.loginForm} right-align`}>
              <LoginForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;