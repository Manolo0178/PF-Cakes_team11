import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import style from "./Navbar.module.css";

function Navbar() {
  return (
    <div className="container-fluid navbar-dark bg-pink">
      <div className="container-fluid">
        <nav className="navbar navbar-expand-md container">
          <div className="d-flex justify-content-start align-items-center">
            
            <SearchBar />
          </div>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <ul></ul>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <button
                  className={style.nav}
                  href="#"
                  style={{
                    color: "white",
                    fontSize: "1.0rem",
                    fontWeight: "bold",
                  }}
                >
                  Inicio
                </button>
              </li>
              <ul></ul>
              <li className="nav-item">
                <button
                  className={style.nav}
                  href="#"
                  style={{
                    color: "white",
                    fontSize: "1.0rem",
                    fontWeight: "bold",
                  }}
                >
                  About us
                </button>
              </li>
              <ul></ul>
              <li className="nav-item">
                <button
                  className={style.nav}
                  href="#"
                  style={{
                    color: "white",
                    fontSize: "1.0rem",
                    fontWeight: "bold",
                  }}
                >
                  Products
                </button>
              </li>
              <ul></ul>
              <li className="nav-item">
                <button
                  className={style.nav}
                  href="#"
                  style={{
                    color: "white",
                    fontSize: "1.0rem",
                    fontWeight: "bold",
                  }}
                >
                  Contact
                </button>
              </li>
              <ul></ul>
              <img
              className="navbar-brand"
              src="https://github.com/Manolo0178/PF-Cakes_team11/raw/main/cake.png"
              width="90px"
            />
            <ul></ul>
              <li className="nav-item">
                <button
                  className={style.nav}
                  href="#"
                  style={{
                    color: "white",
                    fontSize: "1.0rem",
                    fontWeight: "bold",
                  }}
                >
                  Budget
                </button>
              </li>
              <ul></ul>
              <li className="nav-item">
                <button
                  className={style.nav}
                  href="#"
                  style={{
                    color: "white",
                    fontSize: "1.0rem",
                    fontWeight: "bold",
                  }}
                >
                  Create User
                </button>
              </li>
              <ul></ul>
              <li className="nav-item">
                <button
                  className={style.nav}
                  href="#"
                  style={{
                    color: "white",
                    fontSize: "1.0rem",
                    fontWeight: "bold",
                  }}
                >
                  Login
                </button>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
}

export default Navbar;