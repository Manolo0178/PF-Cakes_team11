import React from "react";
import { Link } from "react-router-dom";
import styles from "./landingPage.module.css";
import LoginForm from "../../components/LoginForm/LoginForm";

function Landing({ storedToken }) {

  return (
    <div className={styles.landingCont}>
        <div className={styles.cont}>
          <div className={styles.leftSide}>
            <img
              className={styles.img}
              src="https://github.com/Manolo0178/PF-Cakes_team11/raw/main/cake.png"
              width="250px"
              alt="Logo"
            />
            <h1 className="text-uppercase mb-4">
              Bienvenidos a nuestra pastelería
            </h1>

            <Link to="/home">
              <button className={styles.btn}>Ingresar</button>
            </Link>
          </div>
          {!storedToken &&
              <div className={styles.rightSide}>
                <div className={styles.loginForm}>
                  <LoginForm />
                </div>
              </div>
          }
        </div>
    </div>
  );
}

export default Landing;