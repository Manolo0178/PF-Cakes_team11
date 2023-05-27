import React, { useEffect } from "react";
import axios from "axios";
import Card from "../../components/Card/Card";
import NavBar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { useState } from "react";
import styles from "./Favorites.module.css"
import MiPerfilNav from "../miPerfil/MiPerfilNav/MiPerfilNav";


const Favorites = ({ setPage }) => {
  const userId = localStorage.getItem("userId");
  const [fav, setFav] = useState([]);

  useEffect(() => {
    const getFav = async () => {
      await axios
        .get(`http://localhost:3001/favoritos/user/${userId}/products`)
        .then((response) => {
          setFav(response.data);
        });
    };
    getFav();
  }, []);

  return (
    <section className={styles.favCont}>
      <NavBar />
      <section className={styles.cont}>
        <MiPerfilNav />
        <div className={styles.sectionFav}>
          <h1>Favoritos</h1>
          <div className={styles.favorites}>
            {fav?.map((favorite) => (
              <Card product={favorite} key={favorite.id} setPage={setPage} />
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </section>
  );
};

export default Favorites;
