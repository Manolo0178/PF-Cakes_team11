import React from 'react'
import NavBar from '../../components/Navbar/Navbar';
import LoginForm from '../../components/LoginForm/LoginForm';
import Footer from "../../components/Footer/Footer";
import styles from "./Login.module.css"

const Login = () => {
  return (
    <div className={styles.cont}>
      <NavBar />
      <LoginForm/>
      <Footer />
    </div>
  );
}

export default Login