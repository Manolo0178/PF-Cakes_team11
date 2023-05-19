import React, { useState } from "react";
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import { MdOutlineLocalGroceryStore } from "react-icons/md";

import styles from "./Navbar.module.css";

import Cart from '../Cart/Cart';

function NavBar() {
  const storedToken = localStorage.getItem("token");
  const [cartVisible, setCartVisible] = useState(false);

  const toggleCart = () => {
    setCartVisible(!cartVisible);
  };

  return (
    <Navbar expand="lg" className={styles.navBarCont}>
      <Container className={styles.cont}>
        <Navbar.Brand as={Link} to="/home" className={styles.logoCont}>
          <img
            className="navbar-brand"
            src="https://github.com/Manolo0178/PF-Cakes_team11/raw/main/cake.png"
            width="90px"
            alt="logo"
          />
        </Navbar.Brand>

        <SearchBar />

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className={styles.linksCont}>
          <Nav className={styles.linkCont}>
            <Nav.Link as={Link} to="/home" className={styles.link}>
              Inicio
            </Nav.Link>
            <Nav.Link as={Link} to="/products" className={styles.link}>
              Productos
            </Nav.Link>
            <Nav.Link as={Link} to="/about" className={styles.link}>
              Sobre Nosotros
            </Nav.Link>
            <Nav.Link as={Link} to="/create" className={styles.link}>
              Crear Postre
            </Nav.Link>
            {storedToken ? (
              <Nav.Link as={Link} to="/profile" className={styles.link}>
                Perfil
              </Nav.Link>
            ) : (
              <Nav.Link as={Link} to="/login" className={styles.link}>
                Ingresá
              </Nav.Link>
            )}
            <Nav.Link className={styles.link} onClick={toggleCart}>
              <MdOutlineLocalGroceryStore color="white" size="1.6rem" />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
      <Cart isOpen={cartVisible} toggleCart={toggleCart} />
    </Navbar>
  );
}

export default NavBar;