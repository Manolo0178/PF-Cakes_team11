import React from 'react'
import { BsInstagram } from "react-icons/bs";
import { BsFacebook } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { BsWhatsapp } from "react-icons/bs";

import styles from "./Footer.module.css"
const Footer = () => {
  return (
    <div className={styles.footerCont}>
      <div className={styles.footerIconsCont}>
        <a href="">
          <BsInstagram size="3rem" color='white'/>
        </a>
        <a href="">
          <BsFacebook size="3rem" color='white'/>
        </a>
        <a href="">
          <MdEmail size="3rem" color='white'/>
        </a>
        <a href="">
          <BsWhatsapp size="3rem" color='white'/>
        </a>
      </div>
    </div>
  );
}

export default Footer