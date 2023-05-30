import React, { useEffect } from "react";
import styles from "./Card.module.css"
import { Link } from "react-router-dom";
import { AiFillHeart } from "react-icons/ai";
import { AiOutlineHeart } from "react-icons/ai";
import { useState } from "react";
import axios from "axios"



function Card({ product, setPage }) {
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  const { name, image, description, price, id } = product;
  const URL = "http://localhost:3001/favoritos";
  const [isFav, setisFav] = useState(false);

  useEffect(() => {
    const searchFav = async () => {
      await axios.get(`${URL}/user/${userId}/products`).then((response) => {
        response.data.map((fav) => {
          if (fav.id === id) {
            setisFav(true);
          }
        });
      });
    };
    if(
      token
    ) {
      searchFav();
    }
  }, []);

  //************ Favorites **************/

  const addFavorite = async () => {
    await axios.post(`${URL}/user/${userId}/product/${id}`);
  };
  const deleteFavorite = async () => {
      await axios.delete(`${URL}/user/${userId}/product/${id}`);
      if (window.location.pathname === "/favoritos") {
        window.location.replace(window.location.href);
      }
  };

  const handleFavorite = () => {
    if (isFav) {
      setisFav(false);
      deleteFavorite(id);
    } else {
      setisFav(true);
      addFavorite({});
    }
  };

  return (
    <div className={styles.cont}>
      {token && isFav ? (
        <button className={styles.fav} onClick={handleFavorite}>
          <AiFillHeart className={styles.favIcon} />
        </button>
      ) : (
        token && (
          <button className={styles.fav} onClick={handleFavorite}>
            <AiOutlineHeart className={styles.favIconWhite} />
          </button>
        )
      )}
      <Link className={styles.cardCont} to={`/home/${id}`}>
        <div className={styles.imageCont}>
          <img className={styles.image} src={image} alt="product" />
          <p className={styles.description}>{description}</p>
        </div>
        <h4 className={styles.name}>{name}</h4>
        <p className={styles.price}>${price}</p>
      </Link>
    </div>
  );
}
export default Card;
