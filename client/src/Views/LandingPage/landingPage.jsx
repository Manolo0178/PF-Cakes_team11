import React from "react";
import { Link } from "react-router-dom";
import styles from "./landingPage.module.css";

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
            
          </div>
          <div className={`col-md-6 ${styles.rightSide}`}>
            <div className={`${styles.loginForm} ${styles.centeredLoginForm}`}>
              <h2>Log in</h2>
              <form>
                <div className="form-group">
                  <label htmlFor="username">User</label>
                  <input type="text" className={`form-control ${styles.widerInput}`} id="username" />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input type="password" className={`form-control ${styles.widerInput}`} id="password" />
                </div>
                <br />
                <div className={styles.buttonContainer}>
                  <button type="submit" className={styles.btn}>Login</button>
                  <p className="lead mb-1">or</p>
                  <Link to="/home" ><button className={styles.btn}>login without user</button></Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;