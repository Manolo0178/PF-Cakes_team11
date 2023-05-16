import React from 'react'
import { BsInstagram } from "react-icons/bs";
import { BsFacebook } from "react-icons/bs";
import { MdEmail, MdHttp } from "react-icons/md";
import { BsWhatsapp } from "react-icons/bs";


import styles from "./Footer.module.css"

const phoneNumber = '3854135819';
const message = 'Hola, estoy interesada/o en tus productos. Me mandarias informacion?';

const handleClick =() => {
  const url =`http://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
  window.open(url,"_blank");
};


const Footer = () => {
  return (
    <div className={styles.footerCont}>
      <div className={styles.footerIconsCont}>
        <a href="https://www.instagram.com/_pasteleria_ohana/">
          <BsInstagram size="3rem" color='white'/>
        </a>
        <a href="https://www.facebook.com/profile.php?id=100092681592813">
          <BsFacebook size="3rem" color='white'/>
        </a>
        <a href="mailto:ohanapasteleria1@gmail.com">
          <MdEmail size="3rem" color='white'/>
        </a>
        <a href="">
          <BsWhatsapp onClick={handleClick} size="3rem" color='white'/>
        </a>
      </div>
    </div>
  );
}

export default Footer