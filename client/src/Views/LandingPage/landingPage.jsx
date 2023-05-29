import React from 'react';
import { FaInstagram, FaWhatsapp, FaFacebook, FaUserFriends } from 'react-icons/fa';
import styles from '../LandingPage/landingPage.module.css';
import { Link } from 'react-router-dom';
import Postre from "../../assets/images/carrousel4.jpg";
import Collaborators from '../Collaborators/Collaborators.jsx';

const phoneNumber = '3854135819';
const message = 'Hola, estoy interesada/o en tus productos. Me mandarías información?';
const handleClick = () => {
  const url = `http://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank');
};

const LandingPage = () => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.titleContainer}>
          <img src="https://github.com/Manolo0178/PF-Cakes_team11/raw/main/cake.png" alt="Ohana Pastelería Logo" className={styles.logo} />
          <h1 className={styles.title}>Ohana Pastelería</h1>
        </div>
        <div className={styles.buttons}>
          <Link to="/login">
            <button className={styles.button}>Ingresar</button>
          </Link>
          <Link to="/createUser">
            <button className={styles.button}>Registrarme</button>
          </Link>
        </div>
      </header>
      <div className={styles.mainSection}>
        <div className={styles.contentBox}>
          <div className={styles.imageSection}>
            <img src={Postre} alt="Ohana Pastelería" width="320px" />
          </div>
          <div className={styles.divider}></div>
          <div className={styles.descriptionSection}>
            <p>
              Una pastelería humilde y familiar que ofrece delicias dulces para todos los gustos. Nuestros productos se elaboran con amor y cuidado, utilizando ingredientes de alta calidad. ¡Ven y descubre el sabor de Ohana Pastelería!
            </p>
            <Link to="/Products">
              <button className={styles.productsButton}>Ver Productos</button>
            </Link>
          </div>
        </div>
      </div>
      <footer className={styles.footer}>
        <div className={styles.socialIcons}>
          <a href="https://www.instagram.com/_pasteleria_ohana/" target="_blank" rel="noopener noreferrer">
            <FaInstagram className={styles.icon} />
          </a>
          <a href="" target="_blank" rel="noopener noreferrer">
            <FaWhatsapp onClick={handleClick} className={styles.icon} />
          </a>
          <a href="https://www.facebook.com/profile.php?id=100092681592813" target="_blank" rel="noopener noreferrer">
            <FaFacebook className={styles.icon} />
          </a>
          <Link to="/collaborators">
            <FaUserFriends className={styles.icon} />
          </Link>
        </div>
        <p className={styles.contactInfo}>Contáctanos: Teléfono: 123-456-7890 | Dirección: Calle Principal, Ciudad: Santiago del Estero | Email: info@ohanapasteleria.com</p>
      </footer>
    </div>
  );
};

export default LandingPage;