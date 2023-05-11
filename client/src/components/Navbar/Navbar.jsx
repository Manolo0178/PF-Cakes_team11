import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./Navbar.module.css";
import style from "./Navbar.module.css";

function Navbar() {
  return (
    <div class="container-fluid navbar-dark bg-pink">
    <div class="container-fluid">
        <nav class="navbar navbar-expand-md container">
        <img class="navbar-brand" src="https://github.com/Manolo0178/PF-Cakes_team11/raw/main/cake.png" width="90px"></img>
        <ul></ul>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item active">
              <button class={style.nav} href="#" style={{color: "white", fontSize: "1.1rem", fontWeight:"bold"}}>Inicio</button>
            </li>
            <ul></ul>   
            <li class="nav-item">
              <button class={style.nav} href="#" style={{color: "white", fontSize: "1.1rem", fontWeight:"bold"}}>Know us</button>
            </li>
            <ul></ul>
            <li class="nav-item">
              <button class={style.nav} href="#" style={{color: "white", fontSize: "1.1rem", fontWeight:"bold"}}>Products</button>
            </li>
            <ul></ul>
            <li class="nav-item">
              <button class={style.nav} href="#" style={{color: "white", fontSize: "1.1rem", fontWeight:"bold"}}>Contact</button>
            </li>
            <ul></ul>
            <li class="nav-item">
              <button class={style.nav} href="#" style={{color: "white", fontSize: "1.1rem", fontWeight:"bold"}}>Budget</button>
            </li>
            <SearchBar/>
            <ul></ul>
            <ul></ul>
            <ul></ul>
            <li class="nav-item">
              <button class={style.nav} href="#" style={{color: "white", fontSize: "1.1rem", fontWeight:"bold"}}>Create User</button>
            </li>
            <ul></ul>
            <li class="nav-item">
              <button class={style.nav} href="#" style={{color: "white", fontSize: "1.1rem", fontWeight:"bold"}}>Login</button>
            </li>
          </ul>
        </div>
      </nav>
  </div>
</div>
  );
}

export default Navbar;