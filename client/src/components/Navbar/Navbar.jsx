import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./Navbar.module.css";

function Navbar() {
  return (
    <div class="container-fluid navbar-dark bg-pink">
    <div class="container-fluid">
        <nav class="navbar navbar-expand-md container">
        <img class="navbar-brand" src="https://github.com/Manolo0178/PF-Cakes_team11/raw/main/cake.png" width="75px"></img>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item active">
              <button class="nav-link" href="#" style={{color: "white", fontSize: "1.1rem", fontWeight:"bold"}}>Inicio</button>
            </li>
            <ul></ul>   
            <li class="nav-item">
              <button class="nav-link" href="#" style={{color: "white", fontSize: "1.1rem", fontWeight:"bold"}}>Conocenos</button>
            </li>
            <ul></ul>
            <li class="nav-item">
              <button class="nav-link" href="#" style={{color: "white", fontSize: "1.1rem", fontWeight:"bold"}}>Productos</button>
            </li>
            <ul></ul>
            <li class="nav-item">
              <button class="nav-link" href="#" style={{color: "white", fontSize: "1.1rem", fontWeight:"bold"}}>Contacto</button>
            </li>
            <ul></ul>
            <li class="nav-item">
              <button class="nav-link" href="#" style={{color: "white", fontSize: "1.2rem", fontWeight:"bold"}}>Presupuesto</button>
            </li>
          </ul>
          <ul></ul>
          <ul></ul>
          <ul></ul>
          <ul></ul>
          <ul></ul>
          <form class="d-flex" role="search">
        <input class="form-control me-2" type="search" placeholder="Buscar Postre" aria-label="Search" />
        <button class="btn btn-outline-success" type="submit">Buscar</button>
        </form>
        </div>
      </nav>
  </div>
</div>
  );
}

export default Navbar;