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
        <Navbar.Brand as={Link} to="/home" className={styles.logoCont}>

            <img
              className="navbar-brand"
              src="https://github.com/Manolo0178/PF-Cakes_team11/raw/main/cake.png"
              width="90px"
            />

        </Navbar.Brand>

        <SearchBar />

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className={styles.linksCont}>
          <Nav className={styles.linkCont}>
            <Nav.Link as={Link} to="/home" className={styles.link}>
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/about" className={styles.link}>
              About
            </Nav.Link>
            <Nav.Link as={Link} to="/products" className={styles.link}>
              Products
            </Nav.Link>
            <Nav.Link as={Link} to="/budget" className={styles.link}>
              Presupuesto
            </Nav.Link>
            <Nav.Link as={Link} to="/create" className={styles.link}>
              Crear
            </Nav.Link>
            <Nav.Link as={Link} to="/login" className={styles.link}>
              Login
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;