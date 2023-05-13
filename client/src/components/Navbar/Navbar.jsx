import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import styles from "./Navbar.module.css";

function NavBar() {
  return (
    <Navbar expand="lg" className={styles.navBarCont}>
      <Container className={styles.cont}>
        <Navbar.Brand href="#home" className={styles.logoCont}>
          <Link to="/home">
            <img
              className="navbar-brand"
              src="https://github.com/Manolo0178/PF-Cakes_team11/raw/main/cake.png"
              width="90px"
            />
          </Link>
        </Navbar.Brand>

        <SearchBar />

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className={styles.linksCont}>
          <Nav className={styles.linkCont}>
            <Nav.Link>
              <Link to="/home" className={styles.link}>
                Home
              </Link>
            </Nav.Link>
            <Nav.Link>
              <Link to="/about" className={styles.link}>
                About
              </Link>
            </Nav.Link>
            <Nav.Link>
              <Link to="/products" className={styles.link}>
                Products
              </Link>
            </Nav.Link>
            <Nav.Link>
              <Link to="/budget" className={styles.link}>
                Presupuesto
              </Link>
            </Nav.Link>
            <Nav.Link>
              <Link to="/contact" className={styles.link}>
                Contacto
              </Link>
            </Nav.Link>
            <Nav.Link>
              <Link to="/create" className={styles.link}>
                crear
              </Link>
            </Nav.Link>
            <Nav.Link>
              <Link to="/login" className={styles.link}>
                Login
              </Link>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;